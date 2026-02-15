"use client"

import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { ClipboardList, FileX2 } from "lucide-react"

import { fetchOrders } from "@/lib/supabase/queries"
import { toOrder, type Order } from "@/lib/supabase/types"
import { PageHeading } from "@/components/pos/page-heading"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DataTable, DataTableRowAction } from "@/components/ui/data-table"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"

const statusFilters = ["Completed", "Pending", "Refunded"] as const

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
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
    accessorKey: "date",
    header: "Date",
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
  {
    id: "row-actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => (
      <DataTableRowAction
        label={row.original.id}
        items={[
          { label: "View Receipt" },
          { label: "Duplicate Order" },
          { label: "Refund Order", destructive: true },
        ]}
      />
    ),
  },
]

export default function OrdersPage() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [orders, setOrders] = React.useState<Order[]>([])

  React.useEffect(() => {
    fetchOrders()
      .then((rows) => setOrders(rows.map(toOrder)))
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div>
      <PageHeading
        title="Orders"
        description="Order history table with statuses and payment channels."
        icon={ClipboardList}
      />

      <Card>
        <CardHeader>
          <CardTitle>Order History Table</CardTitle>
          <CardDescription>Transaction records from your store.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={`orders-table-skeleton-${index}`} className="h-10 w-full" />
              ))}
            </div>
          ) : orders.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center gap-2 py-12 text-center">
                <FileX2 className="text-muted-foreground size-9" />
                <h3 className="text-base font-medium">No orders to display</h3>
                <p className="text-muted-foreground text-sm">
                  No orders have been placed yet.
                </p>
              </CardContent>
            </Card>
          ) : (
            <DataTable
              columns={columns}
              data={orders}
              searchKey="customer"
              searchPlaceholder="Search customer..."
              filterKey="status"
              filterLabel="Status"
              filterOptions={statusFilters.map((status) => ({
                label: status,
                value: status,
              }))}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
