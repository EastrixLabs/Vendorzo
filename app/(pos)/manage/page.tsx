"use client"

import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { Bell, MailPlus, Store, Users } from "lucide-react"

import { storeIdentity } from "@/lib/business-config"
import { PageFooter } from "@/components/pos/page-footer"
import { PageHeading } from "@/components/pos/page-heading"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable, DataTableRowAction } from "@/components/ui/data-table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

const fallbackCurrencies = ["PHP", "USD", "EUR", "SGD", "JPY", "AUD", "GBP", "CAD"] as const

const explicitCurrencyFlags: Record<string, string> = {
  EUR: "🇪🇺",
  XAF: "🌍",
  XCD: "🌴",
  XOF: "🌍",
  XPF: "🏝️",
}

function toFlagEmoji(regionCode: string) {
  if (!/^[A-Z]{2}$/.test(regionCode)) {
    return "💱"
  }

  return String.fromCodePoint(
    ...regionCode.split("").map((char) => 127397 + char.charCodeAt(0))
  )
}

function getCurrencyEmoji(currencyCode: string) {
  return explicitCurrencyFlags[currencyCode] ?? toFlagEmoji(currencyCode.slice(0, 2))
}

const workspaceMembers = [
  {
    id: "usr-001",
    name: "Alyssa Cruz",
    email: "alyssa.cruz@vendorzo.ph",
    role: "Manager",
    status: "Active",
    lastActive: "Now",
  },
  {
    id: "usr-002",
    name: "Miguel Santos",
    email: "miguel.santos@vendorzo.ph",
    role: "Staff",
    status: "Invited",
    lastActive: "Invitation sent",
  },
  {
    id: "usr-003",
    name: "Jessa Tan",
    email: "jessa.tan@vendorzo.ph",
    role: "Staff",
    status: "Active",
    lastActive: "2 hours ago",
  },
  {
    id: "usr-004",
    name: "Carlo Reyes",
    email: "carlo.reyes@vendorzo.ph",
    role: "Staff",
    status: "Suspended",
    lastActive: "Yesterday",
  },
] as const

type WorkspaceMember = (typeof workspaceMembers)[number]

const memberColumns: ColumnDef<WorkspaceMember>[] = [
  {
    accessorKey: "name",
    header: "Team Member",
    cell: ({ row }) => (
      <div className="min-w-0">
        <p className="truncate font-medium">{row.original.name}</p>
        <p className="text-muted-foreground truncate text-xs">{row.original.email}</p>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <span className="text-sm">{row.original.role}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const variant =
        row.original.status === "Active"
          ? "secondary"
          : row.original.status === "Invited"
            ? "outline"
            : "destructive"

      return <Badge variant={variant}>{row.original.status}</Badge>
    },
  },
  {
    accessorKey: "lastActive",
    header: "Last Activity",
    cell: ({ row }) => <span className="text-muted-foreground text-sm">{row.original.lastActive}</span>,
  },
]

