"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { Building2, Settings, UserCircle, Users } from "lucide-react"
import { Brand } from "@/components/brand"
import { fetchProfile } from "@/lib/supabase/queries"
import type { DbProfile } from "@/lib/supabase/types"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import { Separator } from "@/components/ui/separator"
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
  const [profile, setProfile] = React.useState<DbProfile | null>(null)

  React.useEffect(() => {
    fetchProfile().then((result) => {
      if (result) {
        setProfile(result.profile)
      }
    })
  }, [])

  const initials = profile?.full_name
    ? profile.full_name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "??"
  const displayName = profile?.full_name || "User"
  const displayRole = profile?.role
    ? profile.role.charAt(0).toUpperCase() + profile.role.slice(1)
    : "Staff"
  const isAccountSettingsActive =
    pathname === "/settings" ||
    pathname.startsWith("/settings/") ||
    pathname === "/profile" ||
    pathname.startsWith("/profile/") ||
    pathname === "/manage" ||
    pathname.startsWith("/manage/") ||
    pathname === "/about" ||
    pathname.startsWith("/about/")

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="h-14 p-0 relative overflow-hidden">
        <SidebarMenu className="h-full">
          <SidebarMenuItem className="h-full">
            <SidebarMenuButton
              size="lg"
              tooltip="Vendorzo POS"
              onClick={() => router.push("/pos")}
              className="h-full w-full rounded-none px-4 group-data-[collapsible=icon]:!size-full group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:gap-0"
            >
              <div className="flex shrink-0 items-center justify-center">
                <Brand size={32} />
              </div>
              <div className="group-data-[collapsible=icon]:hidden flex min-w-0 flex-col text-left leading-none ml-3">
                <span className="text-sm font-semibold tracking-tight">Vendorzo</span>
                <span className="text-muted-foreground mt-0.5 text-[10px] uppercase tracking-wider font-medium">
                  by Eastrix Labs
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <Separator className="absolute bottom-0 left-0 bg-border/50" />
      </SidebarHeader>

      <SidebarContent className="group-data-[collapsible=icon]:items-center">
        <SidebarGroup className="pt-4">
          <SidebarGroupContent>
            <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
              Main Menu
            </SidebarGroupLabel>

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
                      variant={isAccountSettingsActive ? "secondary" : "ghost"}
                      className="h-11 w-full justify-start px-2 shadow-none aria-expanded:shadow-none"
                      aria-label="Open account menu"
                    />
                  }
                >
                  <Avatar size="sm">
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex min-w-0 flex-col text-left">
                    <span className="truncate text-sm font-medium">{displayName}</span>
                    <span className="text-muted-foreground truncate text-xs">{displayRole}</span>
                  </div>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="top">Account &amp; settings</TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="end" className="w-52 !shadow-xs">
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  <UserCircle className="size-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/settings")}>
                  <Settings className="size-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Company</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => router.push("/manage")}>
                  <Users className="size-4" />
                  Manage Workspace
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Eastrix Labs</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => router.push("/about")}>
                  <Building2 className="size-4" />
                  About
                </DropdownMenuItem>
              </DropdownMenuGroup>
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
                      variant={isAccountSettingsActive ? "secondary" : "ghost"}
                      className="size-12 rounded-xl p-0 shadow-none aria-expanded:shadow-none"
                      aria-label="Open account menu"
                    />
                  }
                >
                  <Avatar>
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="right">Account &amp; settings</TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="end" side="top" className="w-52 !shadow-xs">
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  <UserCircle className="size-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/settings")}>
                  <Settings className="size-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Company</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => router.push("/manage")}>
                  <Users className="size-4" />
                  Manage Workspace
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Eastrix Labs</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => router.push("/about")}>
                  <Building2 className="size-4" />
                  About
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
