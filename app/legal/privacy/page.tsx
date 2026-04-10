import { Metadata } from "next"
import { LandingHeader } from "@/components/landing/landing-header"
import { LandingFooter } from "@/components/landing/landing-footer"

export const metadata: Metadata = {
  title: "Privacy Policy | Vendorzo",
  description: "Privacy Policy for Vendorzo POS SaaS by Eastrix Labs.",
}

export default function PrivacyPolicyPage() {
  const lastUpdated = "April 10, 2026"

  return (
    <div className="min-h-screen bg-background font-sans">
      <LandingHeader />

      <main className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="space-y-12 animate-vendorzo-fade-up">
          <header className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
          </header>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to Vendorzo, a SaaS Point of Sale (POS) solution provided by Eastrix Labs ("we," "our," or "us").
                We are committed to protecting your privacy and the security of your business data. This Privacy Policy
                explains how we collect, use, and safeguard information when you use our platform.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-border p-6 bg-card">
                  <h3 className="font-medium mb-2">Account Information</h3>
                  <p className="text-sm text-muted-foreground">Name, email address, business name, and contact details provided during registration.</p>
                </div>
                <div className="rounded-2xl border border-border p-6 bg-card">
                  <h3 className="font-medium mb-2">Transaction Data</h3>
                  <p className="text-sm text-muted-foreground">Sales records, inventory levels, and customer transaction history processed through the POS.</p>
                </div>
                <div className="rounded-2xl border border-border p-6 bg-card">
                  <h3 className="font-medium mb-2">Technical Data</h3>
                  <p className="text-sm text-muted-foreground">IP addresses, browser type, device identifiers, and usage patterns on our platform.</p>
                </div>
                <div className="rounded-2xl border border-border p-6 bg-card">
                  <h3 className="font-medium mb-2">Financial Data</h3>
                  <p className="text-sm text-muted-foreground">Payment processing information (handled securely via third-party providers).</p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-4">
                <li>To provide, maintain, and improve our POS services.</li>
                <li>To process transactions and manage your business account.</li>
                <li>To provide technical support and respond to inquiries.</li>
                <li>To ensure the security and integrity of our platform.</li>
                <li>To comply with legal obligations and financial regulations.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">4. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement industry-standard security measures, including end-to-end encryption and regular security audits,
                to protect your data from unauthorized access, alteration, or destruction. Your data is stored on secure
                servers with restricted access.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">5. Data Sharing and Disclosure</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell your personal or business data. We may share information with trusted third-party service
                providers (e.g., payment processors, cloud hosting) only as necessary to provide our services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">6. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                Depending on your location, you may have rights to access, correct, or delete your personal data.
                You can manage most of your information through your Vendorzo dashboard or by contacting our support team.
              </p>
            </section>

            <section className="space-y-6 pt-8 border-t border-border">
              <h2 className="text-2xl font-semibold">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact the Eastrix Labs legal team:
              </p>
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium">
                eastrixlabs@gmail.com
              </div>
            </section>
          </div>
        </div>
      </main>

      <LandingFooter />
    </div>
  )
}
