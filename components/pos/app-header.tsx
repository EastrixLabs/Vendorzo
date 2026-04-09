"use client"

import {
  Bell,
  Search,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

export function AppHeader() {
  return (
    <header className="bg-background/95 supports-backdrop-filter:backdrop-blur-xs sticky top-0 z-20 h-14 w-full">
      <div className="flex h-full items-center gap-4 px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <div className="h-6 w-px bg-border/60" />
        </div>

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
        </div>
      </div>
      <Separator className="absolute bottom-0 left-0 bg-border/50" />
    </header>
  )
}
