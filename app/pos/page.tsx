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
  Percent,
  Trash2,
  Plus,
  Minus,
  CreditCard,
  Banknote,
  QrCode,
  Receipt,
  ChevronRight,
  Sparkles,
  Coffee,
  Pizza,
  Sandwich,
  IceCream,
  Beer,
  UtensilsCrossed,
  Grid3X3,
  LayoutGrid,
  X,
  ArrowLeft,
  MoreHorizontal,
  Bell,
  Settings,
  LogOut,
  HelpCircle,
  Users,
  Tag,
  Gift,
  Home,
  Package,
  BarChart3,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";

// ============================================================================
// DATA & TYPES
// ============================================================================

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  color: string;
  popular?: boolean;
  discount?: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

const categories: Category[] = [
  { id: "all", name: "All Items", icon: <Grid3X3 className="size-4" />, color: "from-zinc-500 to-zinc-600" },
  { id: "popular", name: "Popular", icon: <Zap className="size-4" />, color: "from-amber-500 to-orange-600" },
  { id: "coffee", name: "Coffee", icon: <Coffee className="size-4" />, color: "from-amber-700 to-amber-900" },
  { id: "food", name: "Food", icon: <Pizza className="size-4" />, color: "from-red-500 to-rose-600" },
  { id: "sandwich", name: "Sandwich", icon: <Sandwich className="size-4" />, color: "from-yellow-500 to-amber-600" },
  { id: "dessert", name: "Dessert", icon: <IceCream className="size-4" />, color: "from-pink-400 to-rose-500" },
  { id: "drinks", name: "Drinks", icon: <Beer className="size-4" />, color: "from-cyan-500 to-blue-600" },
  { id: "meals", name: "Meals", icon: <UtensilsCrossed className="size-4" />, color: "from-emerald-500 to-green-600" },
];

const products: Product[] = [
  { id: "1", name: "Espresso Shot", price: 2.50, category: "coffee", color: "bg-amber-900/20", popular: true },
  { id: "2", name: "Cappuccino", price: 4.50, category: "coffee", color: "bg-amber-800/20", popular: true },
  { id: "3", name: "Café Latte", price: 4.75, category: "coffee", color: "bg-amber-700/20" },
  { id: "4", name: "Mocha Delight", price: 5.25, category: "coffee", color: "bg-amber-600/20" },
  { id: "5", name: "Cold Brew", price: 4.00, category: "coffee", color: "bg-amber-950/20", popular: true },
  { id: "6", name: "Margherita Pizza", price: 12.99, category: "food", color: "bg-red-500/20", popular: true },
  { id: "7", name: "Pepperoni Pizza", price: 14.99, category: "food", color: "bg-rose-500/20" },
  { id: "8", name: "BBQ Chicken Pizza", price: 15.99, category: "food", color: "bg-orange-500/20" },
  { id: "9", name: "Club Sandwich", price: 8.99, category: "sandwich", color: "bg-yellow-500/20", popular: true },
  { id: "10", name: "BLT Sandwich", price: 7.99, category: "sandwich", color: "bg-amber-500/20" },
  { id: "11", name: "Grilled Cheese", price: 6.99, category: "sandwich", color: "bg-yellow-600/20" },
  { id: "12", name: "Chocolate Cake", price: 5.99, category: "dessert", color: "bg-pink-500/20" },
  { id: "13", name: "Cheesecake", price: 6.50, category: "dessert", color: "bg-rose-400/20", popular: true },
  { id: "14", name: "Ice Cream Sundae", price: 4.99, category: "dessert", color: "bg-pink-400/20" },
  { id: "15", name: "Fresh Lemonade", price: 3.50, category: "drinks", color: "bg-yellow-400/20" },
  { id: "16", name: "Iced Tea", price: 2.99, category: "drinks", color: "bg-amber-400/20" },
  { id: "17", name: "Orange Juice", price: 3.99, category: "drinks", color: "bg-orange-400/20", popular: true },
  { id: "18", name: "Smoothie Bowl", price: 8.99, category: "drinks", color: "bg-purple-400/20" },
  { id: "19", name: "Grilled Salmon", price: 18.99, category: "meals", color: "bg-cyan-500/20" },
  { id: "20", name: "Beef Steak", price: 24.99, category: "meals", color: "bg-red-700/20", popular: true },
  { id: "21", name: "Caesar Salad", price: 9.99, category: "meals", color: "bg-green-500/20" },
  { id: "22", name: "Pasta Alfredo", price: 13.99, category: "meals", color: "bg-yellow-200/20" },
  { id: "23", name: "Veggie Wrap", price: 7.49, category: "sandwich", color: "bg-emerald-500/20" },
  { id: "24", name: "Americano", price: 3.25, category: "coffee", color: "bg-stone-600/20" },
];

// ============================================================================
// COMPONENTS
// ============================================================================

