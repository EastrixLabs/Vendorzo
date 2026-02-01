"use client";

import * as React from "react";
import { useState } from "react";
import {
  Search,
  ShoppingCart,
  Menu,
  User,
  Clock,
  Zap,
  Trash2,
  CreditCard,
  Banknote,
  QrCode,
  Receipt,
  ChevronRight,
  Coffee,
  Pizza,
  Sandwich,
  IceCream,
  Beer,
  UtensilsCrossed,
  Grid3X3,
  LayoutGrid,
  Bell,
  Settings,
  HelpCircle,
  Users,
  Tag,
  Gift,
  Home,
  Package,
  BarChart3,
  Wallet,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

// POS Components
import {
  ProductCard,
  CartItemRow,
  CategoryFilter,
  PaymentMethodCard,
  MobileNav,
  ViewToggle,
  AppSidebar,
  type Product,
  type CartItem,
  type Category,
  type ViewMode,
} from "@/components/pos";

// ============================================================================
// DATA
// ============================================================================

const categories: Category[] = [
  { id: "all", name: "All Items", icon: <Grid3X3 className="size-4" /> },
  { id: "popular", name: "Popular", icon: <Zap className="size-4" /> },
  { id: "coffee", name: "Coffee", icon: <Coffee className="size-4" /> },
  { id: "food", name: "Food", icon: <Pizza className="size-4" /> },
  { id: "sandwich", name: "Sandwich", icon: <Sandwich className="size-4" /> },
  { id: "dessert", name: "Dessert", icon: <IceCream className="size-4" /> },
  { id: "drinks", name: "Drinks", icon: <Beer className="size-4" /> },
  { id: "meals", name: "Meals", icon: <UtensilsCrossed className="size-4" /> },
];

const products: Product[] = [
  { id: "1", name: "Espresso Shot", price: 2.50, category: "coffee", popular: true },
  { id: "2", name: "Cappuccino", price: 4.50, category: "coffee", popular: true },
  { id: "3", name: "Café Latte", price: 4.75, category: "coffee" },
  { id: "4", name: "Mocha Delight", price: 5.25, category: "coffee" },
  { id: "5", name: "Cold Brew", price: 4.00, category: "coffee", popular: true },
  { id: "6", name: "Margherita Pizza", price: 12.99, category: "food", popular: true },
  { id: "7", name: "Pepperoni Pizza", price: 14.99, category: "food" },
  { id: "8", name: "BBQ Chicken Pizza", price: 15.99, category: "food" },
  { id: "9", name: "Club Sandwich", price: 8.99, category: "sandwich", popular: true },
  { id: "10", name: "BLT Sandwich", price: 7.99, category: "sandwich" },
  { id: "11", name: "Grilled Cheese", price: 6.99, category: "sandwich" },
  { id: "12", name: "Chocolate Cake", price: 5.99, category: "dessert" },
  { id: "13", name: "Cheesecake", price: 6.50, category: "dessert", popular: true },
  { id: "14", name: "Ice Cream Sundae", price: 4.99, category: "dessert" },
  { id: "15", name: "Fresh Lemonade", price: 3.50, category: "drinks" },
  { id: "16", name: "Iced Tea", price: 2.99, category: "drinks" },
  { id: "17", name: "Orange Juice", price: 3.99, category: "drinks", popular: true },
  { id: "18", name: "Smoothie Bowl", price: 8.99, category: "drinks" },
  { id: "19", name: "Grilled Salmon", price: 18.99, category: "meals" },
  { id: "20", name: "Beef Steak", price: 24.99, category: "meals", popular: true },
  { id: "21", name: "Caesar Salad", price: 9.99, category: "meals" },
  { id: "22", name: "Pasta Alfredo", price: 13.99, category: "meals" },
  { id: "23", name: "Veggie Wrap", price: 7.49, category: "sandwich" },
  { id: "24", name: "Americano", price: 3.25, category: "coffee" },
];

// ============================================================================
// MAIN POS PAGE
// ============================================================================

export default function POSPage() {
  const pathname = usePathname();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileTab, setMobileTab] = useState("products");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isHeldOrdersOpen, setIsHeldOrdersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  React.useEffect(() => {
    if (activeCategory !== "all" && viewMode !== "grid") {
      setViewMode("grid");
    }
  }, [activeCategory, viewMode]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      setCart((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "all" ||
      (activeCategory === "popular" && product.popular) ||
      product.category === activeCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // ============================================================================
  // ORDER PANEL (Cart Section)
  // ============================================================================

  const OrderPanel = () => (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <div>
          <h2 className="text-lg font-bold">Current Order</h2>
          <p className="text-xs text-muted-foreground">
            Order #1247 • Table 5
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon-sm">
            <Clock className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={clearCart}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center gap-2 border-b p-3 overflow-x-auto">
        <Button variant="outline" size="sm" className="shrink-0 gap-1.5">
          <User className="size-3.5" />
          <span className="hidden sm:inline">Customer</span>
        </Button>
        <Button variant="outline" size="sm" className="shrink-0 gap-1.5">
          <Tag className="size-3.5" />
          <span className="hidden sm:inline">Discount</span>
        </Button>
        <Button variant="outline" size="sm" className="shrink-0 gap-1.5">
          <Gift className="size-3.5" />
          <span className="hidden sm:inline">Coupon</span>
        </Button>
      </div>

      {/* Cart Items */}
      <ScrollArea className="flex-1 p-3">
        {cart.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <ShoppingCart className="size-7 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              Cart is empty
            </p>
            <p className="text-xs text-muted-foreground/70">
              Add items to get started
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {cart.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Totals */}
      <div className="border-t bg-muted/30 p-4">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax (8%)</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-primary">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Button */}
        <Button
          className="mt-4 w-full h-12 text-base font-semibold gap-2"
          disabled={cart.length === 0}
          onClick={() => setIsPaymentOpen(true)}
        >
          <Wallet className="size-5" />
          Charge ${total.toFixed(2)}
        </Button>

        {/* Secondary Actions */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Button variant="outline" className="gap-1.5" onClick={() => setIsHeldOrdersOpen(true)}>
            <Clock className="size-4" />
            Hold Order
          </Button>
          <Button variant="outline" className="gap-1.5">
            <Receipt className="size-4" />
            Print Receipt
          </Button>
        </div>
      </div>
    </div>
  );

  // ============================================================================
  // PRODUCTS PANEL
  // ============================================================================

  const ProductsPanel = () => (
    <div className="flex h-full flex-col">
      {/* Search Bar with View Toggle */}
      <div className="border-b p-3 md:p-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10"
            />
          </div>
          {activeCategory === "all" && (
            <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="border-b px-3 md:px-4 py-2">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      {/* Products Grid/List */}
      <ScrollArea className="flex-1 p-3 md:p-4">
        <div
          key={viewMode}
          className={
          viewMode === "grid"
            ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3"
            : "flex flex-col gap-2"
          }
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={addToCart}
              viewMode={viewMode}
            />
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Search className="size-7 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              No products found
            </p>
            <p className="text-xs text-muted-foreground/70">
              Try a different search or category
            </p>
          </div>
        )}
      </ScrollArea>
    </div>
  );

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex h-screen flex-col overflow-hidden">
          {/* Top Bar */}
          <header className="flex h-16 items-center justify-between border-b bg-background px-4 lg:px-6">
            {/* Left side - Sidebar trigger and mobile menu */}
            <div className="flex items-center gap-2">
              <SidebarTrigger className="hidden md:flex" />
              
              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger render={<Button variant="ghost" size="icon-sm" className="md:hidden" />}>
                  <Menu className="size-5" />
                </SheetTrigger>
                <SheetContent side="left" className="w-72 p-0">
                  <SheetHeader className="border-b p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-lg">
                        V
                      </div>
                      <SheetTitle>Vendorzo POS</SheetTitle>
                    </div>
                  </SheetHeader>
                  <nav className="space-y-1 p-2">
                    {[
                      { icon: <Home className="size-5" />, label: "Dashboard", href: "/dashboard" },
                      { icon: <LayoutGrid className="size-5" />, label: "POS", href: "/pos" },
                      { icon: <Package className="size-5" />, label: "Products", href: "/products" },
                      { icon: <Receipt className="size-5" />, label: "Orders", href: "/orders" },
                      { icon: <BarChart3 className="size-5" />, label: "Analytics", href: "/analytics" },
                      { icon: <Settings className="size-5" />, label: "Settings", href: "/settings" },
                    ].map((item) => (
                      <SheetClose
                        key={item.label}
                        render={
                          <Link
                            href={item.href}
                            className={`flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                              pathname === item.href
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                          />
                        }
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </SheetClose>
                    ))}
                  </nav>
                  <SheetFooter className="absolute bottom-0 left-0 right-0 border-t p-4">
                    <div className="flex items-center gap-3 w-full">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500 text-white text-sm font-bold">
                        JD
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">John Doe</p>
                        <p className="text-xs text-muted-foreground">Cashier</p>
                      </div>
                      <Button variant="ghost" size="icon-sm">
                        <LogOut className="size-4" />
                      </Button>
                    </div>
                  </SheetFooter>
                </SheetContent>
              </Sheet>

              {/* Title */}
              <h1 className="text-lg font-semibold hidden lg:block">Point of Sale</h1>
            </div>

            {/* Center - Status */}
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="gap-1.5 hidden sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Online
              </Badge>
              <Badge variant="outline" className="gap-1.5">
                <Clock className="size-3" />
                {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </Badge>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon-sm" className="relative">
                <Bell className="size-4" />
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-destructive" />
              </Button>
              <Button variant="ghost" size="icon-sm" className="hidden sm:flex">
                <HelpCircle className="size-4" />
              </Button>
              <Separator orientation="vertical" className="h-6 hidden sm:block" />
              <div className="hidden sm:flex items-center gap-2 pl-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500 text-white text-xs font-bold">
                  JD
                </div>
              </div>
            </div>
          </header>

          {/* Main POS Layout */}
          <div className="flex flex-1 overflow-hidden">
            {/* Products Section */}
            <div
              className={`flex-1 overflow-hidden ${
                mobileTab !== "products" ? "hidden md:flex" : "flex"
              } flex-col`}
            >
              <ProductsPanel />
            </div>

            {/* Order Panel - Desktop */}
            <div className="hidden md:flex w-80 lg:w-96 border-l flex-col bg-background">
              <OrderPanel />
            </div>

            {/* Mobile Cart View */}
            <div
              className={`flex-1 overflow-hidden md:hidden ${
                mobileTab === "cart" ? "flex" : "hidden"
              } flex-col`}
            >
              <OrderPanel />
            </div>

            {/* Mobile Orders View */}
            <div
              className={`flex-1 overflow-hidden md:hidden ${
                mobileTab === "orders" ? "flex" : "hidden"
              } flex-col`}
            >
              <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Receipt className="size-7 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Recent Orders</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  View and manage your order history
                </p>
                <Button variant="outline">View All Orders</Button>
              </div>
            </div>

            {/* Mobile More View */}
            <div
              className={`flex-1 overflow-hidden md:hidden ${
                mobileTab === "more" ? "flex" : "hidden"
              } flex-col`}
            >
              <div className="p-4 space-y-2">
                {[
                  { icon: <Home className="size-5" />, label: "Dashboard", href: "/dashboard" },
                  { icon: <Package className="size-5" />, label: "Products", href: "/products" },
                  { icon: <BarChart3 className="size-5" />, label: "Analytics", href: "/analytics" },
                  { icon: <Settings className="size-5" />, label: "Settings", href: "/settings" },
                  { icon: <HelpCircle className="size-5" />, label: "Help & Support", href: "/settings" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-3 w-full rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    <ChevronRight className="size-4 ml-auto" />
                  </Link>
                ))}
                <Separator className="my-4" />
                <button type="button" className="flex items-center gap-3 w-full rounded-xl px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
                  <LogOut className="size-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <MobileNav
          activeTab={mobileTab}
          onTabChange={setMobileTab}
          cartCount={cartItemCount}
        />

      {/* Payment Dialog */}
      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent className="sm:max-w-lg" showCloseButton={true}>
          <DialogHeader>
            <DialogTitle>Complete Payment</DialogTitle>
            <DialogDescription>
              Total amount: ${total.toFixed(2)}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-4">
            <PaymentMethodCard
              icon={<CreditCard className="size-5" />}
              label="Credit / Debit Card"
              sublabel="Visa, Mastercard, Amex"
              selected={paymentMethod === "card"}
              onClick={() => setPaymentMethod("card")}
            />
            <PaymentMethodCard
              icon={<Banknote className="size-5" />}
              label="Cash"
              sublabel="Pay with cash"
              selected={paymentMethod === "cash"}
              onClick={() => setPaymentMethod("cash")}
            />
            <PaymentMethodCard
              icon={<QrCode className="size-5" />}
              label="QR Code / Mobile Pay"
              sublabel="Apple Pay, Google Pay, etc."
              selected={paymentMethod === "qr"}
              onClick={() => setPaymentMethod("qr")}
            />
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsPaymentOpen(false)}>
              Cancel
            </Button>
            <Button
              className="gap-2"
              disabled={!paymentMethod}
              onClick={() => {
                setIsPaymentOpen(false);
                clearCart();
                setPaymentMethod("");
              }}
            >
              <Receipt className="size-4" />
              Complete Sale
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Held Orders Drawer */}
      <Drawer open={isHeldOrdersOpen} onOpenChange={setIsHeldOrdersOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Held Orders</DrawerTitle>
            </DrawerHeader>
            <div className="p-4">
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                  <Clock className="size-6 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  No held orders
                </p>
                <p className="text-xs text-muted-foreground/70">
                  Orders you put on hold will appear here
                </p>
              </div>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline" className="w-full">
                  Close
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </SidebarInset>
    </SidebarProvider>
  );
}
