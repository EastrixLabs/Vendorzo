"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <Tabs
      value={resolvedTheme === "dark" ? "dark" : "light"}
      onValueChange={(value) => setTheme(value as "light" | "dark")}
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
      </TabsList>
    </Tabs>
  )
}
