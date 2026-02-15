import { createClient } from "@/lib/supabase/client"
import type { DbProduct, DbOrder, DbOrderItem, DbProfile } from "@/lib/supabase/types"

function supabase() {
  return createClient()
}

// ── Products ────────────────────────────────────────────────

export async function fetchProducts() {
  const { data, error } = await supabase()
    .from("products")
    .select("*")
    .order("created_at", { ascending: true })

  if (error) throw error
  return data as DbProduct[]
}

export async function insertProduct(product: Omit<DbProduct, "id" | "created_at">) {
  const { data, error } = await supabase()
    .from("products")
    .insert(product)
    .select()
    .single()

  if (error) throw error
  return data as DbProduct
}

export async function updateProduct(id: string, updates: Partial<DbProduct>) {
  const { data, error } = await supabase()
    .from("products")
    .update(updates)
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data as DbProduct
}

export async function deleteProduct(id: string) {
  const { error } = await supabase()
    .from("products")
    .delete()
    .eq("id", id)

  if (error) throw error
}

// ── Orders ──────────────────────────────────────────────────

export async function fetchOrders() {
  const { data, error } = await supabase()
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as DbOrder[]
}

export async function fetchOrderItems(orderId: string) {
  const { data, error } = await supabase()
    .from("order_items")
    .select("*")
    .eq("order_id", orderId)

  if (error) throw error
  return data as DbOrderItem[]
}

export type CartLine = {
  id: string
  name: string
  qty: number
  price: number
}

export async function createOrder(
  cart: CartLine[],
  payment: "Card" | "Cash" | "Wallet",
  customer: string = ""
) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const tax = subtotal * 0.085
  const total = subtotal + tax
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0)

  // 1. Insert order
  const { data: order, error: orderError } = await supabase()
    .from("orders")
    .insert({
      customer,
      items: totalItems,
      payment,
      subtotal: Math.round(subtotal * 100) / 100,
      tax: Math.round(tax * 100) / 100,
      total: Math.round(total * 100) / 100,
      status: "Completed",
    })
    .select()
    .single()

  if (orderError) throw orderError

  // 2. Insert order items
  const orderItems = cart.map((item) => ({
    order_id: order.id,
    product_id: item.id,
    product_name: item.name,
    quantity: item.qty,
    unit_price: item.price,
  }))

  const { error: itemsError } = await supabase()
    .from("order_items")
    .insert(orderItems)

  if (itemsError) throw itemsError

  // 3. Decrement stock for each product  
  for (const item of cart) {
    await supabase().rpc("decrement_stock", { 
      product_id: item.id, 
      qty: item.qty 
    }).then(({ error }) => {
      // Fallback: if RPC doesn't exist, do a manual update
      if (error) {
        return supabase()
          .from("products")
          .select("stock")
          .eq("id", item.id)
          .single()
          .then(({ data }) => {
            if (data) {
              return supabase()
                .from("products")
                .update({ stock: Math.max(0, data.stock - item.qty) })
                .eq("id", item.id)
            }
          })
      }
    })
  }

  return order as DbOrder
}

// ── Profile ─────────────────────────────────────────────────

export async function fetchProfile() {
  const { data: { user } } = await supabase().auth.getUser()
  if (!user) return null

  const { data, error } = await supabase()
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  if (error) return null
  return { profile: data as DbProfile, email: user.email ?? "" }
}

// ── Auth ────────────────────────────────────────────────────

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase().auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw error
  return data
}

export async function signUp(email: string, password: string, fullName: string) {
  const { data, error } = await supabase().auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
    },
  })
  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase().auth.signOut()
  if (error) throw error
}
