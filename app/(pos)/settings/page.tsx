"use client"

import { Bell, CreditCard, Paintbrush, Settings, ShieldCheck } from "lucide-react"

import { PageHeading } from "@/components/pos/page-heading"
import { ThemeToggle } from "@/components/pos/theme-toggle"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
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
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded-md border p-3">
              <div>
                <p className="text-sm font-medium">Theme mode</p>
                <p className="text-muted-foreground text-xs">Light, dark, or follow your system preference</p>
              </div>
              <ThemeToggle />
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
              <Label>Default payment method</Label>
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
            These settings are visual placeholders only. No persistence or API logic has
            been connected yet.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
