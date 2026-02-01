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
import { cn } from "@/lib/utils";
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
          <header className="flex h-16 items-center justify-between border-b bg-background px-4 lg:px-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="hidden md:flex" />
              <h1 className="text-lg font-semibold">Dashboard</h1>
            </div>
            <Badge variant="secondary" className="gap-1.5">
              <Activity className="size-3" />
              Live
            </Badge>
          </header>

          <div className="flex-1 overflow-auto">
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
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(0,1fr)]">
                {/* Main Revenue Chart - Large */}
                <Card className="md:col-span-2 lg:col-span-3 lg:row-span-2 flex flex-col">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                    <div className="space-y-1">
                      <CardTitle className="text-xl font-bold tracking-tight">Revenue Velocity</CardTitle>
                      <p className="text-sm text-muted-foreground">Real-time revenue performance vs last period</p>
                    </div>
                    <Badge variant="outline" className="font-medium px-2.5 py-0.5 border-primary/20 bg-primary/5 text-primary">
                      +12.5% YoY
                    </Badge>
                  </CardHeader>
                  <CardContent className="flex-1 pb-4">
                    <ChartContainer
                      config={{
                        revenue: { label: "Revenue", color: "hsl(var(--chart-1))" },
                        orders: { label: "Orders", color: "hsl(var(--chart-2))" },
                      }}
                      className="aspect-auto h-[240px] lg:h-[280px] w-full"
                    >
                      <AreaChart data={revenueData}>
                        <defs>
                          <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted/50" />
                        <XAxis 
                          dataKey="month" 
                          tickLine={false} 
                          axisLine={false} 
                          tickMargin={12}
                          className="text-muted-foreground font-medium"
                        />
                        <ChartTooltip 
                          cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1 }}
                          content={<ChartTooltipContent className="w-[180px] border-none shadow-2xl" />} 
                        />
                        <Area
                          dataKey="revenue"
                          type="monotone"
                          fill="url(#fillRevenue)"
                          stroke="var(--color-revenue)"
                          strokeWidth={3}
                          stackId="a"
                        />
                        <Line
                          dataKey="orders"
                          type="monotone"
                          stroke="var(--color-orders)"
                          strokeWidth={2}
                          dot={false}
                        />
                        <ChartLegend content={<ChartLegendContent className="mt-4" />} />
                      </AreaChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {/* Live Activity - Tall */}
                <Card className="lg:row-span-2">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-semibold">Live Activity</CardTitle>
                      <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px] pr-4">
                      <div className="space-y-5">
                        {activityFeed.map((item, idx) => (
                          <div key={item.id} className="relative flex items-start gap-4">
                            {idx !== activityFeed.length - 1 && (
                              <div className="absolute left-[7px] top-6 bottom-[-20px] w-[1px] bg-border" />
                            )}
                            <div className="mt-1.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-primary ring-4 ring-primary/10 shrink-0" />
                            <div className="flex-1 space-y-0.5">
                              <p className="text-sm font-semibold leading-none">{item.label}</p>
                              <p className="text-xs text-muted-foreground font-medium">{item.time}</p>
                            </div>
                            {item.amount && (
                              <span className={cn(
                                "text-xs font-bold tabular-nums",
                                item.amount.startsWith("-") ? "text-destructive" : "text-emerald-600 dark:text-emerald-400"
                              )}>
                                {item.amount}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* Category Pulse - Medium */}
                <Card className="md:col-span-1 lg:col-span-1">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Category Pulse</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        value: { label: "Orders", color: "hsl(var(--chart-3))" },
                      }}
                      className="h-[120px] w-full"
                    >
                      <BarChart data={categoryData}>
                        <defs>
                          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--color-value)" stopOpacity={1}/>
                            <stop offset="100%" stopColor="var(--color-value)" stopOpacity={0.6}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted/20" />
                        <XAxis dataKey="name" hide />
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <Bar 
                          dataKey="value" 
                          fill="url(#barGradient)" 
                          radius={[4, 4, 0, 0]} 
                          barSize={32}
                        />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {/* Summary Card - Small */}
                <Card className="bg-primary text-primary-foreground overflow-hidden relative">
                  <div className="absolute right-[-20px] top-[-20px] opacity-10">
                    <TrendingUp className="size-24" />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium opacity-80">Conversion Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">4.2%</div>
                    <p className="text-xs mt-1 opacity-70">+0.6% from yesterday</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
