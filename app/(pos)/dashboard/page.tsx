"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { DollarSign, Package, Receipt, Users } from "lucide-react"

import { metricCards, orderHistory, type Order } from "@/components/pos/mock-data"
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

const statIcons = [DollarSign, Receipt, Package, Users]

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
  return (
    <div>
      <PageHeading
        title="Dashboard"
        description="Live operating snapshot for your store."
        icon={DollarSign}
        badge="Today"
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metricCards.map((metric, index) => {
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
          <CardDescription>Latest transactions from the active shift.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={orderHistory.slice(0, 5)} />
        </CardContent>
      </Card>
    </div>
  )
}
