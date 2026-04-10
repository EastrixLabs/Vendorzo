"use client"

import { Github, Linkedin, Mail } from "lucide-react"
import { motion } from "framer-motion"

import { Brand } from "@/components/brand"
import { ThemeToggle } from "@/components/pos/theme-toggle"

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/eastrix-labs/",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/EastrixLabs",
    icon: Github,
  },
  {
    label: "Email",
    href: "mailto:eastrixlabs@gmail.com",
    icon: Mail,
  },
] as const

export function LandingFooter() {
  const year = new Date().getFullYear()

  return (
    <motion.footer
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-t bg-background/50 backdrop-blur-sm"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row md:items-start text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <Brand className="size-8" alt="Vendorzo logo" />
              <div className="text-left leading-tight">
                <p className="text-[17px] font-bold tracking-tight">Vendorzo</p>
                <p className="text-muted-foreground text-[10px] uppercase tracking-[0.2em] font-bold">by Eastrix Labs</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed font-medium mt-1">
              SaaS-style retail operations and point-of-sale experiences designed for speed and clarity.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-6">
            <ThemeToggle />
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={social.href.startsWith("mailto:") ? undefined : "noreferrer"}
                  aria-label={social.label}
                  className="text-muted-foreground hover:text-foreground inline-flex size-8 items-center justify-center rounded-md border border-border/50 transition-all hover:bg-muted/80 shadow-xs active:scale-95 bg-background/50"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-6 border-t border-border/30 pt-8 sm:flex-row sm:justify-between text-sm text-muted-foreground">
          <p>© {year} <span className="text-foreground font-medium">Vendorzo</span> by Eastrix Labs. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-foreground transition-colors font-medium">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors font-medium">Privacy Policy</a>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}