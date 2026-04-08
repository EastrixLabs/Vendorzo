"use client"

import { ArrowRight, Check } from "lucide-react"
import { useRouter } from "next/navigation"

import { pricingPlans } from "@/components/landing/content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function formatPreviewPrice(price: number | null) {
  if (price === null) {
    return "Custom"
  }

  return `$${price}/mo`
}

export function PricingPreview() {
  const router = useRouter()

  return (
    <section id="pricing" className="mx-auto w-full max-w-6xl mx-4 py-14 sm:px-6 md:py-20 lg:px-8">
      <div className="mb-8 flex flex-col gap-3 animate-vendorzo-fade-up">
        <Badge variant="secondary" className="w-fit">
          Pricing
        </Badge>
        <h2 className="max-w-3xl text-2xl font-semibold sm:text-3xl">
          Flexible plans that scale from a single counter to multi-location operations.
        </h2>
        <p className="text-muted-foreground max-w-3xl text-sm sm:text-base">
          Keep onboarding simple now, then extend billing and entitlement logic when your backend is
          ready.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {pricingPlans.map((plan, index) => (
          <Card
            key={plan.id}
            className={`animate-vendorzo-fade-up ${plan.highlighted ? "border-primary/40 bg-primary/5" : ""}`}
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <CardTitle>{plan.name}</CardTitle>
                {plan.badge ? <Badge>{plan.badge}</Badge> : null}
              </div>
              <CardDescription>{plan.summary}</CardDescription>
              <p className="text-3xl font-semibold">{formatPreviewPrice(plan.monthlyPrice)}</p>
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
                variant={plan.highlighted ? "default" : "outline"}
                className="w-full"
                onClick={() => router.push(plan.ctaRoute)}
              >
                {plan.ctaLabel}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4 animate-vendorzo-fade-up" style={{ animationDelay: "220ms" }}>
        <p className="text-muted-foreground text-sm">
          Need feature-by-feature breakdown? Open the full pricing comparison table.
        </p>
        <Button variant="outline" onClick={() => router.push("/pricing")}>
          View full pricing table
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </section>
  )
}