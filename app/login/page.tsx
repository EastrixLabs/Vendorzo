import { LoginForm } from "@/components/auth/login-form"
import { Brand } from "@/components/brand"
import { LandingFooter } from "@/components/landing/landing-footer"
import { LandingHeader } from "@/components/landing/landing-header"
import { Badge } from "@/components/ui/badge"

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <LandingHeader activePage="login" />

      <section className="flex-1 flex flex-col justify-center items-center mx-auto w-full max-w-3xl px-2 py-12 text-center sm:px-6 md:py-16 lg:px-8">
        <div className="flex flex-col items-center gap-4">
          <Brand className="size-16 animate-vendorzo-fade-scale" alt="Vendorzo brand" />
          <Badge variant="secondary">Login</Badge>
          <h1 className="text-3xl leading-tight font-semibold sm:text-4xl">
            Welcome back.
          </h1>
          <p className="text-muted-foreground max-w-xl text-base sm:text-lg">
            Sign in to open your Vendorzo workspace.
          </p>
        </div>

        <div className="mt-10 w-full max-w-md animate-vendorzo-fade-up" style={{ animationDelay: "120ms" }}>
          <LoginForm />
        </div>
      </section>

      <LandingFooter />
    </main>
  )
}