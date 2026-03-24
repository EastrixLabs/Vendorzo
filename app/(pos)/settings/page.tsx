"use client"

import { Paintbrush, Settings, ShieldCheck } from "lucide-react"

import { PageHeading } from "@/components/pos/page-heading"
import { ThemeToggle } from "@/components/pos/theme-toggle"
import { useAppearancePreferences } from "@/components/theme-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const colorThemes = [
  {
    value: "neutral",
    label: "Neutral",
    swatchClassName: "bg-[oklch(0.21_0.006_285.885)]",
  },
  {
    value: "ocean",
    label: "Ocean",
    swatchClassName: "bg-[oklch(0.56_0.17_248.53)]",
  },
  {
    value: "amber",
    label: "Amber",
    swatchClassName: "bg-[oklch(0.68_0.18_66.2)]",
  },
  {
    value: "rose",
    label: "Rose",
    swatchClassName: "bg-[oklch(0.62_0.21_8.9)]",
  },
  {
    value: "emerald",
    label: "Emerald",
    swatchClassName: "bg-[oklch(0.6_0.15_164.8)]",
  },
] as const

export default function SettingsPage() {
  const {
    motionPreference,
    setMotionPreference,
    contrastPreference,
    setContrastPreference,
    colorTheme,
    setColorTheme,
  } = useAppearancePreferences()

  return (
    <div>
      <PageHeading
        title="Settings"
        description="Customize how the Vendorzo workspace looks across this device."
        icon={Settings}
      />

      <div className="grid gap-4">
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
                <p className="text-muted-foreground text-xs">Switch between light and dark workspace themes.</p>
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
              <p className="text-sm font-medium">Color theme</p>
              <Tabs
                value={colorTheme}
                onValueChange={(value) => setColorTheme(value as (typeof colorThemes)[number]["value"])}
                className="w-full"
              >
                <div className="w-full overflow-x-auto">
                  <TabsList className="h-11 min-w-max w-full p-1" aria-label="Color theme">
                    {colorThemes.map((theme) => (
                      <TabsTrigger
                        key={theme.value}
                        value={theme.value}
                        className="rounded-lg px-3 data-[selected]:shadow-sm aria-selected:shadow-sm"
                      >
                        <span className={`size-2.5 shrink-0 rounded-full ${theme.swatchClassName}`} />
                        <span>{theme.label}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
              </Tabs>
              <p className="text-muted-foreground text-xs">
                Applies accent color to shared controls, hover states, active navigation, focus rings, and charts.
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
      </div>

      <Card className="mt-4" size="sm">
        <CardContent className="flex items-start gap-3">
          <ShieldCheck className="text-muted-foreground mt-0.5 size-4" />
          <p className="text-muted-foreground text-sm">
            Appearance preferences persist on this device and apply across the POS workspace.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
