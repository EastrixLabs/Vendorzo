"use client"

import * as React from "react"
import { Building2, Smartphone, Store, UserCircle2 } from "lucide-react"

import { storeIdentity } from "@/lib/business-config"
import { fetchProfile } from "@/lib/supabase/queries"
import type { DbProfile } from "@/lib/supabase/types"
import { PageHeading } from "@/components/pos/page-heading"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

function inferDeviceName() {
  if (typeof window === "undefined") {
    return "Current device"
  }

  const userAgent = navigator.userAgent
  const platform = navigator.platform
  const userAgentData = (navigator as Navigator & {
    userAgentData?: {
      mobile?: boolean
      platform?: string
      getHighEntropyValues?: (hints: string[]) => Promise<{ model?: string; platform?: string }>
    }
  }).userAgentData

  if (/iPhone/i.test(userAgent)) return "Apple iPhone"
  if (/iPad/i.test(userAgent) || (platform === "MacIntel" && navigator.maxTouchPoints > 1)) return "Apple iPad"
  if (/Android/i.test(userAgent)) {
    return /Mobile/i.test(userAgent) ? "Android phone" : "Android tablet"
  }
  if (/CrOS/i.test(userAgent)) return "Chromebook"
  if (/Windows/i.test(platform)) return "Windows PC"
  if (/Mac/i.test(platform)) return "Mac"
  if (/Linux/i.test(platform)) return "Linux device"

  if (userAgentData?.mobile) {
    return "Mobile device"
  }

  return userAgentData?.platform ? `${userAgentData.platform} device` : "Current device"
}

export default function ProfilePage() {
  const [profile, setProfile] = React.useState<DbProfile | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [deviceName, setDeviceName] = React.useState("Current device")

  React.useEffect(() => {
    fetchProfile()
      .then((result) => {
        if (result) {
          setProfile(result.profile)
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [])

  React.useEffect(() => {
    setDeviceName(inferDeviceName())

    const userAgentData = (navigator as Navigator & {
      userAgentData?: {
        getHighEntropyValues?: (hints: string[]) => Promise<{ model?: string; platform?: string }>
      }
    }).userAgentData

    if (!userAgentData?.getHighEntropyValues) {
      return
    }

    userAgentData
      .getHighEntropyValues(["model", "platform"])
      .then(({ model, platform }) => {
        if (model) {
          setDeviceName(model)
          return
        }

        if (platform) {
          setDeviceName(`${platform} device`)
        }
      })
      .catch(() => {
        setDeviceName(inferDeviceName())
      })
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
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader><Skeleton className="h-5 w-40" /><Skeleton className="mt-1 h-4 w-64" /></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 rounded-lg border p-3">
                  <Skeleton className="size-12 rounded-full" />
                  <div className="space-y-2"><Skeleton className="h-4 w-32" /><Skeleton className="h-3 w-48" /></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><Skeleton className="h-5 w-32" /><Skeleton className="mt-1 h-4 w-48" /></CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-32 rounded-lg" />
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader><Skeleton className="h-5 w-32" /><Skeleton className="mt-1 h-4 w-48" /></CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-24 rounded-lg" />
                <Skeleton className="h-20 rounded-lg" />
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCircle2 className="size-4" />
                  Profile Overview
                </CardTitle>
                <CardDescription>Identity and role details used across this store.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 rounded-lg border p-3">
                  <Avatar size="lg">
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-base font-semibold">{displayName}</p>
                    <p className="text-muted-foreground text-sm">{displayRole} · {storeIdentity.name}</p>
                    <p className="text-muted-foreground text-xs">Staff ID: VNZ-014</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="size-4" />
                  Device & Session
                </CardTitle>
                <CardDescription>Hardware context and active workstation behavior.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-lg border p-3">
                  <p className="text-muted-foreground mb-1 text-xs">Hardware Device</p>
                  <p className="flex items-center gap-2 text-sm font-medium">
                    <Smartphone className="text-muted-foreground size-4" />
                    {deviceName}
                  </p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-muted-foreground mb-1 text-xs">Session Lock Timeout</p>
                  <p className="text-sm font-medium">5 minutes</p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Auto-lock keeps shared checkout devices secure between transactions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Store className="size-4" />
                  Store Assignment
                </CardTitle>
                <CardDescription>Branch and contact details tied to this operator account.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border p-3 sm:col-span-2">
                  <p className="text-muted-foreground mb-1 text-xs">Store Name</p>
                  <p className="text-sm font-medium">{storeIdentity.name}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-muted-foreground mb-1 text-xs">Store Contact</p>
                  <p className="text-sm font-medium">{storeIdentity.contact}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-muted-foreground mb-1 text-xs">Store Email</p>
                  <p className="text-sm font-medium">{storeIdentity.email}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
