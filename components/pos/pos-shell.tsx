"use client"

import { ReactNode, useEffect, useState } from "react"

import { AppHeader } from "@/components/pos/app-header"
import { AppSidebar } from "@/components/pos/app-sidebar"
import { MobileNav } from "@/components/pos/mobile-nav"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

type PosShellProps = {
  children: ReactNode
}

export function PosShell({ children }: PosShellProps) {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1100px)")
    const applyState = () => setOpen(!mediaQuery.matches)

    applyState()
    mediaQuery.addEventListener("change", applyState)

    return () => mediaQuery.removeEventListener("change", applyState)
  }, [])

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <div className="flex-1 p-4 pb-28 md:p-6 md:pb-6">{children}</div>
        <MobileNav />
      </SidebarInset>
    </SidebarProvider>
  )
}
