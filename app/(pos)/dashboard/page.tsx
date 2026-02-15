"use client"

import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { DollarSign, Package, Receipt, Users } from "lucide-react"

import { fetchOrders } from "@/lib/supabase/queries"
import { toOrder, type Order } from "@/lib/supabase/types"
import type { DbOrder } from "@/lib/supabase/types"
import { PageHeading } from "@/components/pos/page-heading"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { Skeleton } from "@/components/ui/skeleton"

const statIcons = [DollarSign, Receipt, Package, Users]

function computeMetrics(rawOrders: DbOrder[]) {
  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  const todayOrders = rawOrders.filter(
    (o) => new Date(o.created_at) >= todayStart
  )

  const revenue = todayOrders.reduce((sum, o) => sum + Number(o.total), 0)
  const orderCount = todayOrders.length
  const avgTicket = orderCount > 0 ? revenue / orderCount : 0
  const refundCount = todayOrders.filter((o) => o.status === "Refunded").length
  const refundRate = orderCount > 0 ? (refundCount / orderCount) * 100 : 0

  return [
    { label: "Today Revenue", value: `$${revenue.toFixed(2)}`, delta: `${orderCount} orders` },
    { label: "Orders", value: `${orderCount}`, delta: "today" },
    { label: "Avg Ticket", value: `$${avgTicket.toFixed(2)}`, delta: "per order" },
    { label: "Refund Rate", value: `${refundRate.toFixed(1)}%`, delta: `${refundCount} refunds` },
  ]
}

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order",
    cell: ({ row }) => <span className="font-medium">{row.original.id}</span>,
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "items",
    header: "Items",
  },
  {
    accessorKey: "payment",
    header: "Payment",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.status === "Completed" ? "secondary" : "outline"}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "total",
    header: () => <div className="text-right">Total</div>,
    cell: ({ row }) => <div className="text-right">${row.original.total.toFixed(2)}</div>,
  },
]

export default function DashboardPage() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [orders, setOrders] = React.useState<Order[]>([])
  const [metrics, setMetrics] = React.useState(computeMetrics([]))

  React.useEffect(() => {
    fetchOrders()
      .then((rawOrders) => {
        setMetrics(computeMetrics(rawOrders))
        setOrders(rawOrders.map(toOrder))
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div>
      <PageHeading
        title="Dashboard"
        description="Live operating snapshot for your store."
        icon={DollarSign}
        badge="Today"
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Card key={`metric-skeleton-${i}`} size="sm">
                <CardContent className="space-y-2 pt-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-5 w-16" />
                </CardContent>
              </Card>
            ))
          : metrics.map((metric, index) => {
              const Icon = statIcons[index]

              return (
                <Card key={metric.label} size="sm">
                  <CardHeader className="pb-2">
                    <CardDescription className="flex items-center gap-2">
                      <Icon className="size-4" />
                      {metric.label}
                    </CardDescription>
                    <CardTitle className="text-2xl font-semibold">{metric.value}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary">{metric.delta}</Badge>
                  </CardContent>
                </Card>
              )
            })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest transactions from your store.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={`order-skeleton-${i}`} className="h-10 w-full" />
              ))}
            </div>
          ) : (
            <DataTable columns={columns} data={orders.slice(0, 5)} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
