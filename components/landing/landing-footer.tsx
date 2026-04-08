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
    <footer className="border-t animate-vendorzo-fade-up" style={{ animationDelay: "120ms" }}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 mx-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <Brand className="size-7" alt="Vendorzo logo" />
            <div>
              <p className="text-sm font-semibold">Vendorzo</p>
              <p className="text-muted-foreground text-xs">
                SaaS-style retail operations and point-of-sale experience.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={social.href.startsWith("mailto:") ? undefined : "noreferrer"}
                  aria-label={social.label}
                  className="text-muted-foreground hover:text-foreground inline-flex size-10 items-center justify-center rounded-full border transition-colors hover:bg-muted/60"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="text-muted-foreground flex flex-col gap-4 border-t pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Vendorzo by Eastrix Labs. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
             <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
             <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}