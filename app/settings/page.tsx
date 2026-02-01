"use client";

import { Moon, Sun, Palette } from "lucide-react";
import { useTheme } from "next-themes";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppSidebar } from "@/components/pos";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex h-screen flex-col overflow-hidden">
          <header className="flex h-14 items-center justify-between border-b bg-background px-4 lg:px-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="hidden md:flex" />
              <h1 className="text-lg font-semibold">Settings</h1>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto">
            <div className="p-4 lg:p-6 space-y-6">
              {/* Appearance */}
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                        {theme === "dark" ? <Moon className="size-4" /> : <Sun className="size-4" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium">Theme</p>
                        <p className="text-xs text-muted-foreground">Switch between light and dark</p>
                      </div>
                    </div>
                    <Switch
                      checked={theme === "dark"}
                      onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                        <Palette className="size-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Accent Color</p>
                        <p className="text-xs text-muted-foreground">Choose interface accent color</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {[
                        { name: "Violet", color: "bg-violet-500" },
                        { name: "Emerald", color: "bg-emerald-500" },
                        { name: "Amber", color: "bg-amber-500" },
                      ].map((item) => (
                        <button
                          key={item.name}
                          type="button"
                          className={`h-7 w-7 rounded-full border ${item.color}`}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Store Identity */}
              <Card>
                <CardHeader>
                  <CardTitle>Store Identity</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="store-name" className="text-sm font-medium">Store Name</label>
                    <Input id="store-name" placeholder="Vendorzo Main" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="legal-entity" className="text-sm font-medium">Legal Entity</label>
                    <Input id="legal-entity" placeholder="Vendorzo Inc." />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="currency" className="text-sm font-medium">Currency</label>
                    <Input id="currency" placeholder="USD" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="timezone" className="text-sm font-medium">Timezone</label>
                    <Input id="timezone" placeholder="UTC-5" />
                  </div>
                </CardContent>
              </Card>

              {/* Team Access */}
              <Card>
                <CardHeader>
                  <CardTitle>Team Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Member</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { name: "John Doe", role: "Admin", status: "Active" },
                        { name: "Sarah Lee", role: "Manager", status: "Active" },
                        { name: "Alex Kim", role: "Cashier", status: "Invited" },
                      ].map((user) => (
                        <TableRow key={user.name}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{user.role}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={user.status === "Active" ? "secondary" : "outline"}>
                              {user.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
