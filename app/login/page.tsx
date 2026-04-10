import { LoginForm } from "@/components/auth/login-form"
import { Brand } from "@/components/brand"
import { LandingFooter } from "@/components/landing/landing-footer"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background text-foreground relative flex flex-col items-center">
      <div className="w-full max-w-6xl flex justify-start px-6 pt-6 z-20 absolute top-0">
        <Link
          href="/"
          className="group flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <div className="flex size-9 items-center justify-center bg-background transition-transform group-hover:-translate-x-1">
            <ChevronLeft className="size-4" />
          </div>
          <span>Go back</span>
        </Link>
      </div>

      <section className="min-h-screen w-full max-w-6xl relative flex flex-col justify-center items-center px-6 py-20">
        <div className="relative z-10 w-full max-w-md animate-vendorzo-fade-up">
          <Card className="w-full border-border/40 bg-card/95 shadow-sm py-8">
            <CardHeader className="flex flex-col items-center text-center gap-6 px-8 pb-0">
              <div className="flex flex-col items-center gap-3">
                <Brand size={40} />
                <div>
                  <span className="text-2xl font-bold tracking-tight border-b-2 border-primary/20 pb-0.5">Vendorzo</span>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60">by Eastrix Labs</p>
                </div>
              </div>

              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight leading-tight flex items-center justify-center gap-2">
                  <span className="italic font-light text-muted-foreground">Welcome</span>
                  <span>back</span>
                </h1>
                <p className="text-muted-foreground text-sm font-medium">
                  Access your retail workspace.
                </p>
              </div>
            </CardHeader>

            <CardContent className="px-0 pt-6 pb-0">
              <LoginForm />
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="w-full">
        <LandingFooter />
      </div>
    </main>
  )
}