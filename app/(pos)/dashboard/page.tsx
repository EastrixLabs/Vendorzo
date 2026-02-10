"use client"

import { DollarSign, Package, Receipt, Users } from "lucide-react"

import { PageHeading } from "@/components/pos/page-heading"
import { metricCards, orderHistory } from "@/components/pos/mock-data"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const statIcons = [DollarSign, Receipt, Package, Users]

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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderHistory.slice(0, 5).map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.items}</TableCell>
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
        </CardContent>
      </Card>
    </div>
  )
}
