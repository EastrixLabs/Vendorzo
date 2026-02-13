"use client"

import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { Clock3, CreditCard, LogOut, Settings, UserCircle } from "lucide-react"
import { Brand } from "@/components/brand"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { sidebarItems } from "@/components/pos/mock-data"

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="pt-3 pb-1 group-data-[collapsible=icon]:pt-3 group-data-[collapsible=icon]:pb-1">
        <div className="group-data-[collapsible=icon]:items-center flex flex-col gap-1">
          <div className="group-data-[collapsible=icon]:justify-center flex items-center gap-2">
            <SidebarMenu className="flex-1">
              <SidebarMenuItem>
                <SidebarMenuButton
                  size="lg"
                  tooltip="Vendorzo POS"
                  onClick={() => router.push("/dashboard")}
                  className="h-12 gap-2 group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:!size-12 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:!px-0"
                >
                  <Brand className="size-7" alt="Vendorzo" />
                  <span className="group-data-[collapsible=icon]:hidden font-extrabold">
                    Vendorzo
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarTrigger className="group-data-[collapsible=icon]:hidden shrink-0 size-12 [&_svg]:size-7" />
          </div>

          <SidebarTrigger className="hidden group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:inline-flex size-12 [&_svg]:size-7" />
        </div>
      </SidebarHeader>

      <SidebarContent className="group-data-[collapsible=icon]:items-center">
        <SidebarGroup className="pt-0">
          <SidebarGroupContent>
            <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
              Main Menu
            </SidebarGroupLabel>
            <SidebarSeparator className="my-1 group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:w-8" />

            <SidebarMenu className="group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:gap-2">
              {sidebarItems.map((item) => {
                const isActive =
                  pathname === item.href || pathname.startsWith(`${item.href}/`)

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.title}
                      onClick={() => router.push(item.href)}
                      className="h-12 group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:!size-12 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:!px-0"
                    >
                      <item.icon className="size-7" />
                      <span className="group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="space-y-2 group-data-[collapsible=icon]:hidden">
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger render={<span className="block w-full" />}>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      className="h-11 w-full justify-start px-2"
                      aria-label="Open account menu"
                    />
                  }
                >
                  <Avatar size="sm">
                    <AvatarFallback>KC</AvatarFallback>
                  </Avatar>
                  <div className="flex min-w-0 flex-col text-left">
                    <span className="truncate text-sm font-medium">Kurt</span>
                    <span className="text-muted-foreground truncate text-xs">Store Admin</span>
                  </div>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="top">Account &amp; settings</TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="end" className="w-52 !shadow-xs">
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserCircle className="size-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="size-4" />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/settings")}>
                  <Settings className="size-4" />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <LogOut className="size-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="hidden group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger render={<span className="inline-flex" />}>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      className="size-12 rounded-xl p-0"
                      aria-label="Open account menu"
                    />
                  }
                >
                  <Avatar>
                    <AvatarFallback>KC</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="right">Account &amp; settings</TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="end" className="w-52 !shadow-xs">
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserCircle className="size-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="size-4" />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/settings")}>
                  <Settings className="size-4" />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <LogOut className="size-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
