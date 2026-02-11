"use client"

import * as React from "react"
import {
  ArrowRight,
  CirclePause,
  FileText,
  Grid2x2,
  List,
  PackageSearch,
  PackageX,
  Plus,
  ReceiptText,
  ShoppingCart,
  Trash2,
} from "lucide-react"

import { PageHeading } from "@/components/pos/page-heading"
import { cartItems, categories, products, type Product } from "@/components/pos/mock-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const taxRate = 0.085

export default function PosPage() {
  const [activeCategory, setActiveCategory] =
    React.useState<(typeof categories)[number]>("All")
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")
  const [showLoading, setShowLoading] = React.useState(false)
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null)
  const [receiptOpen, setReceiptOpen] = React.useState(false)

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory)

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
  const tax = subtotal * taxRate
  const total = subtotal + tax

  return (
    <div>
      <PageHeading
        title="POS"
        description="Process orders quickly with a responsive product browser and cart."
        icon={ShoppingCart}
        actions={
          <div className="flex items-center gap-2">
            <Switch checked={showLoading} onCheckedChange={setShowLoading} />
            <Label className="text-sm">Loading state</Label>
          </div>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Button>
          <Plus className="size-4" />
          New Sale
        </Button>
        <Button variant="outline">
          <CirclePause className="size-4" />
          Hold Order
        </Button>
        <Button variant="outline">
          <Trash2 className="size-4" />
          Clear Cart
        </Button>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card>
          <CardHeader className="gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <CardTitle>Product Catalog</CardTitle>
                <CardDescription>Tap a product to open the detail drawer.</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant={viewMode === "grid" ? "secondary" : "outline"}
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                >
                  <Grid2x2 className="size-4" />
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === "list" ? "secondary" : "outline"}
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                >
                  <List className="size-4" />
                </Button>
              </div>
            </div>

            <Tabs
              value={activeCategory}
              onValueChange={(value) =>
                setActiveCategory(value as (typeof categories)[number])
              }
            >
              <ScrollArea className="w-full whitespace-nowrap">
                <TabsList variant="line" className="h-9 w-max min-w-full justify-start pr-6">
                  {categories.map((category) => (
                    <TabsTrigger key={category} value={category}>
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </ScrollArea>
            </Tabs>
          </CardHeader>

          <CardContent>
            {showLoading ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
                {Array.from({ length: 10 }).map((_, index) => (
                  <Card key={`product-skeleton-${index}`} size="sm">
                    <CardContent className="space-y-3">
                      <Skeleton className="h-10 w-10 rounded-md" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                      <Skeleton className="h-8 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center gap-2 py-10 text-center">
                  <PackageX className="text-muted-foreground size-9" />
                  <h3 className="text-base font-medium">No products in {activeCategory}</h3>
                  <p className="text-muted-foreground max-w-sm text-sm">
                    This category has no assigned items in mock data yet. Add products
                    later when backend wiring starts.
                  </p>
                </CardContent>
              </Card>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
                {filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    size="sm"
                    className="cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <CardContent className="space-y-3">
                      <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-md">
                        <product.icon className="size-5" />
                      </div>
                      <div>
                        <h3 className="line-clamp-1 text-sm font-medium">{product.name}</h3>
                        <p className="text-muted-foreground text-xs">{product.prepTime}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{product.category}</Badge>
                        <span className="text-sm font-semibold">${product.price.toFixed(2)}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm" className="w-full">
                        <Plus className="size-4" />
                        Add
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    size="sm"
                    className="cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <CardContent className="flex flex-wrap items-center gap-3">
                      <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-md">
                        <product.icon className="size-5" />
                      </div>
                      <div className="min-w-40 flex-1">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-muted-foreground text-xs">SKU {product.sku}</p>
                      </div>
                      <Badge variant="secondary">{product.category}</Badge>
                      <p className="w-20 text-sm font-semibold">${product.price.toFixed(2)}</p>
                      <Button size="sm">
                        <Plus className="size-4" />
                        Add
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="size-4" />
              Cart Panel
            </CardTitle>
            <CardDescription>{cartItems.length} mock line items</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ScrollArea className="h-64 rounded-md border">
              <div className="space-y-2 p-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-muted/40 flex items-center justify-between rounded-md border p-2"
                  >
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-muted-foreground text-xs">Qty {item.qty}</p>
                    </div>
                    <p className="text-sm font-semibold">
                      ${(item.qty * item.price).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button className="w-full" onClick={() => setReceiptOpen(true)}>
              <ReceiptText className="size-4" />
              Receipt Preview
            </Button>
            <Button variant="outline" className="w-full">
              Checkout
              <ArrowRight className="size-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Sheet
        open={Boolean(selectedProduct)}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setSelectedProduct(null)
          }
        }}
      >
        <SheetContent side="right" className="!shadow-xs">
          {selectedProduct ? (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <selectedProduct.icon className="size-4" />
                  {selectedProduct.name}
                </SheetTitle>
                <SheetDescription>{selectedProduct.description}</SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 px-4">
                <Card size="sm">
                  <CardContent className="grid gap-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Price</span>
                      <span className="font-medium">${selectedProduct.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Stock</span>
                      <span className="font-medium">{selectedProduct.stock}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Prep Time</span>
                      <span className="font-medium">{selectedProduct.prepTime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Rating</span>
                      <span className="font-medium">{selectedProduct.rating}/5</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <SheetFooter>
                <Button variant="outline" className="w-full">
                  <PackageSearch className="size-4" />
                  View Inventory
                </Button>
                <Button className="w-full">
                  <Plus className="size-4" />
                  Add to Cart
                </Button>
              </SheetFooter>
            </>
          ) : null}
        </SheetContent>
      </Sheet>

      <Dialog open={receiptOpen} onOpenChange={setReceiptOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="size-4" />
              Receipt Preview
            </DialogTitle>
            <DialogDescription>Mock print layout for POS checkout.</DialogDescription>
          </DialogHeader>

          <div className="space-y-3 rounded-md border p-4 text-sm">
            <div className="text-center">
              <p className="font-semibold">Vendorzo Coffee Bar</p>
              <p className="text-muted-foreground text-xs">Order #POS-4582</p>
            </div>

            <div className="space-y-1">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between gap-2">
                  <span>
                    {item.qty} x {item.name}
                  </span>
                  <span>${(item.qty * item.price).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-1 border-t pt-2">
              <div className="flex justify-between text-xs">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <DialogFooter showCloseButton>
            <Button>
              <ReceiptText className="size-4" />
              Print Mock Receipt
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