export default function ManagePage() {
  const [inviteDialogOpen, setInviteDialogOpen] = React.useState(false)
  const [inviteEmail, setInviteEmail] = React.useState("")
  const [inviteRole, setInviteRole] = React.useState("Staff")
  const [storeCurrency, setStoreCurrency] = React.useState<string>(storeIdentity.currency)
  const currencyOptions = typeof Intl.supportedValuesOf === "function"
    ? Intl.supportedValuesOf("currency").sort((a, b) => a.localeCompare(b))
    : [...fallbackCurrencies]

  return (
    <div>
      <PageHeading
        title="Manage Workspace"
        description="Manage store identity, workspace notifications, and staff access for this workspace."
        icon={Users}
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="size-4" />
                Store Identity
              </CardTitle>
              <CardDescription>Owner-managed storefront details shown across the POS.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="store-name">Store name</Label>
                <Input id="store-name" defaultValue={storeIdentity.name} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="store-currency">Currency</Label>
                <Select
                  value={storeCurrency}
                  onValueChange={(value) => {
                    if (value) {
                      setStoreCurrency(value)
                    }
                  }}
                >
                  <SelectTrigger id="store-currency" className="w-full">
                    <span className="flex min-w-0 items-center gap-2">
                      <span>{storeCurrency}</span>
                      <span aria-hidden="true">{getCurrencyEmoji(storeCurrency)}</span>
                    </span>
                  </SelectTrigger>
                  <SelectContent className="shadow-xs!">
                    {currencyOptions.map((currencyCode) => (
                      <SelectItem key={currencyCode} value={currencyCode}>
                        <span className="flex w-full items-center justify-between gap-3">
                          <span>{currencyCode}</span>
                          <span aria-hidden="true">{getCurrencyEmoji(currencyCode)}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="store-contact">Store contact</Label>
                <Input id="store-contact" defaultValue={storeIdentity.contact} />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="store-email">Store email</Label>
                <Input id="store-email" type="email" defaultValue={storeIdentity.email} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="size-4" />
                Alerts
              </CardTitle>
              <CardDescription>Control the notifications shown during daily operations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between rounded-md border p-3">
                <div className="pr-4">
                  <p className="text-sm font-medium">Low stock alerts</p>
                  <p className="text-muted-foreground text-xs">Warn staff before inventory reaches critical levels.</p>
                </div>
                <Switch checked />
              </div>
              <div className="flex items-center justify-between rounded-md border p-3">
                <div className="pr-4">
                  <p className="text-sm font-medium">Order status popups</p>
                  <p className="text-muted-foreground text-xs">Surface fulfillment changes while cashiers are working.</p>
                </div>
                <Switch checked />
              </div>
              <div className="flex items-center justify-between rounded-md border p-3">
                <div className="pr-4">
                  <p className="text-sm font-medium">Daily summary email</p>
                  <p className="text-muted-foreground text-xs">Send a close-of-day performance summary to managers.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator className="my-4" />

      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div className="space-y-1.5">
            <CardTitle className="flex items-center gap-2">
              <Users className="size-4" />
              Workspace Access
            </CardTitle>
            <CardDescription>Invite, review, and manage staff who can access this store workspace.</CardDescription>
          </div>
          <Button className="shrink-0" onClick={() => setInviteDialogOpen(true)}>
            <MailPlus className="size-4" />
            Send Invite
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <DataTable
            columns={memberColumns}
            data={workspaceMembers}
            searchKey="name"
            searchPlaceholder="Search staff..."
            filterKey="status"
            filterLabel="Status"
            filterOptions={[
              { label: "Active", value: "Active" },
              { label: "Invited", value: "Invited" },
              { label: "Suspended", value: "Suspended" },
            ]}
            pageSize={6}
            renderRowActions={(row) => (
              <DataTableRowAction
                label={row.original.name}
                items={[
                  { label: "View Profile" },
                  { label: "Resend Invite" },
                  { label: "Suspend Member", destructive: row.original.status === "Active" },
                ]}
              />
            )}
          />
        </CardContent>
      </Card>

      <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MailPlus className="size-4" />
              Invite Team Member
            </DialogTitle>
            <DialogDescription>
              Add a staff member to this workspace and assign their initial role.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="invite-dialog-email">Email address</Label>
              <Input
                id="invite-dialog-email"
                type="email"
                placeholder="name@vendorzo.ph"
                value={inviteEmail}
                onChange={(event) => setInviteEmail(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invite-dialog-role">Role</Label>
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger id="invite-dialog-role" className="w-full">
                  <span>{inviteRole}</span>
                </SelectTrigger>
                <SelectContent className="shadow-xs!">
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Staff">Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="grid grid-cols-2 gap-2 sm:grid-cols-2">
            <Button variant="outline" className="w-full" onClick={() => setInviteDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="w-full" onClick={() => setInviteDialogOpen(false)}>
              <MailPlus className="size-4" />
              Send Invite
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <PageFooter />
    </div>
  )
}
