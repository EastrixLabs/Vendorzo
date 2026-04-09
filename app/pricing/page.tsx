import { LandingFooter } from "@/components/landing/landing-footer"
import { LandingHeader } from "@/components/landing/landing-header"
import { PricingPreview } from "@/components/landing/pricing-preview"
import { FAQSection } from "@/components/landing/faq-section"
import { ContactSection } from "@/components/landing/contact-section"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

import { PricingComparison } from "@/components/landing/pricing-comparison"

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background">
      <LandingHeader activePage="pricing" />

      <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 pt-24 pb-12 text-center lg:px-8">
        <Badge variant="outline" className="animate-vendorzo-fade-scale bg-primary/5 text-primary gap-1.5 px-4 py-1.5 border-primary/20 shadow-xs uppercase tracking-widest text-[10px] font-bold">
          <Sparkles className="size-3.5" />
          Flexible Plans
        </Badge>

        <h1 className="mt-8 font-semibold text-5xl sm:text-6xl md:text-7xl tracking-tight leading-[1.1] animate-vendorzo-fade-up">
          <span className="italic font-thin text-4xl sm:text-5xl md:text-6xl opacity-80 block mb-2 text-muted-foreground">Pricing That Scales With</span>
          Your Store Operations
        </h1>

        <p className="text-muted-foreground mt-6 max-w-2xl text-lg sm:text-xl animate-vendorzo-fade-up font-medium" style={{ animationDelay: "60ms" }}>
          Choose a plan for your current stage, with clear, upfront costs and a focus on keeping checkout and pricing simple.
        </p>
      </section>

      <PricingPreview showComparisonCTA={false} />
      <PricingComparison />
      <FAQSection />
      <ContactSection />
      <LandingFooter />
    </main>
  )
}