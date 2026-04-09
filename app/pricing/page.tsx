import { LandingFooter } from "@/components/landing/landing-footer"
import { LandingHeader } from "@/components/landing/landing-header"
import { FAQSection } from "@/components/landing/faq-section"
import { ContactSection } from "@/components/landing/contact-section"
import { PricingSection, type Plan } from "@/components/ui/pricing"

import { PricingComparison } from "@/components/landing/pricing-comparison"

const PRICING_PLANS: Plan[] = [
  {
    name: 'Starter',
    info: 'For single-location teams',
    price: {
      monthly: 29,
      yearly: Math.round(29 * 12 * 0.8), // 20% off
    },
    features: [
      { text: '1 store workspace' },
      { text: '2 POS terminals' },
      { text: 'Basic sales analytics' },
      { text: 'Inventory sync' },
      { text: 'Email support' },
    ],
    btn: {
      text: 'Start with Starter',
      href: '/login',
    },
  },
  {
    highlighted: true,
    name: 'Growth',
    info: 'For scaling multi-branch teams',
    price: {
      monthly: 79,
      yearly: Math.round(79 * 12 * 0.8), // 20% off
    },
    features: [
      { text: 'Up to 3 stores' },
      { text: '10 POS terminals' },
      { text: 'Advanced analytics' },
      { text: 'Priority support' },
      { text: 'Staff performance insights' },
    ],
    btn: {
      text: 'Choose Growth',
      href: '/login',
    },
  },
  {
    name: 'Scale',
    info: 'For enterprise retail networks',
    price: {
      monthly: 'Custom',
      yearly: 'Custom',
    },
    features: [
      { text: 'Unlimited stores' },
      { text: 'Unlimited terminals' },
      { text: 'Custom reporting' },
      { text: 'Dedicated success manager' },
      { text: 'Security & compliance review' },
    ],
    btn: {
      text: 'Talk to sales',
      href: '/contact',
    },
  },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background">
      <LandingHeader activePage="pricing" />

      <PricingSection
        plans={PRICING_PLANS}
      />

      <PricingComparison />
      <FAQSection />
      <ContactSection />
      <LandingFooter />
    </main>
  )
}