function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (product: Product) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onAdd(product)}
      className={`group relative flex flex-col rounded-2xl border border-border/50 ${product.color} p-3 sm:p-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:border-primary/20 active:scale-[0.98] text-left w-full`}
    >
      {product.popular && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-2 py-0.5 text-[10px] font-semibold text-white shadow-lg">
            <Sparkles className="size-2.5" />
            HOT
          </div>
        </div>
      )}
      {product.discount && (
        <div className="absolute -top-2 -left-2 z-10">
          <div className="flex items-center gap-0.5 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 px-2 py-0.5 text-[10px] font-semibold text-white shadow-lg">
            -{product.discount}%
          </div>
        </div>
      )}

      <div className="mb-2 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl bg-background/60 backdrop-blur-sm mx-auto">
        <span className="text-2xl sm:text-3xl">
          {product.category === "coffee" && "☕"}
          {product.category === "food" && "🍕"}
          {product.category === "sandwich" && "🥪"}
          {product.category === "dessert" && "🍰"}
          {product.category === "drinks" && "🥤"}
          {product.category === "meals" && "🍽️"}
        </span>
      </div>

      <div className="flex flex-1 flex-col">
        <span className="text-xs sm:text-sm font-medium text-foreground line-clamp-2 leading-tight">
          {product.name}
        </span>
        <span className="mt-auto pt-1 text-sm sm:text-base font-bold text-foreground">
          ${product.price.toFixed(2)}
        </span>
      </div>

      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
          <Plus className="size-3.5" />
        </div>
      </div>
    </button>
  );
}

function CartItemRow({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="group flex items-center gap-3 rounded-xl bg-muted/40 p-3 transition-colors hover:bg-muted/60">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${item.color}`}>
        <span className="text-lg">
          {item.category === "coffee" && "☕"}
          {item.category === "food" && "🍕"}
          {item.category === "sandwich" && "🥪"}
          {item.category === "dessert" && "🍰"}
          {item.category === "drinks" && "🥤"}
          {item.category === "meals" && "🍽️"}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{item.name}</p>
        <p className="text-xs text-muted-foreground">
          ${item.price.toFixed(2)} each
        </p>
      </div>

      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          size="icon-xs"
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
        >
          <Minus className="size-3" />
        </Button>
        <span className="w-6 text-center text-sm font-semibold tabular-nums">
          {item.quantity}
        </span>
        <Button
          variant="outline"
          size="icon-xs"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        >
          <Plus className="size-3" />
        </Button>
      </div>

      <div className="w-16 text-right">
        <span className="text-sm font-semibold">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
      </div>

      <Button
        variant="ghost"
        size="icon-xs"
        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
        onClick={() => onRemove(item.id)}
      >
        <Trash2 className="size-3.5" />
      </Button>
    </div>
  );
}

function NumPad({ onInput, onClear, onBackspace }: {
  onInput: (value: string) => void;
  onClear: () => void;
  onBackspace: () => void;
}) {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "⌫"];

  return (
    <div className="grid grid-cols-3 gap-2">
      {keys.map((key) => (
        <Button
          key={key}
          variant="outline"
          className="h-12 text-lg font-semibold"
          onClick={() => {
            if (key === "⌫") onBackspace();
            else onInput(key);
          }}
        >
          {key}
        </Button>
      ))}
    </div>
  );
}

function PaymentMethodCard({
  icon,
  label,
  sublabel,
  selected,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  selected?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-4 rounded-xl border-2 p-4 transition-all duration-200 w-full text-left ${
        selected
          ? "border-primary bg-primary/5 shadow-md"
          : "border-border hover:border-primary/30 hover:bg-muted/50"
      }`}
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${
          selected ? "bg-primary text-primary-foreground" : "bg-muted"
        }`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <p className="font-semibold">{label}</p>
        <p className="text-sm text-muted-foreground">{sublabel}</p>
      </div>
      {selected && (
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <ChevronRight className="size-4" />
        </div>
      )}
    </button>
  );
}

function QuickActionButton({
  icon,
  label,
  variant = "outline",
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  variant?: "outline" | "secondary" | "ghost";
  onClick?: () => void;
}) {
  return (
    <Button
      variant={variant}
      className="flex flex-col h-auto py-3 px-4 gap-1"
      onClick={onClick}
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </Button>
  );
}

function MobileNav({
  activeTab,
  onTabChange,
  cartCount,
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
  cartCount: number;
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-lg md:hidden">
      <div className="flex items-center justify-around py-2">
        <button
          type="button"
          onClick={() => onTabChange("products")}
          className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
            activeTab === "products" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <LayoutGrid className="size-5" />
          <span className="text-[10px] font-medium">Products</span>
        </button>
        <button
          type="button"
          onClick={() => onTabChange("cart")}
          className={`relative flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
            activeTab === "cart" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <ShoppingCart className="size-5" />
          {cartCount > 0 && (
            <span className="absolute -top-0.5 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {cartCount}
            </span>
          )}
          <span className="text-[10px] font-medium">Cart</span>
        </button>
        <button
          type="button"
          onClick={() => onTabChange("orders")}
          className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
            activeTab === "orders" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Receipt className="size-5" />
          <span className="text-[10px] font-medium">Orders</span>
        </button>
        <button
          type="button"
          onClick={() => onTabChange("more")}
          className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
            activeTab === "more" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <MoreHorizontal className="size-5" />
          <span className="text-[10px] font-medium">More</span>
        </button>
      </div>
    </div>
  );
}

