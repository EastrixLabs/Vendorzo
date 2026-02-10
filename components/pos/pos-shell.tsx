"use client"

import { ReactNode } from "react"

import { AppHeader } from "@/components/pos/app-header"
import { AppSidebar } from "@/components/pos/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

type PosShellProps = {
  children: ReactNode
}

export function PosShell({ children }: PosShellProps) {
  return (
    <SidebarProvider defaultOpen>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <div className="flex-1 p-4 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
