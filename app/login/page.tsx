import { LoginForm } from "@/components/auth/login-form"
import { Brand } from "@/components/brand"
import { LandingFooter } from "@/components/landing/landing-footer"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <main className="min-h-svh bg-background relative flex flex-col">
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <div className="flex size-8 items-center justify-center rounded-full border border-border/50 bg-background shadow-xs transition-transform group-hover:-translate-x-1">
            <ChevronLeft className="size-4" />
          </div>
          <span className="hidden sm:inline">Go back</span>
        </Link>
      </div>

      <section className="min-h-svh relative flex flex-col justify-center items-center w-full px-6 py-20 lg:py-32">
        <div className="relative z-10 flex flex-col items-center w-full max-w-md animate-vendorzo-fade-up">

          <div className="flex flex-col items-center gap-3 mb-8">
            <Brand size={32} className="rounded-lg shadow-xs" />
            <span className="text-xl font-bold tracking-tight">Vendorzo</span>
          </div>

          <div className="text-center space-y-3 mb-10">
            <h1 className="text-4xl font-bold tracking-tight leading-tight flex items-baseline justify-center gap-3">
              <span className="italic font-thin text-3xl text-muted-foreground">Welcome</span>
              <span>Back</span>
            </h1>
            <p className="text-muted-foreground text-sm font-medium">
              Access your retail workspace.
            </p>
          </div>

          <div className="w-full">
            <LoginForm />
          </div>
        </div>
      </section>

      <LandingFooter />
    </main>
  )
}