import { Metadata } from "next"
import { LandingHeader } from "@/components/landing/landing-header"
import { LandingFooter } from "@/components/landing/landing-footer"

export const metadata: Metadata = {
  title: "Terms of Service | Vendorzo",
  description: "Terms of Service for Vendorzo POS SaaS by Eastrix Labs.",
}

export default function TermsOfServicePage() {
  const lastUpdated = "April 10, 2026"

  return (
    <div className="min-h-screen bg-background font-sans">
      <LandingHeader />

      <main className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="space-y-12 animate-vendorzo-fade-up">
          <header className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
          </header>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-10">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using the Vendorzo POS platform ("the Service"), provided by Eastrix Labs ("Eastrix"),
                you agree to be bound by these Terms of Service. If you are entering into these terms on behalf of a
                company or other legal entity, you represent that you have the authority to bind such entity.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">2. Description of Service</h2>
              <p className="text-muted-foreground leading-relaxed">
                Vendorzo is a Software-as-a-Service (SaaS) Point of Sale solution designed to help businesses manage
                sales, inventory, and analytics. Eastrix reserves the right to modify, suspend, or discontinue the
                Service at any time.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">3. Account Registration</h2>
              <p className="text-muted-foreground leading-relaxed">
                To use the Service, you must register for an account. You are responsible for maintaining the
                confidentiality of your account credentials and for all activities that occur under your account.
                You agree to notify Eastrix immediately of any unauthorized use of your account.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">4. Fees and Payment</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Service is billed on a subscription basis. You agree to pay all fees associated with your
                chosen plan. Fees are non-refundable unless otherwise stated. Eastrix reserves the right to
                change pricing with 30 days' notice.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">5. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All rights, title, and interest in and to the Service, including software, designs, and branding,
                are and will remain the exclusive property of Eastrix Labs. You are granted a limited, non-transferable
                license to use the Service solely for your business operations.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">6. Prohibited Use</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree not to use the Service for any illegal purpose, or to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-4">
                <li>Reverse engineer or attempt to extract source code.</li>
                <li>Interfere with or disrupt the integrity or performance of the Service.</li>
                <li>Upload malicious code or bypass security measures.</li>
                <li>Resell or sublicense the Service without explicit permission.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">7. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, EASTRIX LABS SHALL NOT BE LIABLE FOR ANY INDIRECT,
                INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF
                THE SERVICE.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">8. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in
                which Eastrix Labs is registered, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="space-y-6 pt-8 border-t border-border">
              <h2 className="text-2xl font-semibold">Contact Us</h2>
              <p className="text-muted-foreground">
                For questions regarding these Terms, please contact Eastrix Labs:
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
