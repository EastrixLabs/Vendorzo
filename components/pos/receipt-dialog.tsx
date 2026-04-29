"use client"

import { FileText, ReceiptText } from "lucide-react"

import type { DbOrder, DbOrderItem, DbOrderReceipt } from "@/lib/supabase/types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export type ReceiptStoreInfo = {
  name: string
  branch: string
  address: string
}

export type ReceiptLine = {
  id: string
  name: string
  qty: number
  unitPrice: number
  lineTotal: number
}

export type ReceiptPayload = {
  store: ReceiptStoreInfo
  order: {
    receiptNumber: string
    timestamp: string
    cashier: string
    paymentMethod: DbOrder["payment"]
    status: DbOrder["status"]
  }
  lines: ReceiptLine[]
  totals: {
    subtotal: number
    tax: number
    total: number
  }
  fallbackNote?: string
}

type ReceiptDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  receipt: ReceiptPayload | null
  loading?: boolean
  onPrint?: () => void
}

const defaultStoreInfo: ReceiptStoreInfo = {
  name: "Vendorzo Coffee Bar",
  branch: "Main Branch",
  address: "Store address placeholder",
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value)
}

function formatReceiptNumber(orderNumber: number) {
  return `RCPT-${String(orderNumber).padStart(6, "0")}`
}

function formatReceiptTimestamp(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value))
}

function toReceiptLine(item: DbOrderItem): ReceiptLine {
  return {
    id: item.id,
    name: item.product_name,
    qty: item.quantity,
    unitPrice: item.unit_price,
    lineTotal: item.quantity * item.unit_price,
  }
}

export function createReceiptPayload(
  order: DbOrder,
  orderItems: DbOrderItem[],
  options: {
    cashier?: string
    store?: ReceiptStoreInfo
  } = {}
): ReceiptPayload {
  const lines = orderItems.map(toReceiptLine)

  return {
    store: options.store ?? defaultStoreInfo,
    order: {
      receiptNumber: formatReceiptNumber(order.order_number),
      timestamp: formatReceiptTimestamp(order.created_at),
      cashier: options.cashier ?? "Staff",
      paymentMethod: order.payment,
      status: order.status,
    },
    lines,
    totals: {
      subtotal: order.subtotal,
      tax: order.tax,
      total: order.total,
    },
    fallbackNote:
      lines.length === 0
        ? "Line items are unavailable for this order. Totals are shown from the saved order record."
        : undefined,
  }
}

export function createReceiptPayloadFromOrderReceipt(
  orderReceipt: DbOrderReceipt,
  options?: {
    cashier?: string
    store?: ReceiptStoreInfo
  }
): ReceiptPayload {
  return createReceiptPayload(orderReceipt, orderReceipt.order_items ?? [], options)
}

const receiptColors = {
  bg: "#ffffff",
  text: "#141413",
  muted: "#6b6257",
  divider: "#e8e6dc",
  accent: "#d97757",
}

function ReceiptRenderer({ receipt }: { receipt: ReceiptPayload }) {
  return (
    <div
      data-receipt-print-root
      className="mx-auto w-full max-w-[72mm] rounded-lg border px-5 py-6 font-mono text-[12px] leading-relaxed shadow-sm"
      style={{
        backgroundColor: receiptColors.bg,
        color: receiptColors.text,
        borderColor: receiptColors.divider,
      }}
    >
      <div className="space-y-1 text-center">
        <p
          className="font-sans text-sm font-bold tracking-widest uppercase"
          style={{ color: receiptColors.accent }}
        >
          {receipt.store.name}
        </p>
        <p style={{ color: receiptColors.muted }}>{receipt.store.branch}</p>
        <p style={{ color: receiptColors.muted }}>{receipt.store.address}</p>
      </div>

      <div
        className="my-3 border-t border-dashed"
        style={{ borderColor: receiptColors.divider }}
      />

      <div className="space-y-1">
        <div className="flex justify-between gap-3">
          <span style={{ color: receiptColors.muted }}>Receipt</span>
          <span className="font-semibold">{receipt.order.receiptNumber}</span>
        </div>
        <div className="flex justify-between gap-3">
          <span style={{ color: receiptColors.muted }}>Date</span>
          <span className="text-right">{receipt.order.timestamp}</span>
        </div>
        <div className="flex justify-between gap-3">
          <span style={{ color: receiptColors.muted }}>Cashier</span>
          <span>{receipt.order.cashier}</span>
        </div>
        <div className="flex justify-between gap-3">
          <span style={{ color: receiptColors.muted }}>Payment</span>
          <span>{receipt.order.paymentMethod}</span>
        </div>
        <div className="flex justify-between gap-3">
          <span style={{ color: receiptColors.muted }}>Status</span>
          <span>{receipt.order.status}</span>
        </div>
      </div>

      <div
        className="my-3 border-t border-dashed"
        style={{ borderColor: receiptColors.divider }}
      />

      {receipt.lines.length === 0 ? (
        <p
          className="text-center italic"
          style={{ color: receiptColors.muted }}
        >
          {receipt.fallbackNote}
        </p>
      ) : (
        <div className="space-y-2">
          {receipt.lines.map((item) => (
            <div key={item.id} className="space-y-0.5">
              <div className="flex justify-between gap-3">
                <span className="font-medium">{item.name}</span>
                <span>{formatCurrency(item.lineTotal)}</span>
              </div>
              <div
                className="flex justify-between gap-3"
                style={{ color: receiptColors.muted }}
              >
                <span>
                  {item.qty} x {formatCurrency(item.unitPrice)}
                </span>
                <span />
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        className="my-3 border-t border-dashed"
        style={{ borderColor: receiptColors.divider }}
      />

      <div className="space-y-1">
        <div className="flex justify-between gap-3">
          <span style={{ color: receiptColors.muted }}>Subtotal</span>
          <span>{formatCurrency(receipt.totals.subtotal)}</span>
        </div>
        <div className="flex justify-between gap-3">
          <span style={{ color: receiptColors.muted }}>Tax</span>
          <span>{formatCurrency(receipt.totals.tax)}</span>
        </div>
        <div
          className="mt-2 flex justify-between gap-3 border-t border-dashed pt-2 text-sm font-bold"
          style={{ borderColor: receiptColors.divider }}
        >
          <span>Total</span>
          <span>{formatCurrency(receipt.totals.total)}</span>
        </div>
      </div>

      <p
        className="mt-4 text-center text-[11px]"
        style={{ color: receiptColors.muted }}
      >
        Thank you for shopping with Vendorzo.
      </p>
    </div>
  )
}

export function ReceiptDialog({
  open,
  onOpenChange,
  receipt,
  loading = false,
  onPrint,
}: ReceiptDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="size-5" />
            Receipt
          </DialogTitle>
          <DialogDescription>
            Review the saved order receipt or send it to the browser print dialog.
          </DialogDescription>
        </DialogHeader>

        {receipt ? (
          <ReceiptRenderer receipt={receipt} />
        ) : (
          <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
            {loading ? "Loading receipt..." : "No receipt selected."}
          </div>
        )}

        <DialogFooter>
          <div className="w-full grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Close
            </Button>
            <Button
              className="w-full"
              onClick={() => onPrint?.()}
              disabled={!receipt || loading}
            >
              <ReceiptText className="size-4" />
              {loading ? "Loading..." : "Print Receipt"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ReceiptDialog
