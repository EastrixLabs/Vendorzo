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
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { sidebarItems } from "@/components/pos/mock-data"

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader>
        <div className="group-data-[collapsible=icon]:items-center flex flex-col gap-2">
          <div className="group-data-[collapsible=icon]:justify-center flex items-center gap-2">
            <SidebarMenu className="flex-1">
              <SidebarMenuItem>
                <SidebarMenuButton
                  size="lg"
                  tooltip="Vendorzo POS"
                  onClick={() => router.push("/dashboard")}
                  className="group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:justify-center"
                >
                  <div className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-md">
                    <Store className="size-4" />
                  </div>
                  <span className="group-data-[collapsible=icon]:hidden font-semibold">
                    Vendorzo POS
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarTrigger className="group-data-[collapsible=icon]:hidden shrink-0" />
          </div>

          <SidebarTrigger className="hidden group-data-[collapsible=icon]:inline-flex" />
        </div>
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
