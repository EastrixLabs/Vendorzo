"use client"

import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { Clock3, Store } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { sidebarItems } from "@/components/pos/mock-data"

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip="Vendorzo POS"
              onClick={() => router.push("/dashboard")}
            >
              <div className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-md">
                <Store className="size-4" />
              </div>
              <span className="font-semibold">Vendorzo POS</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => {
                const isActive =
                  pathname === item.href || pathname.startsWith(`${item.href}/`)

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.title}
                      onClick={() => router.push(item.href)}
                    >
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="bg-muted/50 rounded-md border p-2 text-xs group-data-[collapsible=icon]:hidden">
          <div className="mb-1 flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-medium">
              <Clock3 className="size-3.5" />
              Current Shift
            </div>
            <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
              Active
            </Badge>
          </div>
          <p className="text-muted-foreground">08:00 - 16:00</p>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
