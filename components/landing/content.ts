import {
  BarChart3,
  Boxes,
  CreditCard,
  LayoutDashboard,
  ReceiptText,
  ScanLine,
  ShieldCheck,
  Smartphone,
  Store,
  Workflow,
  type LucideIcon,
} from "lucide-react"

export interface MarketingFeature {
  title: string
  description: string
  icon: LucideIcon
}

export interface WorkflowStep {
  title: string
  description: string
  route: string
  icon: LucideIcon
}

export type BillingCycle = "monthly" | "yearly"

export type PricingPlanId = "starter" | "growth" | "scale"

export interface PricingPlan {
  id: PricingPlanId
  name: string
  summary: string
  description: string
  monthlyPrice: number | null
  yearlyPrice: number | null
  ctaLabel: string
  ctaRoute: string
  badge?: string
  highlighted?: boolean
  features: string[]
}

export type PricingComparisonValue = boolean | string

export interface PricingComparisonRow {
  feature: string
  values: Record<PricingPlanId, PricingComparisonValue>
}

export const trustedBrands = ["Urban Cart", "Northbean", "Freshline", "Loop Market"]

export const marketingFeatures: MarketingFeature[] = [
  {
    title: "Dedicated /pos workspace",
    description:
      "Jump directly into your operational cockpit with products, carts, and checkout controls in one flow.",
    icon: LayoutDashboard,
  },
  {
    title: "Real-time inventory visibility",
    description:
      "Track stock changes while selling so your team can avoid overselling and keep shelves accurate.",
    icon: Boxes,
  },
  {
    title: "Fast payment handling",
    description:
      "Card, cash, and wallet-friendly workflows designed for quick in-store turnarounds.",
    icon: CreditCard,
  },
  {
    title: "Scan-ready operations",
    description:
      "Built for barcode and SKU-first interactions so your team can process more orders per shift.",
    icon: ScanLine,
  },
  {
    title: "Mobile responsive by default",
    description:
      "Use Vendorzo from front counter tablets, laptops, and phones without sacrificing usability.",
    icon: Smartphone,
  },
  {
    title: "Actionable performance analytics",
    description:
      "Measure sales trends and cashier productivity with clear visual reports and daily snapshots.",
    icon: BarChart3,
  },
]

export const workflowSteps: WorkflowStep[] = [
  {
    title: "Start from login",
    description:
      "Use the lightweight login UI to simulate the SaaS sign-in flow while backend auth is still in progress.",
    route: "/login",
    icon: ShieldCheck,
  },
  {
    title: "Operate inside /pos",
    description:
      "Land straight into the dashboard-style POS workspace to process live transactions.",
    route: "/pos",
    icon: Store,
  },
  {
    title: "Improve with data",
    description:
      "Review order health and trends in the analytics and reporting surfaces.",
    route: "/analytics",
    icon: Workflow,
  },
]

export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    summary: "For single-location teams",
    description: "Everything you need to run one store confidently.",
    monthlyPrice: 29,
    yearlyPrice: 24,
    ctaLabel: "Start with Starter",
    ctaRoute: "/login",
    features: [
      "1 store workspace",
      "2 POS terminals",
      "Basic sales analytics",
      "Inventory sync",
      "Email support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    summary: "For scaling multi-branch teams",
    description: "Advanced tools for faster teams and bigger operations.",
    monthlyPrice: 79,
    yearlyPrice: 65,
    ctaLabel: "Choose Growth",
    ctaRoute: "/login",
    highlighted: true,
    badge: "Most popular",
    features: [
      "Up to 3 stores",
      "10 POS terminals",
      "Advanced analytics",
      "Priority support",
      "Staff performance insights",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    summary: "For enterprise retail networks",
    description: "Custom controls, onboarding, and SLA-backed support.",
    monthlyPrice: null,
    yearlyPrice: null,
    ctaLabel: "Talk to sales",
    ctaRoute: "/login",
    features: [
      "Unlimited stores",
      "Unlimited terminals",
      "Custom reporting",
      "Dedicated success manager",
      "Security & compliance review",
    ],
  },
]

export const pricingComparisonRows: PricingComparisonRow[] = [
  {
    feature: "Included stores",
    values: {
      starter: "1",
      growth: "3",
      scale: "Unlimited",
    },
  },
  {
    feature: "POS terminals",
    values: {
      starter: "2",
      growth: "10",
      scale: "Unlimited",
    },
  },
  {
    feature: "Inventory sync",
    values: {
      starter: true,
      growth: true,
      scale: true,
    },
  },
  {
    feature: "Offline-safe checkout",
    values: {
      starter: true,
      growth: true,
      scale: true,
    },
  },
  {
    feature: "Advanced analytics",
    values: {
      starter: false,
      growth: true,
      scale: true,
    },
  },
  {
    feature: "Support channel",
    values: {
      starter: "Email",
      growth: "Priority email",
      scale: "Dedicated manager",
    },
  },
  {
    feature: "Custom onboarding",
    values: {
      starter: false,
      growth: false,
      scale: true,
    },
  },
  {
    feature: "Transaction fee",
    values: {
      starter: "1.8%",
      growth: "1.2%",
      scale: "Custom",
    },
  },
]