function SidebarNav() {
  const navItems = [
    { icon: <Home className="size-5" />, label: "Dashboard", active: false },
    { icon: <LayoutGrid className="size-5" />, label: "POS", active: true },
    { icon: <Package className="size-5" />, label: "Products", active: false },
    { icon: <Receipt className="size-5" />, label: "Orders", active: false },
    { icon: <Users className="size-5" />, label: "Customers", active: false },
    { icon: <BarChart3 className="size-5" />, label: "Analytics", active: false },
    { icon: <Settings className="size-5" />, label: "Settings", active: false },
  ];

  return (
    <div className="hidden lg:flex flex-col w-16 xl:w-56 border-r bg-muted/30 py-4">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-bold text-lg">
          V
        </div>
        <span className="hidden xl:block font-bold text-lg tracking-tight">Vendorzo</span>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 space-y-1 px-2">
        {navItems.map((item) => (
          <button
            type="button"
            key={item.label}
            className={`flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              item.active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {item.icon}
            <span className="hidden xl:block">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* User */}
      <div className="mt-auto px-2">
        <Separator className="mb-4" />
        <button type="button" className="flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white text-xs font-bold">
            JD
          </div>
          <div className="hidden xl:block text-left">
            <p className="text-sm font-medium text-foreground">John Doe</p>
            <p className="text-xs text-muted-foreground">Cashier</p>
          </div>
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN POS PAGE
// ============================================================================

export default function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileTab, setMobileTab] = useState("products");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isHeldOrdersOpen, setIsHeldOrdersOpen] = useState(false);

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
        <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
          <DialogTrigger
            render={
              <Button
                className="mt-4 w-full h-12 text-base font-semibold gap-2"
                disabled={cart.length === 0}
              />
            }
          >
            <Wallet className="size-5" />
            Charge ${total.toFixed(2)}
          </DialogTrigger>
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
      {/* Search Bar */}
      <div className="border-b p-3 md:p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="border-b px-3 md:px-4 py-2">
        <ScrollArea className="w-full">
          <div className="flex gap-2 pb-2">
            {categories.map((category) => (
              <button
                type="button"
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                  activeCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-md`
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Products Grid */}
      <ScrollArea className="flex-1 p-3 md:p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={addToCart}
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
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <SidebarNav />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex h-14 items-center justify-between border-b bg-background px-4 lg:px-6">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon-sm" className="lg:hidden" />}>
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SheetHeader className="border-b p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-bold text-lg">
                    V
                  </div>
                  <SheetTitle>Vendorzo POS</SheetTitle>
                </div>
              </SheetHeader>
              <nav className="space-y-1 p-2">
                {[
                  { icon: <Home className="size-5" />, label: "Dashboard" },
                  { icon: <LayoutGrid className="size-5" />, label: "POS", active: true },
                  { icon: <Package className="size-5" />, label: "Products" },
                  { icon: <Receipt className="size-5" />, label: "Orders" },
                  { icon: <Users className="size-5" />, label: "Customers" },
                  { icon: <BarChart3 className="size-5" />, label: "Analytics" },
                  { icon: <Settings className="size-5" />, label: "Settings" },
                ].map((item) => (
                  <SheetClose
                    key={item.label}
                    render={
                      <button
                        type="button"
                        className={`flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                          item.active
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
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white text-sm font-bold">
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
          <div className="hidden lg:block">
            <h1 className="text-lg font-semibold">Point of Sale</h1>
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
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white text-xs font-bold">
                JD
              </div>
            </div>
          </div>
        </header>

        {/* Main POS Layout */}
        <div className="flex flex-1 overflow-hidden">
          {/* Products Section - Hidden on mobile when viewing cart */}
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
                { icon: <Home className="size-5" />, label: "Dashboard" },
                { icon: <Package className="size-5" />, label: "Products" },
                { icon: <Users className="size-5" />, label: "Customers" },
                { icon: <BarChart3 className="size-5" />, label: "Analytics" },
                { icon: <Settings className="size-5" />, label: "Settings" },
                { icon: <HelpCircle className="size-5" />, label: "Help & Support" },
              ].map((item) => (
                <button
                  type="button"
                  key={item.label}
                  className="flex items-center gap-3 w-full rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  {item.icon}
                  <span>{item.label}</span>
                  <ChevronRight className="size-4 ml-auto" />
                </button>
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
    </div>
  );
}
