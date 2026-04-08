"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"

const brandsRow1 = [
  "Urban Cart",
  "Northbean",
  "Freshline",
  "Loop Market",
  "Vanguard",
  "Pioneer",
  "Apex Retail",
  "Aura POS",
  "Zenith",
]

const brandsRow2 = [
  "Lumina",
  "Nova Store",
  "Horizon",
  "Meridian",
  "Nexus",
  "Echo Supply",
  "Atlas Goods",
  "Solstice",
  "Crest",
]

export function TrustedBrandsMarquee() {
  return (
    <section className="border-y bg-muted/10 py-16 overflow-hidden">
      <div className="mx-auto w-full max-w-6xl mx-4 text-center">
        <Badge variant="secondary" className="mb-12 animate-vendorzo-fade-up px-4 py-1.5 text-sm">
          Trusted by growing teams
        </Badge>

        <div className="relative flex flex-col gap-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] animate-vendorzo-fade-up" style={{ animationDelay: "120ms" }}>
          <div className="flex w-max gap-8 animate-vendorzo-marquee">
            {[...brandsRow1, ...brandsRow1, ...brandsRow1, ...brandsRow1].map((brand, i) => (
              <div
                key={`r1-${i}`}
                className="flex h-14 w-52 shrink-0 items-center justify-center rounded-2xl border bg-background/50 backdrop-blur-sm text-base font-semibold shadow-sm text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50"
              >
                {brand}
              </div>
            ))}
          </div>

          <div className="flex w-max gap-8 animate-vendorzo-marquee-reverse">
            {[...brandsRow2, ...brandsRow2, ...brandsRow2, ...brandsRow2].map((brand, i) => (
              <div
                key={`r2-${i}`}
                className="flex h-14 w-52 shrink-0 items-center justify-center rounded-2xl border bg-background/50 backdrop-blur-sm text-base font-semibold shadow-sm text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
