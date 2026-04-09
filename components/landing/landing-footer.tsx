import { Github, Linkedin, Mail } from "lucide-react"

import { Brand } from "@/components/brand"
import { ThemeToggle } from "@/components/pos/theme-toggle"

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com",
    icon: Github,
  },
  {
    label: "Email",
    href: "mailto:hello@vendorzo.com",
    icon: Mail,
  },
] as const

export function LandingFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t animate-vendorzo-fade-up bg-background/50 backdrop-blur-sm" style={{ animationDelay: "120ms" }}>
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row md:items-start text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <Brand className="size-8" alt="Vendorzo logo" />
              <span className="text-xl font-bold tracking-tight">Vendorzo</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              SaaS-style retail operations and point-of-sale experiences designed for speed and clarity.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground mr-2">Theme</span>
              <ThemeToggle />
            </div>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={social.href.startsWith("mailto:") ? undefined : "noreferrer"}
                  aria-label={social.label}
                  className="text-muted-foreground hover:text-foreground inline-flex size-8 items-center justify-center rounded-2xl border border-border/50 transition-all hover:bg-muted/80 shadow-xs active:scale-95"
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
            <a href="#" className="hover:text-foreground transition-colors font-medium">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors font-medium">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}