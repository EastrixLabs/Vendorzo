"use client"

import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

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
    <section className="bg-background py-16 overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-12 px-4 py-1.5 text-xs tracking-widest uppercase font-semibold text-primary/70 border-primary/20 bg-primary/5 shadow-xs">
            Trusted by growing teams
          </Badge>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col gap-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
        >
          <div className="flex w-max gap-6 animate-vendorzo-marquee">
            {[...brandsRow1, ...brandsRow1, ...brandsRow1, ...brandsRow1].map((brand, i) => (
              <div
                key={`r1-${i}`}
                className="flex h-12 w-48 shrink-0 items-center justify-center rounded-xl border border-border/50 bg-muted/20 text-sm font-semibold shadow-xs text-muted-foreground transition-all hover:text-foreground hover:bg-muted/40 cursor-default"
              >
                {brand}
              </div>
            ))}
          </div>

          <div className="flex w-max gap-6 animate-vendorzo-marquee-reverse">
            {[...brandsRow2, ...brandsRow2, ...brandsRow2, ...brandsRow2].map((brand, i) => (
              <div
                key={`r2-${i}`}
                className="flex h-12 w-48 shrink-0 items-center justify-center rounded-xl border border-border/50 bg-muted/20 text-sm font-semibold shadow-xs text-muted-foreground transition-all hover:text-foreground hover:bg-muted/40 cursor-default"
              >
                {brand}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
