"use client"

import * as React from "react"
import { Check, Minus, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

import {
  type BillingCycle,
  type PricingComparisonValue,
  type PricingPlan,
  pricingComparisonRows,
  pricingPlans,
} from "@/components/landing/content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

function formatPlanPrice(plan: PricingPlan, cycle: BillingCycle) {
  const price = cycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice

  if (price === null) {
    return "Custom"
  }

  return `$${price}`
}

function formatPlanSuffix(plan: PricingPlan, cycle: BillingCycle) {
  const price = cycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice

  if (price === null) {
    return ""
  }

  return cycle === "monthly" ? "/mo" : "/mo billed yearly"
}

function renderComparisonValue(value: PricingComparisonValue) {
  if (typeof value === "boolean") {
    if (value) {
      return (
        <span className="inline-flex items-center justify-center p-2 rounded-full bg-primary/10 text-primary">
          <Check className="size-4" />
          <span className="sr-only">Included</span>
        </span>
      )
    }

    return (
      <span className="inline-flex items-center justify-center">
        <Minus className="text-muted-foreground/30 size-4" />
        <span className="sr-only">Not included</span>
      </span>
    )
  }

  return <span className="text-sm font-semibold tracking-tight">{value}</span>
}

export function PricingComparison() {
  const [billingCycle, setBillingCycle] = React.useState<BillingCycle>("monthly")
  const router = useRouter()

  return (
    <section className="mx-auto w-full max-w-6xl px-6 lg:px-8 py-24 sm:py-32">
      <div className="mb-16 space-y-4 animate-vendorzo-fade-up text-center md:text-left flex flex-col md:items-start items-center">
        <Badge variant="outline" className="px-4 py-1.5 text-xs tracking-widest uppercase font-semibold text-primary/70 border-primary/20 bg-primary/5 shadow-xs">
          Deep Dive
        </Badge>
        <div className="flex flex-col md:flex-row md:items-end justify-between w-full gap-8">
          <div className="space-y-4">
            <h2 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl leading-[1.1]">
              Side-by-side <span className="text-primary italic">capabilities</span> matrix.
            </h2>
            <p className="text-muted-foreground/90 max-w-2xl text-lg mt-2">
              Transparent decision-making with feature-by-feature breakdown of our SaaS tiers.
            </p>
          </div>

          <Tabs
            value={billingCycle}
            onValueChange={(value) => setBillingCycle(value as BillingCycle)}
            className="w-full sm:w-auto shadow-xs rounded-xl p-1 bg-muted/20 border border-border/50 h-12 flex items-center"
          >
            <TabsList className="bg-transparent h-full p-0 w-full flex items-center">
              <TabsTrigger value="monthly" className="h-full rounded-lg px-6 data-[state=active]:bg-background data-[state=active]:shadow-xs transition-all flex-1 sm:flex-initial">Monthly</TabsTrigger>
              <TabsTrigger value="yearly" className="h-full rounded-lg px-6 data-[state=active]:bg-background data-[state=active]:shadow-xs transition-all flex-1 sm:flex-initial">Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="rounded-[2.5rem] border border-border/50 bg-muted/5 p-4 shadow-xs overflow-hidden animate-vendorzo-fade-up" style={{ animationDelay: "120ms" }}>
        <div className="overflow-x-auto rounded-[2rem] bg-background border border-border/50">
          <Table>
            <TableHeader>
              <TableRow className="border-b-0 hover:bg-transparent">
                <TableHead className="w-[300px] h-24 px-8 text-base font-bold uppercase tracking-widest text-muted-foreground/50">Feature Set</TableHead>
                {pricingPlans.map((plan) => (
                  <TableHead key={plan.id} className="text-center h-24 px-8">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xl font-bold tracking-tight text-foreground">{plan.name}</span>
                      <span className="text-sm font-medium text-primary">
                        {formatPlanPrice(plan, billingCycle)}
                        <span className="opacity-50 font-normal">{formatPlanSuffix(plan, billingCycle)}</span>
                      </span>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {pricingComparisonRows.map((row) => (
                <TableRow key={row.feature} className="border-t border-border/30 hover:bg-muted/10 transition-colors">
                  <TableCell className="font-semibold text-muted-foreground h-16 px-8">{row.feature}</TableCell>
                  {pricingPlans.map((plan) => (
                    <TableCell key={`${row.feature}-${plan.id}`} className="text-center px-8">
                      {renderComparisonValue(row.values[plan.id])}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              <TableRow className="border-t border-border/30 hover:bg-transparent">
                <TableCell className="h-24 px-8" />
                {pricingPlans.map((plan) => (
                  <TableCell key={`cta-${plan.id}`} className="text-center px-8 py-8">
                    <Button
                      variant={plan.highlighted ? "default" : "outline"}
                      className="rounded-full shadow-xs px-8 h-12"
                      onClick={() => router.push(plan.ctaRoute)}
                    >
                      {plan.ctaLabel}
                    </Button>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  )
}