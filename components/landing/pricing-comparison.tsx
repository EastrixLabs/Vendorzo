"use client"

import * as React from "react"
import { Check, Minus } from "lucide-react"
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
        <span className="inline-flex items-center justify-center">
          <Check className="text-primary size-4" />
          <span className="sr-only">Included</span>
        </span>
      )
    }

    return (
      <span className="inline-flex items-center justify-center">
        <Minus className="text-muted-foreground size-4" />
        <span className="sr-only">Not included</span>
      </span>
    )
  }

  return <span className="text-sm font-medium">{value}</span>
}

export function PricingComparison() {
  const [billingCycle, setBillingCycle] = React.useState<BillingCycle>("monthly")
  const router = useRouter()

  return (
    <section className="mx-auto w-full max-w-6xl space-y-8 mx-4 pb-14 sm:px-6 md:pb-20 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold sm:text-3xl">Plan comparison</h2>
        <Tabs
          value={billingCycle}
          onValueChange={(value) => setBillingCycle(value as BillingCycle)}
        >
          <TabsList aria-label="Billing cycle">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {pricingPlans.map((plan) => {
          const suffix = formatPlanSuffix(plan, billingCycle)

          return (
            <Card
              key={plan.id}
              className={plan.highlighted ? "border-primary/40 bg-primary/5" : undefined}
            >
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle>{plan.name}</CardTitle>
                  {plan.badge ? <Badge>{plan.badge}</Badge> : null}
                </div>
                <CardDescription>{plan.description}</CardDescription>
                <p className="text-3xl leading-none font-semibold">
                  {formatPlanPrice(plan, billingCycle)}
                  {suffix ? (
                    <span className="text-muted-foreground ml-1 text-sm font-medium">{suffix}</span>
                  ) : null}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="text-muted-foreground flex items-center gap-2">
                      <Check className="text-primary size-4" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={plan.highlighted ? "default" : "outline"}
                  onClick={() => router.push(plan.ctaRoute)}
                >
                  {plan.ctaLabel}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Feature matrix</CardTitle>
          <CardDescription>
            Side-by-side plan details for transparent decision making.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                {pricingPlans.map((plan) => (
                  <TableHead key={plan.id} className="text-center">
                    {plan.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {pricingComparisonRows.map((row) => (
                <TableRow key={row.feature}>
                  <TableCell className="font-medium">{row.feature}</TableCell>
                  {pricingPlans.map((plan) => (
                    <TableCell key={`${row.feature}-${plan.id}`} className="text-center">
                      {renderComparisonValue(row.values[plan.id])}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  )
}