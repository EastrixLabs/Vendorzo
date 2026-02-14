"use client"

import * as React from "react"
import { ArrowRight, RotateCcw, ShoppingBag } from "lucide-react"

import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSidebar } from "@/components/ui/sidebar"

type PosFloatingDockCartLine = {
  id: string
  name: string
  qty: number
  price: number
}

type PosFloatingDockProps = {
  totalItems: number
  lineItems: number
  subtotal: number
  tax: number
  total: number
  cartLines: PosFloatingDockCartLine[]
  onClearCart?: () => void
  onCheckout?: () => void
  className?: string
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value)
}

function RedItemBadge({ count }: { count: number }) {
  if (count <= 0) return null

  return (
    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[11px] font-semibold text-white">
      {count}
    </span>
  )
}

export function PosFloatingDock({
  totalItems,
  lineItems,
  subtotal,
  tax,
  total,
  cartLines,
  onClearCart,
  onCheckout,
  className,
}: PosFloatingDockProps) {
  const { isMobile, open } = useSidebar()
  const [mobileCartOpen, setMobileCartOpen] = React.useState(false)
  const mobilePeekRef = React.useRef<HTMLButtonElement>(null)
  const desktopDockRef = React.useRef<HTMLDivElement>(null)
  const previousTotalItemsRef = React.useRef(totalItems)
  const isCartEmpty = totalItems === 0
  const hasScrollableOverflow = cartLines.length > 3
  const desktopLeftOffset = open
    ? "calc(var(--sidebar-width) + 1.5rem)"
    : "calc(var(--sidebar-width-icon) + 1.5rem)"

  React.useEffect(() => {
    const previousTotal = previousTotalItemsRef.current
    const wasItemAdded = totalItems > previousTotal

    if (!wasItemAdded) {
      previousTotalItemsRef.current = totalItems
      return
    }

    const animationTarget = isMobile ? mobilePeekRef.current : desktopDockRef.current

    animationTarget?.animate(
      [
        { transform: "translateY(0) scale(1)" },
        { transform: "translateY(-8px) scale(1.01)" },
        { transform: "translateY(0) scale(1)" },
      ],
      {
        duration: 320,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      }
    )

    previousTotalItemsRef.current = totalItems
  }, [isMobile, totalItems])

  if (isMobile) {
    return (
      <>
        <div
          className={cn(
            "pointer-events-none fixed inset-x-0 z-30 px-3",
            "bottom-[calc(env(safe-area-inset-bottom)+100px)]",
            className
          )}
        >
          <button
            ref={mobilePeekRef}
            type="button"
            onClick={() => setMobileCartOpen(true)}
            className={cn(
              "pointer-events-auto w-full rounded-xl border px-3 py-2.5 text-left",
              "border-border/70 bg-background/65",
              "supports-backdrop-filter:backdrop-blur-2xl backdrop-blur-2xl",
              "shadow-xl shadow-black/15",
              "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            )}
            aria-label="Open cart summary"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <Badge variant="secondary" className="h-6 px-2.5">
                  <ShoppingBag className="size-3.5" />
                  Cart
                </Badge>
                <RedItemBadge count={totalItems} />
                <p className="text-muted-foreground truncate text-sm">Tap to view summary</p>
              </div>
              <p className="text-sm font-semibold">{formatCurrency(total)}</p>
            </div>
          </button>
        </div>

        <Drawer open={mobileCartOpen} onOpenChange={setMobileCartOpen}>
          <DrawerContent
            className={cn(
              "border-t border-border/70 bg-background/92",
              "supports-backdrop-filter:backdrop-blur-2xl backdrop-blur-2xl",
              "data-[vaul-drawer-direction=bottom]:max-h-[72vh]"
            )}
          >
            <DrawerHeader className="items-start px-4 text-left">
              <div className="flex items-center gap-2">
                <DrawerTitle className="w-full text-left">Active Cart</DrawerTitle>
                <RedItemBadge count={totalItems} />
              </div>
              <DrawerDescription className="w-full text-left">
                Quick summary designed for one-thumb checkout.
              </DrawerDescription>
            </DrawerHeader>

            <div className="space-y-2.5 px-4 pb-3">
              <div className="grid grid-cols-2 gap-1.5">
                <div className="rounded-lg border border-border/70 bg-background/55 px-3 py-2">
                  <p className="text-muted-foreground text-sm">Items</p>
                  <p className="text-base font-semibold">{totalItems}</p>
                </div>
                <div className="rounded-lg border border-border/70 bg-background/55 px-3 py-2">
                  <p className="text-muted-foreground text-sm">Lines</p>
                  <p className="text-base font-semibold">{lineItems}</p>
                </div>
                <div className="rounded-lg border border-border/70 bg-background/55 px-3 py-2">
                  <p className="text-muted-foreground text-sm">Subtotal</p>
                  <p className="text-base font-semibold">{formatCurrency(subtotal)}</p>
                </div>
                <div className="rounded-lg border border-border/70 bg-background/55 px-3 py-2">
                  <p className="text-muted-foreground text-sm">Tax</p>
                  <p className="text-base font-semibold">{formatCurrency(tax)}</p>
                </div>
              </div>

              <div className="rounded-lg border p-2">
                {isCartEmpty ? (
                  <div className="flex min-h-20 items-center justify-center p-2">
                    <p className="text-muted-foreground text-sm">
                      Cart is empty. Tap any product card to add.
                    </p>
                  </div>
                ) : (
                  <Accordion defaultValue={["all-items"]} multiple>
                    <AccordionItem value="all-items" className="border-none">
                      <AccordionTrigger className="py-2 text-sm font-medium no-underline hover:no-underline">
                        View all {cartLines.length} cart items
                      </AccordionTrigger>
                      <AccordionContent className="pb-0">
                        {hasScrollableOverflow ? (
                          <ScrollArea className="h-52 rounded-md border">
                            <div className="space-y-2 p-2">
                              {cartLines.map((item) => (
                                <div
                                  key={`full-${item.id}`}
                                  className="bg-muted/35 flex items-center justify-between rounded-md border p-2"
                                >
                                  <div>
                                    <p className="text-sm font-medium">{item.name}</p>
                                    <p className="text-muted-foreground text-sm">Qty {item.qty}</p>
                                  </div>
                                  <p className="text-sm font-semibold">
                                    {formatCurrency(item.qty * item.price)}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                        ) : (
                          <div className="space-y-2 rounded-md border p-2">
                            {cartLines.map((item) => (
                              <div
                                key={`full-${item.id}`}
                                className="bg-muted/35 flex items-center justify-between rounded-md border p-2"
                              >
                                <div>
                                  <p className="text-sm font-medium">{item.name}</p>
                                  <p className="text-muted-foreground text-sm">Qty {item.qty}</p>
                                </div>
                                <p className="text-sm font-semibold">
                                  {formatCurrency(item.qty * item.price)}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border/70 bg-background/55 px-3 py-2.5">
                <p className="text-sm font-medium">Grand Total</p>
                <p className="text-base font-semibold">{formatCurrency(total)}</p>
              </div>
            </div>

            <DrawerFooter className="mt-0 grid grid-cols-2 gap-2 border-t border-border/60 bg-background/85 px-4 pt-2 pb-[calc(env(safe-area-inset-bottom)+12px)]">
              <Button variant="outline" onClick={onClearCart} disabled={isCartEmpty}>
                <RotateCcw className="size-4" />
                Clear
              </Button>
              <Button
                onClick={() => {
                  setMobileCartOpen(false)
                  onCheckout?.()
                }}
                disabled={isCartEmpty}
              >
                Checkout
                <ArrowRight className="size-4" />
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

  return (
    <div
      style={{
        left: desktopLeftOffset,
        right: "1.5rem",
      }}
      className={cn(
        "pointer-events-none fixed z-30 px-3 md:px-6",
        "bottom-[calc(env(safe-area-inset-bottom)+86px)] md:bottom-6",
        className
      )}
    >
      <div
        ref={desktopDockRef}
        className={cn(
          "pointer-events-auto mx-auto w-full max-w-5xl rounded-xl border",
          "border-border/70 bg-background/60",
          "supports-backdrop-filter:backdrop-blur-2xl backdrop-blur-2xl",
          "shadow-xl shadow-black/10"
        )}
      >
        <div className="p-3 sm:p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="h-6 px-2.5">
                <ShoppingBag className="size-3.5" />
                Active Cart
              </Badge>
              <RedItemBadge count={totalItems} />
              <p className="text-muted-foreground text-sm sm:text-md">
                Live totals for quick checkout decisions
              </p>
            </div>
            <p className="text-sm font-semibold">Grand Total {formatCurrency(total)}</p>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-4">
              <div className="rounded-lg border border-border/70 bg-background/55 px-3 py-2">
                <p className="text-muted-foreground text-sm">Items</p>
                <p className="text-base font-semibold">{totalItems}</p>
              </div>
              <div className="rounded-lg border border-border/70 bg-background/55 px-3 py-2">
                <p className="text-muted-foreground text-sm">Lines</p>
                <p className="text-base font-semibold">{lineItems}</p>
              </div>
              <div className="rounded-lg border border-border/70 bg-background/55 px-3 py-2">
                <p className="text-muted-foreground text-sm">Subtotal</p>
                <p className="text-base font-semibold">{formatCurrency(subtotal)}</p>
              </div>
              <div className="rounded-lg border border-border/70 bg-background/55 px-3 py-2">
                <p className="text-muted-foreground text-sm">Tax</p>
                <p className="text-base font-semibold">{formatCurrency(tax)}</p>
              </div>
            </div>

            <div className="grid w-full grid-cols-2 gap-2 lg:w-auto">
              <Button
                variant="outline"
                className="h-10"
                onClick={onClearCart}
                disabled={isCartEmpty}
              >
                <RotateCcw className="size-4" />
                Clear
              </Button>
              <Button className="h-10" onClick={onCheckout} disabled={isCartEmpty}>
                Checkout
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
