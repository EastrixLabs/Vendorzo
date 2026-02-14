"use client"

import { Clock3, Mail, ShieldCheck, Smartphone, Store, UserCircle2 } from "lucide-react"

import { PageHeading } from "@/components/pos/page-heading"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export default function ProfilePage() {
  return (
    <div>
      <PageHeading
        title="User Profile"
        description="Staff account details, shift context, and access controls for POS usage."
        icon={UserCircle2}
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Profile Overview</CardTitle>
            <CardDescription>Identity and role details used across this store.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 rounded-lg border p-3">
              <Avatar size="lg">
                <AvatarFallback>KC</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-base font-semibold">Kurt Calacday</p>
                <p className="text-muted-foreground text-sm">Store Admin · Vendorzo Downtown</p>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">Active Shift</Badge>
                  <Badge variant="outline">Staff ID: VNZ-014</Badge>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border p-3">
                <p className="text-muted-foreground mb-1 text-xs">Email</p>
                <p className="flex items-center gap-2 text-sm font-medium">
                  <Mail className="text-muted-foreground size-4" />
                  kurt@vendorzo.com
                </p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-muted-foreground mb-1 text-xs">Device</p>
                <p className="flex items-center gap-2 text-sm font-medium">
                  <Smartphone className="text-muted-foreground size-4" />
                  iPad POS Terminal
                </p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-muted-foreground mb-1 text-xs">Assigned Branch</p>
                <p className="flex items-center gap-2 text-sm font-medium">
                  <Store className="text-muted-foreground size-4" />
                  Vendorzo Downtown
                </p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-muted-foreground mb-1 text-xs">Current Shift</p>
                <p className="flex items-center gap-2 text-sm font-medium">
                  <Clock3 className="text-muted-foreground size-4" />
                  08:00 AM - 04:00 PM
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Permissions</CardTitle>
            <CardDescription>Access levels granted to this account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg border p-3">
              <p className="mb-2 text-sm font-medium">Role Scope</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">POS Checkout</Badge>
                <Badge variant="secondary">Refund Approval</Badge>
                <Badge variant="secondary">Inventory View</Badge>
                <Badge variant="secondary">Settings Access</Badge>
              </div>
            </div>

            <div className="space-y-2 rounded-lg border p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Biometric sign-in</p>
                  <p className="text-muted-foreground text-xs">
                    Faster unlock at assigned checkout stations
                  </p>
                </div>
                <Switch checked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Session lock timeout</p>
                  <p className="text-muted-foreground text-xs">
                    Auto-lock after 5 minutes of inactivity
                  </p>
                </div>
                <Switch checked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Override PIN required</p>
                  <p className="text-muted-foreground text-xs">
                    Required for refunds above $25.00
                  </p>
                </div>
                <Switch checked />
              </div>
            </div>

            <div className="flex items-start gap-2 rounded-lg border p-3">
              <ShieldCheck className="text-muted-foreground mt-0.5 size-4" />
              <p className="text-muted-foreground text-sm">
                This profile page is currently UI scaffolding and does not persist user
                edits yet.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
