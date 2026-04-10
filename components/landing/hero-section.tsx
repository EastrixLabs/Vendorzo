"use client"

import { ArrowUpRight, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GLSLHills } from "@/components/ui/glsl-hills"

export function HeroSection() {
  const router = useRouter()

  return (
    <section className="relative flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden bg-background">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-50 z-0">
        <GLSLHills />
      </div>

      <div className="space-y-8 z-10 text-center mx-auto max-w-6xl px-6 lg:px-8">
        <Badge
          variant="outline"
          className="animate-vendorzo-fade-scale bg-background/50 inline-flex items-center gap-1.5 px-3 py-1 backdrop-blur-sm shadow-xs border-border/50"
          style={{ animationDelay: "60ms" }}
        >
          <Sparkles className="size-3.5 text-primary" />
          <span className="opacity-90">Safer onboarding, faster checkout</span>
        </Badge>

        <h1
          className="animate-vendorzo-fade-up font-semibold text-6xl sm:text-7xl lg:text-8xl tracking-tight leading-[1.1] text-foreground whitespace-pre-wrap"
          style={{ animationDelay: "120ms" }}
        >
          <span className="italic font-thin text-5xl sm:text-6xl lg:text-7xl opacity-80 block mb-2 text-muted-foreground">Operations That Run <br className="hidden sm:block" /></span>
          Smooth Like Butter
        </h1>

        <p
          className="text-muted-foreground/80 mx-auto max-w-2xl animate-vendorzo-fade-up text-lg sm:text-xl font-medium"
          style={{ animationDelay: "180ms" }}
        >
          A clean storefront entry that keeps checkout and pricing easy to find. <br className="hidden sm:block" /> We craft robust point-of-sale experiences so you can scale faster.
        </p>

        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-vendorzo-fade-up"
          style={{ animationDelay: "240ms" }}
        >
          <Button size="lg" className="h-14 rounded-full px-8 text-base shadow-xs" onClick={() => router.push("/pos")}>
            Book a demo
            <ArrowUpRight className="size-5 ml-2" />
          </Button>
          <Button size="lg" variant="outline" className="h-14 rounded-full bg-background/50 px-8 text-base backdrop-blur-sm shadow-xs border-border/50 hover:bg-muted/50" onClick={() => router.push("/pricing")}>
            View pricing
          </Button>
        </div>
      </div>

      {/* Modern Section Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none z-20" />
    </section>
  )
}