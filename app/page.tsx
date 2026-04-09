import { FeaturesGrid } from "@/components/landing/features-grid"
import { HeroSection } from "@/components/landing/hero-section"
import { LandingFooter } from "@/components/landing/landing-footer"
import { LandingHeader } from "@/components/landing/landing-header"
import { PricingPreview } from "@/components/landing/pricing-preview"
import { TrustedBrandsMarquee } from "@/components/landing/trusted-brands-marquee"
import { FAQSection } from "@/components/landing/faq-section"
import { ContactSection } from "@/components/landing/contact-section"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <LandingHeader activePage="home" />
      <HeroSection />
      <TrustedBrandsMarquee />
      <FeaturesGrid />
      <PricingPreview />
      <FAQSection />
      <ContactSection />
      <LandingFooter />
    </main>
  )
}
