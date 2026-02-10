"use client"

import {
  Bell,
  CreditCard,
  LogOut,
  Search,
  Settings,
  User,
  UserCircle,
} from "lucide-react"

import { ThemeToggle } from "@/components/pos/theme-toggle"
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function AppHeader() {
  return (
    <header className="bg-background/95 supports-backdrop-filter:backdrop-blur-xs sticky top-0 z-20 border-b">
      <div className="flex h-14 items-center gap-3 px-4 md:px-6">
        <SidebarTrigger className="shrink-0" />

        <InputGroup className="max-w-xl">
          <InputGroupAddon>
            <InputGroupText>
              <Search className="size-4" />
            </InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="Search products, orders, or customers" />
        </InputGroup>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="icon-sm" aria-label="Notifications">
            <Bell className="size-4" />
          </Button>

          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="ghost" className="h-9 px-2" />}
            >
              <Avatar size="sm">
                <AvatarFallback>KC</AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium sm:inline">Kurt</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52 !shadow-xs">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <UserCircle className="size-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="size-4" />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="size-4" />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="size-4" />
                Switch Account
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                <LogOut className="size-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
