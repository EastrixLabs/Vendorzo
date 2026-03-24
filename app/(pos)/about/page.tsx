"use client"

import * as React from "react"
import {
  Building2,
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

import { companyDetails } from "@/lib/business-config"
import { PageFooter } from "@/components/pos/page-footer"
import { PageHeading } from "@/components/pos/page-heading"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/eastrix-labs", icon: Linkedin },
  { label: "Instagram", href: "https://www.instagram.com/eastrixlabs", icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/eastrixlabs", icon: Facebook },
  { label: "Website", href: "https://eastrixlabs.vercel.app", icon: Globe },
] as const

export default function AboutPage() {
  const [isCheckingUpdates, setIsCheckingUpdates] = React.useState(false)
  const [refreshRotation, setRefreshRotation] = React.useState(0)

  React.useEffect(() => {
    if (!isCheckingUpdates) {
      setRefreshRotation(0)
      return
    }

    const intervalId = window.setInterval(() => {
      setRefreshRotation((current) => (current + 24) % 360)
    }, 16)

    return () => window.clearInterval(intervalId)
  }, [isCheckingUpdates])

  return (
    <div>
      <PageHeading
        title="About"
        description="Company, product, and support information for Vendorzo by Eastrix Labs."
        icon={Building2}
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="size-4" />
                Vendorzo by Eastrix Labs
              </CardTitle>
              <CardDescription>Modern POS software designed for service teams and growing retail operations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <p className="text-sm leading-6">
                  Vendorzo is a workspace-first POS experience built by <span className="font-medium">Eastrix Labs</span>,
                  focused on clean checkout flows, staff-friendly operations, and configuration that scales with modern stores.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">POS Workspace</Badge>
                <Badge variant="secondary">Retail Ops</Badge>
                <Badge variant="secondary">Store Management</Badge>
                <Badge variant="outline">Philippines-ready</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="size-4" />
                Company Details
              </CardTitle>
              <CardDescription>Official business information for the team behind Vendorzo.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border p-3 sm:col-span-2">
                <p className="text-muted-foreground mb-1 text-xs">Business Name</p>
                <p className="text-sm font-medium">{companyDetails.businessName}</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-muted-foreground mb-1 text-xs">TIN Number</p>
                <p className="text-sm font-medium">{companyDetails.tinNumber}</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-muted-foreground mb-1 text-xs">Primary Contact</p>
                <p className="text-sm font-medium">{companyDetails.primaryContact}</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-muted-foreground mb-1 text-xs">Support Email</p>
                <p className="text-sm font-medium">{companyDetails.supportEmail}</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-muted-foreground mb-1 text-xs">Billing Email</p>
                <p className="text-sm font-medium">{companyDetails.billingEmail}</p>
              </div>
              <div className="rounded-lg border p-3 sm:col-span-2">
                <p className="text-muted-foreground mb-1 text-xs">Business Address</p>
                <p className="text-sm font-medium">{companyDetails.businessAddress}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="size-4" />
                Support & Socials
              </CardTitle>
              <CardDescription>Ways to contact or follow the Vendorzo and Eastrix Labs team.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:bg-accent hover:text-accent-foreground flex items-center justify-between rounded-lg border p-3 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <link.icon className="size-4" />
                    <span className="text-sm font-medium">{link.label}</span>
                  </div>
                  <span className="text-muted-foreground text-xs">{link.href.replace(/^https?:\/\//, "")}</span>
                </a>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="size-4" />
                App Status
              </CardTitle>
              <CardDescription>Helpful product details for your current Vendorzo workspace.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg border p-3">
                <p className="text-muted-foreground mb-1 text-xs">Version</p>
                <p className="text-sm font-medium">Vendorzo POS v0.1.0</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-muted-foreground mb-1 text-xs">Update Channel</p>
                <p className="text-sm font-medium">Stable Release</p>
              </div>
              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => {
                  setIsCheckingUpdates(true)
                  window.setTimeout(() => setIsCheckingUpdates(false), 900)
                }}
              >
                <span>{isCheckingUpdates ? "Checking for Updates..." : "Check for Updates"}</span>
                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                  <RefreshCw
                    className="size-3.5 transition-transform"
                    style={{ transform: `rotate(${refreshRotation}deg)` }}
                  />
                  {isCheckingUpdates ? "Please wait" : "You're Up to Date"}
                </span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <PageFooter />
    </div>
  )
}
