"use client";

import {
  Plus,
  Search,
  MoreHorizontal,
  ImagePlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { AppSidebar } from "@/components/pos";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const products = [
  { id: "P-001", name: "Cappuccino", category: "Coffee", price: "$4.50", stock: "48", status: "Active" },
  { id: "P-002", name: "Margherita Pizza", category: "Food", price: "$12.99", stock: "26", status: "Active" },
  { id: "P-003", name: "Cheesecake", category: "Dessert", price: "$6.50", stock: "10", status: "Low" },
  { id: "P-004", name: "Cold Brew", category: "Coffee", price: "$4.00", stock: "0", status: "Out" },
];

export default function ProductsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex h-screen flex-col overflow-hidden">
          <header className="flex h-16 items-center justify-between border-b bg-background px-4 lg:px-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="hidden md:flex" />
              <h1 className="text-lg font-semibold">Products</h1>
            </div>

            <Sheet>
              <SheetTrigger render={<Button className="gap-2" />}>
                <Plus className="size-4" />
                Add Product
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Add New Product</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <Tabs defaultValue="general">
                    <TabsList>
                      <TabsTrigger value="general">General</TabsTrigger>
                      <TabsTrigger value="pricing">Pricing</TabsTrigger>
                      <TabsTrigger value="media">Media</TabsTrigger>
                    </TabsList>
                    <TabsContent value="general" className="mt-4 space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="product-name" className="text-sm font-medium">Product Name</label>
                        <Input id="product-name" placeholder="e.g. Cappuccino" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="product-category" className="text-sm font-medium">Category</label>
                        <Input id="product-category" placeholder="e.g. Coffee" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="product-description" className="text-sm font-medium">Description</label>
                        <textarea id="product-description" className="w-full rounded-md border bg-background p-2 text-sm" rows={4} placeholder="Write a short description..." />
                      </div>
                    </TabsContent>
                    <TabsContent value="pricing" className="mt-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="product-price" className="text-sm font-medium">Price</label>
                          <Input id="product-price" placeholder="$0.00" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="product-stock" className="text-sm font-medium">Stock</label>
                          <Input id="product-stock" placeholder="0" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="product-status" className="text-sm font-medium">Status</label>
                        <Input id="product-status" placeholder="Active / Draft" />
                      </div>
                    </TabsContent>
                    <TabsContent value="media" className="mt-4 space-y-4">
                      <div className="flex items-center justify-center rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
                        <ImagePlus className="size-5 mr-2" />
                        Upload product images
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </SheetContent>
            </Sheet>
          </header>

          <div className="flex-1 overflow-auto">
            <div className="p-4 lg:p-6 space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Inventory</CardTitle>
                  <div className="flex items-center gap-2">
                    <Search className="size-4 text-muted-foreground" />
                    <Input placeholder="Search products..." className="w-56" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>{item.price}</TableCell>
                          <TableCell>{item.stock}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                item.status === "Active"
                                  ? "secondary"
                                  : item.status === "Low"
                                  ? "outline"
                                  : "destructive"
                              }
                            >
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon-sm">
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
