"use client"

import { ArrowUpRight } from "lucide-react"
import { useRouter } from "next/navigation"

import { Brand } from "@/components/brand"
import { Button } from "@/components/ui/button"

type LandingPage = "home" | "pricing" | "login"

type LandingHeaderProps = {
  activePage?: LandingPage
}

const navItems: Array<{ key: Exclude<LandingPage, "login">; label: string; href: string }> = [
  { key: "home", label: "Home", href: "/" },
  { key: "pricing", label: "Pricing", href: "/pricing" },
]

export function LandingHeader({ activePage = "home" }: LandingHeaderProps) {
  const router = useRouter()

  return (
    <header className="sticky top-4 z-50 w-full px-4">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 rounded-full border border-border/60 bg-background/60 px-4 py-3 shadow-[0_14px_40px_-24px_rgba(0,0,0,0.45)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 sm:px-5">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="hover:bg-muted/60 inline-flex items-center gap-2 rounded-full px-2.5 py-1.5 transition-colors"
          aria-label="Go to Vendorzo home"
        >
          <Brand className="size-8" alt="Vendorzo logo" />
          <div className="hidden text-left leading-none sm:block">
            <p className="text-sm font-semibold">Vendorzo</p>
            <p className="text-muted-foreground text-[10px] uppercase tracking-wider font-medium">by Eastrix Labs</p>
          </div>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Button
              key={item.key}
              variant={activePage === item.key ? "secondary" : "ghost"}
              size="sm"
              onClick={() => router.push(item.href)}
              aria-label={`Go to ${item.label}`}
            >
              {item.label}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={activePage === "login" ? "secondary" : "outline"}
            size="sm"
            onClick={() => router.push("/login")}
          >
            Log in
          </Button>
          <Button size="sm" onClick={() => router.push("/pos")}>
            Book a demo
            <ArrowUpRight className="size-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}