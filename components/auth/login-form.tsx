"use client"

import * as React from "react"
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm() {
  const router = useRouter()
  const [method, setMethod] = React.useState<"magic" | "password">("magic")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const canSubmitMagic = email.trim().length > 0 && email.includes("@")
  const canSubmitPassword = email.trim().length > 0 && password.trim().length > 0

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const canSubmit = method === "magic" ? canSubmitMagic : canSubmitPassword
    if (!canSubmit) return

    setIsSubmitting(true)

    if (method === "magic") {
      toast.info("Magic link sent!", {
        description: `Check your inbox at ${email}`,
      })
      setTimeout(() => setIsSubmitting(false), 2000)
    } else {
      toast.success("Welcome back!", {
        description: "Opening your workspace.",
      })
      router.push("/pos")
    }
  }

  return (
    <div className="relative w-full overflow-hidden rounded-[2rem] border border-border/50 bg-muted/10 p-1 shadow-xs">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: method === "magic" ? "translateX(0%)" : "translateX(-100%)" }}
      >
        {/* Magic Link Section */}
        <div className="w-full shrink-0 p-6 sm:p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="magic-email" className="text-muted-foreground ml-1">Email Address</Label>
              <div className="relative">
                <Mail className="text-muted-foreground/60 absolute top-1/2 left-4 size-4 -translate-y-1/2" />
                <Input
                  id="magic-email"
                  type="email"
                  placeholder="name@company.com"
                  className="pl-11 h-12 rounded-xl border-border/50 bg-background shadow-xs transition-colors focus-visible:ring-primary/20"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-12 rounded-xl shadow-xs" disabled={!canSubmitMagic || isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Magic Link"}
              {!isSubmitting && <Mail className="size-4 ml-2 opacity-70" />}
            </Button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-transparent px-2 text-muted-foreground font-semibold tracking-widest">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12 rounded-xl border-border/50 bg-background/50 shadow-xs hover:bg-background transition-all"
              onClick={() => setMethod("password")}
            >
              <LockKeyhole className="size-4 mr-2 opacity-70" />
              Log in with Password
            </Button>
          </form>
        </div>

        {/* Password Section */}
        <div className="w-full shrink-0 p-6 sm:p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="password-email" className="text-muted-foreground ml-1">Email</Label>
              <div className="relative">
                <Mail className="text-muted-foreground/60 absolute top-1/2 left-4 size-4 -translate-y-1/2" />
                <Input
                  id="password-email"
                  type="email"
                  placeholder="you@company.com"
                  className="pl-11 h-12 rounded-xl border-border/50 bg-background shadow-xs transition-colors focus-visible:ring-primary/20"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-muted-foreground ml-1">Password</Label>
              <div className="relative">
                <LockKeyhole className="text-muted-foreground/60 absolute top-1/2 left-4 size-4 -translate-y-1/2" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-11 pr-11 h-12 rounded-xl border-border/50 bg-background shadow-xs transition-colors focus-visible:ring-primary/20"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-muted-foreground/60 absolute top-1/2 right-4 -translate-y-1/2 hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <Button type="submit" className="w-full h-12 rounded-xl shadow-xs" disabled={!canSubmitPassword || isSubmitting}>
                {isSubmitting ? "Authenticating..." : "Sign in to workspace"}
                <ArrowRight className="size-4 ml-2" />
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full h-10 hover:bg-transparent text-primary hover:text-primary/70 transition-colors text-sm font-semibold"
                onClick={() => setMethod("magic")}
              >
                Back to Magic Link login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}