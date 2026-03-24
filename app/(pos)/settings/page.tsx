"use client"

import { Bell, CreditCard, Paintbrush, Settings, ShieldCheck } from "lucide-react"

import { PageHeading } from "@/components/pos/page-heading"
import { ThemeToggle } from "@/components/pos/theme-toggle"
import { useAppearancePreferences } from "@/components/theme-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  const {
    motionPreference,
    setMotionPreference,
    contrastPreference,
    setContrastPreference,
  } = useAppearancePreferences()

  return (
    <div>
      <PageHeading
        title="Settings"
        description="Frontend-only configuration placeholders for the POS environment."
        icon={Settings}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Paintbrush className="size-4" />
              Appearance
            </CardTitle>
            <CardDescription>Choose how Vendorzo should look.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-md border p-3">
              <div>
                <p className="text-sm font-medium">Theme mode</p>
                <p className="text-muted-foreground text-xs">Light, dark, or follow your system preference</p>
              </div>
              <ThemeToggle />
            </div>

            <Separator />

            <div className="space-y-1">
              <p className="text-sm font-medium">Motion & contrast</p>
              <p className="text-muted-foreground text-xs">
                Control interface motion and overall contrast across the app.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-md border p-3">
                <div className="space-y-1 pr-4">
                  <Label htmlFor="motion-preference">Reduce motion</Label>
                  <p className="text-muted-foreground text-xs">
                    Minimize transitions and animation across the app.
                  </p>
                </div>
                <Switch
                  id="motion-preference"
                  checked={motionPreference === "reduced"}
                  onCheckedChange={(checked) => setMotionPreference(checked ? "reduced" : "full")}
                  aria-label="Reduce motion"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-md border p-3">
                <div className="space-y-1 pr-4">
                  <Label htmlFor="contrast-preference">Increase contrast</Label>
                  <p className="text-muted-foreground text-xs">
                    Strengthen text, borders, and interactive states.
                  </p>
                </div>
                <Switch
                  id="contrast-preference"
                  checked={contrastPreference === "more"}
                  onCheckedChange={(checked) => setContrastPreference(checked ? "more" : "standard")}
                  aria-label="Increase contrast"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="size-4" />
              Checkout Preferences
            </CardTitle>
            <CardDescription>Mock controls for transaction behavior.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Default payment method</p>
              <Select defaultValue="card">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="shadow-xs!">
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="wallet">Wallet</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between rounded-md border p-3">
              <div>
                <p className="text-sm font-medium">Auto-print receipts</p>
                <p className="text-muted-foreground text-xs">Enabled for every checkout</p>
              </div>
              <Switch checked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="size-4" />
              Alerts
            </CardTitle>
            <CardDescription>Operational notifications and reminders.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded-md border p-3">
              <p className="text-sm font-medium">Low stock alerts</p>
              <Switch checked />
            </div>
            <div className="flex items-center justify-between rounded-md border p-3">
              <p className="text-sm font-medium">Order status popups</p>
              <Switch checked />
            </div>
            <div className="flex items-center justify-between rounded-md border p-3">
              <p className="text-sm font-medium">Daily summary email</p>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4" size="sm">
        <CardContent className="flex items-start gap-3">
          <ShieldCheck className="text-muted-foreground mt-0.5 size-4" />
          <p className="text-muted-foreground text-sm">
            Appearance preferences now persist on this device. Other controls remain frontend-only placeholders.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
