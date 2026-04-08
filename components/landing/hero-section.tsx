"use client"

import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

import { trustedBrands } from "@/components/landing/content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const router = useRouter()

  return (
    <section className="relative overflow-hidden border-b bg-background">
      {/* Abstract Grid Gradient Background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Ambient glow */}
      <div className="bg-primary/15 animate-vendorzo-drift absolute top-0 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-[100%] blur-[80px] motion-reduce:animate-none" />

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center mx-4 py-20 text-center sm:px-6 md:py-32 lg:px-8">
        <Badge
          variant="outline"
          className="animate-vendorzo-fade-scale bg-background/50 inline-flex items-center gap-1.5 px-3 py-1 backdrop-blur-sm"
          style={{ animationDelay: "60ms" }}
        >
          <Sparkles className="size-3.5" />
          Safer onboarding, faster checkout
        </Badge>

        <div className="mt-8 space-y-6">
          <h1
            className="animate-vendorzo-fade-up text-balance text-4xl leading-[1.1] font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ animationDelay: "120ms" }}
          >
            Run your store from one <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">clean workspace</span>.
          </h1>
          <p
            className="text-muted-foreground mx-auto max-w-2xl animate-vendorzo-fade-up text-base sm:text-lg md:text-xl"
            style={{ animationDelay: "180ms" }}
          >
            A clean storefront entry that keeps checkout and pricing easy to find.
          </p>
        </div>

        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-vendorzo-fade-up"
          style={{ animationDelay: "240ms" }}
        >
          <Button size="lg" className="h-12 rounded-full px-8 text-base" onClick={() => router.push("/pos")}>
            Open /pos
            <ArrowRight className="size-4" />
          </Button>
          <Button size="lg" variant="outline" className="h-12 rounded-full bg-background/50 px-8 text-base backdrop-blur-sm" onClick={() => router.push("/pricing")}>
            View pricing
          </Button>
        </div>

        <div
          className="mt-16 flex flex-wrap items-center justify-center gap-4 animate-vendorzo-fade-up opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0"
          style={{ animationDelay: "300ms" }}
        >
          {trustedBrands.map((brand) => (
            <Badge key={brand} variant="outline" className="text-xs bg-background/50 backdrop-blur-sm">
              {brand}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  )
}