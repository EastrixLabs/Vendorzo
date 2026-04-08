import { LandingFooter } from "@/components/landing/landing-footer"
import { LandingHeader } from "@/components/landing/landing-header"
import { PricingComparison } from "@/components/landing/pricing-comparison"
import { FAQSection } from "@/components/landing/faq-section"
import { ContactSection } from "@/components/landing/contact-section"
import { Badge } from "@/components/ui/badge"

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background">
      <LandingHeader activePage="pricing" />

      <section className="mx-auto w-full max-w-6xl mx-4 pt-12 pb-8 sm:px-6 lg:px-8">
        <Badge variant="secondary">Pricing</Badge>
        <h1 className="mt-3 max-w-3xl text-3xl leading-tight font-semibold sm:text-4xl">
          Pricing that scales with your store operations.
        </h1>
        <p className="text-muted-foreground mt-3 max-w-3xl text-base sm:text-lg">
          Choose a plan for your current stage, compare capabilities side by side, and route teams
          into `/pos` with a familiar SaaS experience.
        </p>
      </section>

      <PricingComparison />
      <FAQSection />
      <ContactSection />
      <LandingFooter />
    </main>
  )
}