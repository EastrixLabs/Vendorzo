import {
  CakeSlice,
  Coffee,
  Cookie,
  CupSoda,
  Package,
  Sandwich,
  Soup,
  type LucideIcon,
} from "lucide-react"

// ── Database row types ──────────────────────────────────────

export type DbProduct = {
  id: string
  name: string
  category: string
  price: number
  stock: number
  sku: string
  rating: number
  prep_time: string
  description: string
  icon: string
  image_url: string | null
  created_at: string
}

export type DbOrder = {
  id: string
  order_number: number
  customer: string
  items: number
  payment: "Card" | "Cash" | "Wallet"
  subtotal: number
  tax: number
  total: number
  status: "Completed" | "Pending" | "Refunded"
  created_at: string
}

export type DbOrderItem = {
  id: string
  order_id: string
  product_id: string | null
  product_name: string
  quantity: number
  unit_price: number
}

export type DbProfile = {
  id: string
  full_name: string
  role: "admin" | "manager" | "cashier"
  created_at: string
}

// ── Icon mapping ────────────────────────────────────────────

const iconMap: Record<string, LucideIcon> = {
  "coffee": Coffee,
  "cup-soda": CupSoda,
  "cookie": Cookie,
  "sandwich": Sandwich,
  "soup": Soup,
  "cake-slice": CakeSlice,
}

export function getProductIcon(iconKey: string): LucideIcon {
  return iconMap[iconKey] ?? Package
}

// ── Converters (DB row → frontend type used by components) ──

export type Product = {
  id: string
  name: string
  category: "Drinks" | "Snacks" | "Meals" | "Desserts"
  price: number
  stock: number
  sku: string
  rating: number
  prepTime: string
  description: string
  icon: LucideIcon
}

export type Order = {
  id: string
  customer: string
  items: number
  payment: "Card" | "Cash" | "Wallet"
  total: number
  status: "Completed" | "Pending" | "Refunded"
  date: string
}

export function toProduct(row: DbProduct): Product {
  return {
    id: row.id,
    name: row.name,
    category: row.category as Product["category"],
    price: row.price,
    stock: row.stock,
    sku: row.sku,
    rating: row.rating,
    prepTime: row.prep_time,
    description: row.description,
    icon: getProductIcon(row.icon),
  }
}

export function toOrder(row: DbOrder): Order {
  const date = new Date(row.created_at)
  return {
    id: `ORD-${row.order_number}`,
    customer: row.customer,
    items: row.items,
    payment: row.payment,
    total: row.total,
    status: row.status,
    date: date.toLocaleString("sv-SE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }),
  }
}
