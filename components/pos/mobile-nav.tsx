"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  ChartBar,
  CreditCard,
  Ellipsis,
  LogOut,
  Settings,
  ShoppingCart,
  LayoutDashboard,
  Package,
  Receipt,
  UserCircle,
  X,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

type NavItem = {
  title: string
  href?: string
  icon: LucideIcon
  kind?: "route" | "more"
}

function isRouteActive(pathname: string, href?: string) {
  if (!href) return false
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function MobileNav() {
  const pathname = usePathname()
  const router = useRouter()

  const [moreOpen, setMoreOpen] = React.useState(false)

  // Primary actions: keep these fast for cashier thumbs.
  const primary: NavItem[] = [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "POS", href: "/pos", icon: ShoppingCart },
    { title: "Orders", href: "/orders", icon: Receipt },
    { title: "More", icon: Ellipsis, kind: "more" },
  ]

  // Everything else lives in the "More" drawer.
  const moreItems: NavItem[] = [
    { title: "Products", href: "/products", icon: Package },
    { title: "Analytics", href: "/analytics", icon: ChartBar },
  ]

  const accountItems: Array<{
    title: string
    icon: LucideIcon
    href?: string
    variant?: "default" | "destructive"
  }> = [
    { title: "Profile", icon: UserCircle },
    { title: "Billing", icon: CreditCard },
    { title: "Settings", icon: Settings, href: "/settings" },
    { title: "Logout", icon: LogOut, variant: "destructive" },
  ]

  const isMoreActive =
    moreItems.some((item) => isRouteActive(pathname, item.href)) ||
    accountItems.some((item) => isRouteActive(pathname, item.href))

  return (
    <>
      {/* Bottom glass dock (mobile only) */}
      <nav
        aria-label="Primary"
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 md:hidden",
          "pb-[calc(env(safe-area-inset-bottom)+12px)]"
        )}
      >
        <div className="mx-auto w-full max-w-md px-3">
          <div
            className={cn(
              "relative isolate pointer-events-auto",
              "supports-backdrop-filter:backdrop-blur-2xl backdrop-blur-2xl",
              "bg-background/60 dark:bg-background/30",
              "saturate-150",
              "shadow-sm",
              "rounded-2xl",
              "border border-border/50",
              // Liquid-glass edge treatment (no gradients)
              "ring-1 ring-white/12 dark:ring-white/10",
              "after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:ring-1 after:ring-black/5 dark:after:ring-white/6"
            )}
          >
            <ul className="relative grid grid-cols-4 gap-2 px-3 py-2">
              {primary.map((item) => {
                const active =
                  item.kind === "more"
                    ? isMoreActive
                    : isRouteActive(pathname, item.href)

                return (
                  <li key={item.title} className="flex justify-center">
                    <button
                      type="button"
                      aria-label={item.title}
                      aria-current={active ? "page" : undefined}
                      onClick={() => {
                        if (item.kind === "more") {
                          setMoreOpen(true)
                          return
                        }
                        if (item.href) {
                          router.push(item.href)
                        }
                      }}
                      className={cn(
                        "group relative flex w-full max-w-21.5 flex-col items-center justify-center",
                        "rounded-2xl p-2.5",
                        "transition duration-200",
                        "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring",
                        "active:scale-[0.98]"
                      )}
                    >
                      {/* Active pill */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-0 rounded-2xl",
                          "transition duration-200",
                          active
                            ? "bg-foreground/8 dark:bg-foreground/12"
                            : "bg-transparent group-hover:bg-foreground/6 dark:group-hover:bg-foreground/10"
                        )}
                      />

                      <item.icon
                        className={cn(
                          "relative z-10 size-5.5 transition duration-200",
                          active
                            ? "text-foreground"
                            : "text-muted-foreground group-hover:text-foreground"
                        )}
                      />
                      <span
                        className={cn(
                          "relative z-10 mt-1 text-[11px] font-medium",
                          active
                            ? "text-foreground"
                            : "text-muted-foreground group-hover:text-foreground"
                        )}
                      >
                        {item.title}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </nav>

      {/* More drawer */}
      <Drawer open={moreOpen} onOpenChange={setMoreOpen}>
        <DrawerContent
          className={cn(
            "supports-backdrop-filter:backdrop-blur-2xl backdrop-blur-2xl",
            "bg-background/70 dark:bg-background/55",
            "border-t border-border/60",
            "rounded-t-3xl",
            "shadow-xs!"
          )}
        >
          <DrawerHeader className="pb-2 px-4">
            <div className="text-left">
              <DrawerTitle>More</DrawerTitle>
              <DrawerDescription>Extra pages and account actions.</DrawerDescription>
            </div>

            <div className="absolute right-4 top-4">
              <DrawerClose asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Close more menu"
                >
                  <X className="size-4" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>

          <div className="grid gap-2 px-4 pb-2">
            {moreItems.map((item) => (
              <Button
                key={item.title}
                variant={isRouteActive(pathname, item.href) ? "secondary" : "outline"}
                className="h-12 justify-start gap-2 rounded-2xl"
                onClick={() => {
                  setMoreOpen(false)
                  if (item.href) router.push(item.href)
                }}
              >
                <item.icon className="size-4" />
                {item.title}
              </Button>
            ))}

            <div className="pt-2 text-xs font-medium text-muted-foreground">
              Account
            </div>

            {accountItems.map((item) => (
              <Button
                key={item.title}
                variant={item.variant === "destructive" ? "destructive" : "outline"}
                className={cn(
                  "h-12 justify-start gap-2 rounded-2xl",
                  item.variant === "destructive" && "shadow-none"
                )}
                onClick={() => {
                  setMoreOpen(false)
                  if (item.href) {
                    router.push(item.href)
                    return
                  }
                }}
              >
                <item.icon className="size-4" />
                {item.title}
              </Button>
            ))}
          </div>

        </DrawerContent>
      </Drawer>
    </>
  )
}
