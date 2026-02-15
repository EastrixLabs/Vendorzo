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
export function AppHeader() {
  return (
    <header className="bg-background/95 supports-backdrop-filter:backdrop-blur-xs sticky top-0 z-20 border-b">
      <div className="flex h-14 items-center gap-3 px-4 md:px-6">
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
    </header>
  )
}
