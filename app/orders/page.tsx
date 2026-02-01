"use client";

import { Clock, CheckCircle2, Truck, Receipt, ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/pos";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const orders = [
  { id: "#1442", customer: "Alex Morgan", status: "Completed", total: "$32.50", time: "5 mins ago" },
  { id: "#1441", customer: "Sam Lee", status: "Processing", total: "$18.25", time: "12 mins ago" },
  { id: "#1440", customer: "Jordan Park", status: "Completed", total: "$21.40", time: "24 mins ago" },
  { id: "#1439", customer: "Taylor Kim", status: "On Hold", total: "$9.99", time: "1 hr ago" },
];

export default function OrdersPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex h-screen flex-col overflow-hidden">
          <header className="flex h-16 items-center justify-between border-b bg-background px-4 lg:px-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="hidden md:flex" />
              <h1 className="text-lg font-semibold">Orders</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            <div className="p-4 lg:p-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Processed Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all">
                    <TabsList>
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="processing">Processing</TabsTrigger>
                      <TabsTrigger value="completed">Completed</TabsTrigger>
                      <TabsTrigger value="onhold">On Hold</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="mt-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Order</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead className="text-right">Details</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orders.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium">{order.id}</TableCell>
                              <TableCell>{order.customer}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    order.status === "Completed"
                                      ? "secondary"
                                      : order.status === "Processing"
                                      ? "outline"
                                      : "destructive"
                                  }
                                >
                                  {order.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{order.total}</TableCell>
                              <TableCell>{order.time}</TableCell>
                              <TableCell className="text-right">
                                <Dialog>
                                  <DialogTrigger render={<Button variant="ghost" size="icon-sm" />}>
                                    <ArrowUpRight className="size-4" />
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Order {order.id}</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <div className="flex items-center gap-3">
                                        <CheckCircle2 className="size-4 text-muted-foreground" />
                                        <span className="text-sm">Payment confirmed</span>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <Truck className="size-4 text-muted-foreground" />
                                        <span className="text-sm">Preparing order</span>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <Clock className="size-4 text-muted-foreground" />
                                        <span className="text-sm">Ready for pickup</span>
                                      </div>
                                      <Separator />
                                      <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                          <span>Subtotal</span>
                                          <span>$28.20</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span>Tax</span>
                                          <span>$4.30</span>
                                        </div>
                                        <div className="flex justify-between font-semibold">
                                          <span>Total</span>
                                          <span>{order.total}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
