"use client"

import * as React from "react"
import { ClipboardList, FileX2 } from "lucide-react"

import { PageHeading } from "@/components/pos/page-heading"
import { orderHistory } from "@/components/pos/mock-data"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const statusFilters = ["All", "Completed", "Pending", "Refunded", "Cancelled"] as const

export default function OrdersPage() {
  const [showLoading, setShowLoading] = React.useState(false)
  const [status, setStatus] = React.useState<(typeof statusFilters)[number]>("All")

  const filteredOrders =
    status === "All"
      ? orderHistory
      : orderHistory.filter((order) => order.status === status)

  return (
    <div>
      <PageHeading
        title="Orders"
        description="Order history table with statuses and payment channels."
        icon={ClipboardList}
        actions={
          <div className="flex items-center gap-3">
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as (typeof statusFilters)[number])}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="!shadow-xs">
                {statusFilters.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <Switch checked={showLoading} onCheckedChange={setShowLoading} />
              <Label>Loading</Label>
            </div>
          </div>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>Order History Table</CardTitle>
          <CardDescription>Latest mock transactions from this store.</CardDescription>
        </CardHeader>
        <CardContent>
          {showLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={`orders-table-skeleton-${index}`} className="h-10 w-full" />
              ))}
            </div>
          ) : filteredOrders.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center gap-2 py-12 text-center">
                <FileX2 className="text-muted-foreground size-9" />
                <h3 className="text-base font-medium">No orders to display</h3>
                <p className="text-muted-foreground text-sm">
                  No entries exist for the selected status in this mock dataset.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.payment}</TableCell>
                    <TableCell>
                      <Badge
                        variant={order.status === "Completed" ? "secondary" : "outline"}
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
