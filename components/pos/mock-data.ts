import {
  CakeSlice,
  ChartBar,
  Coffee,
  Cookie,
  CupSoda,
  LayoutDashboard,
  Package,
  Radar,
  Receipt,
  Sandwich,
  ShoppingCart,
  Soup,
  type LucideIcon,
} from "lucide-react"

export type SidebarItem = {
  title: string
  href: string
  icon: LucideIcon
}

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

export type CartItem = {
  id: string
  name: string
  qty: number
  price: number
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

export const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "POS",
    href: "/pos",
    icon: ShoppingCart,
  },
  {
    title: "Products",
    href: "/products",
    icon: Package,
  },
  {
    title: "Orders",
    href: "/orders",
    icon: Receipt,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: ChartBar,
  },
]

export const categories = ["All", "Drinks", "Snacks", "Meals", "Desserts", "Bakery"] as const

export const products: Product[] = [
  {
    id: "prd-001",
    name: "Espresso Shot",
    category: "Drinks",
    price: 3.5,
    stock: 62,
    sku: "DR-1001",
    rating: 4.8,
    prepTime: "2 min",
    description: "Double espresso with a rich crema and clean finish.",
    icon: Coffee,
  },
  {
    id: "prd-002",
    name: "Iced Cola",
    category: "Drinks",
    price: 2.8,
    stock: 45,
    sku: "DR-1002",
    rating: 4.5,
    prepTime: "1 min",
    description: "Classic chilled cola served over ice.",
    icon: CupSoda,
  },
  {
    id: "prd-003",
    name: "Citrus Cooler",
    category: "Drinks",
    price: 4.2,
    stock: 31,
    sku: "DR-1003",
    rating: 4.6,
    prepTime: "3 min",
    description: "Sparkling citrus mix with mint and crushed ice.",
    icon: CupSoda,
  },
  {
    id: "prd-004",
    name: "Chocolate Cookie",
    category: "Snacks",
    price: 2.4,
    stock: 77,
    sku: "SN-2001",
    rating: 4.7,
    prepTime: "Ready",
    description: "Soft baked cookie with dark chocolate chunks.",
    icon: Cookie,
  },
  {
    id: "prd-005",
    name: "Sea Salt Crackers",
    category: "Snacks",
    price: 1.9,
    stock: 83,
    sku: "SN-2002",
    rating: 4.3,
    prepTime: "Ready",
    description: "Light and crisp crackers with sea salt finish.",
    icon: Cookie,
  },
  {
    id: "prd-006",
    name: "Chicken Club Sandwich",
    category: "Meals",
    price: 8.9,
    stock: 24,
    sku: "ML-3001",
    rating: 4.9,
    prepTime: "8 min",
    description: "Grilled chicken, lettuce, tomato, and house spread.",
    icon: Sandwich,
  },
  {
    id: "prd-007",
    name: "Tomato Basil Soup",
    category: "Meals",
    price: 6.5,
    stock: 19,
    sku: "ML-3002",
    rating: 4.4,
    prepTime: "6 min",
    description: "Slow simmered tomato soup with basil oil.",
    icon: Soup,
  },
  {
    id: "prd-008",
    name: "Cheesecake Slice",
    category: "Desserts",
    price: 5.1,
    stock: 17,
    sku: "DS-4001",
    rating: 4.8,
    prepTime: "Ready",
    description: "Creamy New York style cheesecake with crumb base.",
    icon: CakeSlice,
  },
  {
    id: "prd-009",
    name: "Carrot Cake",
    category: "Desserts",
    price: 4.8,
    stock: 13,
    sku: "DS-4002",
    rating: 4.5,
    prepTime: "Ready",
    description: "Moist carrot cake topped with cream cheese frosting.",
    icon: CakeSlice,
  },
]

export const cartItems: CartItem[] = [
  {
    id: "prd-006",
    name: "Chicken Club Sandwich",
    qty: 1,
    price: 8.9,
  },
  {
    id: "prd-001",
    name: "Espresso Shot",
    qty: 2,
    price: 3.5,
  },
  {
    id: "prd-004",
    name: "Chocolate Cookie",
    qty: 1,
    price: 2.4,
  },
]

export const orderHistory: Order[] = [
  {
    id: "ORD-1207",
    customer: "Ava Brooks",
    items: 4,
    payment: "Card",
    total: 24.8,
    status: "Completed",
    date: "2026-02-09 09:12",
  },
  {
    id: "ORD-1206",
    customer: "Noah Carter",
    items: 2,
    payment: "Cash",
    total: 11.5,
    status: "Completed",
    date: "2026-02-09 09:04",
  },
  {
    id: "ORD-1205",
    customer: "Mila Reed",
    items: 5,
    payment: "Wallet",
    total: 31.4,
    status: "Pending",
    date: "2026-02-09 08:57",
  },
  {
    id: "ORD-1204",
    customer: "Liam Price",
    items: 1,
    payment: "Card",
    total: 4.2,
    status: "Refunded",
    date: "2026-02-09 08:33",
  },
  {
    id: "ORD-1203",
    customer: "Sophia Lane",
    items: 3,
    payment: "Card",
    total: 17.7,
    status: "Completed",
    date: "2026-02-09 08:20",
  },
]

export const metricCards = [
  {
    label: "Today Revenue",
    value: "$4,820",
    delta: "+8.2%",
  },
  {
    label: "Orders",
    value: "286",
    delta: "+12",
  },
  {
    label: "Avg Ticket",
    value: "$16.85",
    delta: "+$1.10",
  },
  {
    label: "Refund Rate",
    value: "1.6%",
    delta: "-0.3%",
  },
]

export const areaData = [
  { day: "Mon", revenue: 3100 },
  { day: "Tue", revenue: 4200 },
  { day: "Wed", revenue: 3900 },
  { day: "Thu", revenue: 5100 },
  { day: "Fri", revenue: 6800 },
  { day: "Sat", revenue: 7200 },
  { day: "Sun", revenue: 6400 },
]

export const barData = [
  { product: "Sandwich", qty: 128 },
  { product: "Espresso", qty: 110 },
  { product: "Cheesecake", qty: 74 },
  { product: "Iced Cola", qty: 92 },
  { product: "Soup", qty: 67 },
]

export const lineData = [
  { hour: "09", tickets: 12 },
  { hour: "10", tickets: 17 },
  { hour: "11", tickets: 24 },
  { hour: "12", tickets: 32 },
  { hour: "13", tickets: 29 },
  { hour: "14", tickets: 26 },
  { hour: "15", tickets: 21 },
  { hour: "16", tickets: 18 },
]

export const pieData = [
  { category: "Drinks", value: 36, fill: "var(--color-drinks)" },
  { category: "Snacks", value: 22, fill: "var(--color-snacks)" },
  { category: "Meals", value: 28, fill: "var(--color-meals)" },
  { category: "Desserts", value: 14, fill: "var(--color-desserts)" },
]

export const radarData = [
  { metric: "Speed", current: 86 },
  { metric: "Accuracy", current: 91 },
  { metric: "Upsell", current: 73 },
  { metric: "Retention", current: 82 },
  { metric: "Satisfaction", current: 88 },
]

export const radialData = [
  {
    name: "In-store",
    value: 72,
    fill: "var(--color-inStore)",
  },
  {
    name: "Online",
    value: 28,
    fill: "var(--color-online)",
  },
]

export const chartIcon = Radar
