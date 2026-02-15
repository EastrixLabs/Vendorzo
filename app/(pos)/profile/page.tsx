"use client"

import * as React from "react"
import { Clock3, Mail, ShieldCheck, Smartphone, Store, UserCircle2 } from "lucide-react"

import { fetchProfile } from "@/lib/supabase/queries"
import type { DbProfile } from "@/lib/supabase/types"
import { PageHeading } from "@/components/pos/page-heading"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"

export default function ProfilePage() {
  const [profile, setProfile] = React.useState<DbProfile | null>(null)
  const [email, setEmail] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    fetchProfile()
      .then((result) => {
        if (result) {
          setProfile(result.profile)
          setEmail(result.email)
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [])

  const initials = profile?.full_name
    ? profile.full_name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "??"
  const displayName = profile?.full_name || "User"
  const displayRole = profile?.role
    ? profile.role.charAt(0).toUpperCase() + profile.role.slice(1)
    : "Staff"
  return (
    <div>
      <PageHeading
        title="User Profile"
        description="Staff account details, shift context, and access controls for POS usage."
        icon={UserCircle2}
      />

      {isLoading ? (
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <Card>
            <CardHeader><Skeleton className="h-5 w-40" /><Skeleton className="mt-1 h-4 w-64" /></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <Skeleton className="size-12 rounded-full" />
                <div className="space-y-2"><Skeleton className="h-4 w-32" /><Skeleton className="h-3 w-48" /></div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 rounded-lg" />
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><Skeleton className="h-5 w-32" /><Skeleton className="mt-1 h-4 w-48" /></CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-24 rounded-lg" />
              <Skeleton className="h-40 rounded-lg" />
            </CardContent>
          </Card>
        </div>
      ) : (
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Profile Overview</CardTitle>
            <CardDescription>Identity and role details used across this store.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 rounded-lg border p-3">
              <Avatar size="lg">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-base font-semibold">{displayName}</p>
                <p className="text-muted-foreground text-sm">{displayRole} · Vendorzo Downtown</p>
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
                  {email || "—"}
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
                Permissions and security settings are display-only and managed by your
                store administrator.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      )}
    </div>
  )
}
