"use client";

import {
  TrendingUp,
  ShoppingCart,
  Users,
  DollarSign,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AppSidebar } from "@/components/pos";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const revenueData = [
  { month: "Jan", revenue: 4200, orders: 120 },
  { month: "Feb", revenue: 5100, orders: 138 },
  { month: "Mar", revenue: 4800, orders: 128 },
  { month: "Apr", revenue: 5900, orders: 155 },
  { month: "May", revenue: 7100, orders: 180 },
  { month: "Jun", revenue: 6800, orders: 170 },
];

const categoryData = [
  { name: "Coffee", value: 240 },
  { name: "Meals", value: 186 },
  { name: "Dessert", value: 140 },
];

const activityFeed = [
  { id: "1", label: "Order #1442 completed", time: "2 min ago", amount: "$32.50" },
  { id: "2", label: "New customer registered", time: "8 min ago", amount: "" },
  { id: "3", label: "Refund issued", time: "14 min ago", amount: "-$9.99" },
  { id: "4", label: "Order #1441 completed", time: "18 min ago", amount: "$18.25" },
  { id: "5", label: "Order #1440 completed", time: "25 min ago", amount: "$21.40" },
];

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex h-screen flex-col overflow-hidden">
          <header className="flex h-14 items-center justify-between border-b bg-background px-4 lg:px-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="hidden md:flex" />
              <h1 className="text-lg font-semibold">Dashboard</h1>
            </div>
            <Badge variant="secondary" className="gap-1.5">
              <Activity className="size-3" />
              Live
            </Badge>
          </header>

          <ScrollArea className="flex-1">
            <div className="p-4 lg:p-6 space-y-6">
              {/* Stats Grid */}
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { icon: DollarSign, label: "Net Revenue", value: "$42,580", change: "+12.5%" },
                  { icon: ShoppingCart, label: "Order Volume", value: "1,284", change: "+8.2%" },
                  { icon: TrendingUp, label: "Avg. Ticket", value: "$28.40", change: "+4.1%" },
                  { icon: Users, label: "Customer Growth", value: "238", change: "+18.3%" },
                ].map((item) => (
                  <Card key={item.label}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {item.label}
                      </CardTitle>
                      <item.icon className="size-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{item.value}</div>
                      <p className="text-xs text-muted-foreground">{item.change} from last month</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Bento Section */}
              <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Revenue Velocity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        revenue: { label: "Revenue", color: "hsl(var(--primary))" },
                        orders: { label: "Orders", color: "hsl(var(--muted-foreground))" },
                      }}
                    >
                      <AreaChart data={revenueData}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          dataKey="revenue"
                          type="monotone"
                          fill="var(--color-revenue)"
                          stroke="var(--color-revenue)"
                          fillOpacity={0.15}
                        />
                        <Line
                          dataKey="orders"
                          type="monotone"
                          stroke="var(--color-orders)"
                          strokeWidth={2}
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                      </AreaChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Live Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[260px]">
                      <div className="space-y-4">
                        {activityFeed.map((item) => (
                          <div key={item.id} className="flex items-start gap-3">
                            <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">{item.label}</p>
                              <p className="text-xs text-muted-foreground">{item.time}</p>
                            </div>
                            {item.amount && (
                              <span className="text-xs font-medium">{item.amount}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>

              {/* Category Pulse */}
              <Card>
                <CardHeader>
                  <CardTitle>Category Pulse</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      value: { label: "Orders", color: "hsl(var(--primary))" },
                    }}
                  >
                    <BarChart data={categoryData}>
                      <CartesianGrid vertical={false} />
                      <XAxis dataKey="name" tickLine={false} axisLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="value" fill="var(--color-value)" radius={6} />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
