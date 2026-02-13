"use client"

import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Tabs
      value={theme ?? "system"}
      onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}
      className="w-fit"
    >
      <TabsList className="h-10 p-1" aria-label="Theme mode">
        <TabsTrigger value="light" className="size-8 px-0" aria-label="Light theme">
          <Sun className="size-4" />
          <span className="sr-only">Light</span>
        </TabsTrigger>
        <TabsTrigger value="dark" className="size-8 px-0" aria-label="Dark theme">
          <Moon className="size-4" />
          <span className="sr-only">Dark</span>
        </TabsTrigger>
        <TabsTrigger value="system" className="size-8 px-0" aria-label="System theme">
          <Monitor className="size-4" />
          <span className="sr-only">System</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
