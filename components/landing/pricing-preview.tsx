"use client"

import { ArrowRight, Check, Sparkles } from "lucide-react"
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

export function PricingPreview({ showComparisonCTA = true }: { showComparisonCTA?: boolean }) {
  const router = useRouter()

  return (
    <section id="pricing" className="mx-auto w-full max-w-6xl px-6 lg:px-8 py-24 sm:py-32">
      <div className="mb-16 space-y-4 animate-vendorzo-fade-up text-center md:text-left flex flex-col md:items-start items-center">
        <Badge variant="outline" className="px-4 py-1.5 text-xs tracking-widest uppercase font-semibold text-primary/70 border-primary/20 bg-primary/5 shadow-xs">
          Clear Pricing
        </Badge>
        <h2 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl leading-[1.1]">
          Flexible plans that <span className="text-primary italic">scale</span> with your growth.
        </h2>
        <p className="text-muted-foreground/90 max-w-2xl text-lg mt-2">
          Keep onboarding simple now, then extend billing and entitlement logic when your backend is
          ready.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {pricingPlans.map((plan, index) => (
          <Card
            key={plan.id}
            className={`animate-vendorzo-fade-up flex flex-col border-border/50 shadow-xs transition-all duration-300 hover:border-primary/30 relative ${plan.highlighted ? "border-primary/30 shadow-sm" : ""}`}
            style={{ animationDelay: `${index * 90}ms` }}
          >
            {plan.highlighted && (
              <div className="absolute top-0 inset-x-0 h-1 bg-primary rounded-t-xl" />
            )}
            <CardHeader className="flex-1 pb-8">
              <div className="flex items-center justify-between gap-3 mb-2">
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                {plan.badge && (
                  <Badge variant="secondary" className="font-semibold shadow-xs text-xs px-2.5 py-0.5 bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                    <Sparkles className="size-3 mr-1" />
                    {plan.badge}
                  </Badge>
                )}
              </div>
              <CardDescription className="text-sm leading-relaxed mb-6 h-10">{plan.summary}</CardDescription>
              <div className="flex items-baseline gap-1 mt-auto">
                <span className="text-4xl font-bold tracking-tight">{formatPreviewPrice(plan.monthlyPrice)}</span>
              </div>
            </CardHeader>
            <CardContent className="mt-auto space-y-6">
              <ul className="space-y-3 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-muted-foreground flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-4 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="size-3" />
                    </span>
                    <span className="leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlighted ? "default" : "outline"}
                className={`w-full h-12 shadow-xs ${plan.highlighted ? '' : 'border-border/50 hover:bg-muted/40'}`}
                onClick={() => router.push(plan.ctaRoute)}
              >
                {plan.ctaLabel}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {showComparisonCTA && (
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-border/50 bg-muted/20 p-6 animate-vendorzo-fade-up shadow-xs transition-colors hover:bg-muted/40" style={{ animationDelay: "220ms" }}>
          <p className="text-muted-foreground text-sm font-medium">
            Need a feature-by-feature breakdown? Open the full pricing comparison table.
          </p>
          <Button variant="outline" className="w-full sm:w-auto h-11 border-border/50 shadow-xs group" onClick={() => router.push("/pricing")}>
            View full pricing
            <ArrowRight className="size-4 ml-2 opacity-50 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
          </Button>
        </div>
      )}
    </section>
  )
}