"use client";

import {
  Home,
  LayoutGrid,
  Package,
  Receipt,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: LayoutGrid, label: "POS", href: "/pos" },
  { icon: Package, label: "Products", href: "/products" },
  { icon: Receipt, label: "Orders", href: "/orders" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const pathname = usePathname();
  const isCollapsed = state === "collapsed";

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <Sidebar collapsible="icon">
      {/* Header with Logo */}
      <SidebarHeader className="px-4 py-6 group-data-[collapsible=icon]:px-3 group-data-[collapsible=icon]:py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-black text-xl shadow-lg shadow-primary/20">
            V
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none tracking-tight">Vendorzo</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Pro POS</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="px-2 group-data-[collapsible=icon]:px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={active}
                      tooltip={isCollapsed ? item.label : undefined}
                      className={cn(
                        "transition-all duration-200",
                        active
                          ? "bg-primary text-primary-foreground shadow-md shadow-primary/10 hover:bg-primary hover:text-primary-foreground"
                          : "hover:bg-sidebar-accent/50"
                      )}
                    >
                      <item.icon className={cn("size-5", active ? "stroke-[2.5px]" : "stroke-[1.5px]")} />
                      <span className="font-medium">{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with User */}
      <SidebarFooter className="p-4 group-data-[collapsible=icon]:p-3">
        <SidebarSeparator className="mb-4" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="John Doe - Cashier" className="h-auto py-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500 text-white text-xs font-bold shadow-sm">
                JD
              </div>
              {!isCollapsed && (
                <div className="flex flex-col items-start ml-1">
                  <span className="text-sm font-bold leading-none">John Doe</span>
                  <span className="text-xs text-muted-foreground mt-1">Cashier</span>
                </div>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Sign Out" className="text-destructive hover:bg-destructive/10 hover:text-destructive mt-1 transition-colors">
              <LogOut className="size-5" />
              <span className="font-medium">Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      {/* Rail for toggling */}
      <SidebarRail />
    </Sidebar>
  );
}
