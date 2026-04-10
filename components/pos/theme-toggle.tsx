"use client"

import * as React from "react"
import { Laptop, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-10 w-[108px]" />
  }

  return (
    <Tabs
      value={theme || "system"}
      onValueChange={setTheme}
      className="w-fit"
    >
      <TabsList className="h-10 rounded-xl p-1" aria-label="Theme mode">
        <TabsTrigger value="system" className="size-8 rounded-lg px-0" aria-label="System theme">
          <Laptop className="size-4" />
          <span className="sr-only">System</span>
        </TabsTrigger>
        <TabsTrigger value="light" className="size-8 rounded-lg px-0" aria-label="Light theme">
          <Sun className="size-4" />
          <span className="sr-only">Light</span>
        </TabsTrigger>
        <TabsTrigger value="dark" className="size-8 rounded-lg px-0" aria-label="Dark theme">
          <Moon className="size-4" />
          <span className="sr-only">Dark</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
