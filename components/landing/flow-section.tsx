"use client"

import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

import { workflowSteps } from "@/components/landing/content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function FlowSection() {
  const router = useRouter()

  return (
    <section className="border-y bg-muted/20">
      <div className="mx-auto w-full max-w-6xl mx-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mb-8 space-y-3 animate-vendorzo-fade-up">
          <Badge variant="secondary">Product flow</Badge>
          <h2 className="max-w-2xl text-2xl font-semibold sm:text-3xl">
            A simple SaaS journey from login to dashboard.
          </h2>
          <p className="text-muted-foreground max-w-3xl text-sm sm:text-base">
            Keep the product path obvious, lightweight, and easy to extend when backend auth is ready.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {workflowSteps.map((step, index) => (
            <Card
              key={step.title}
              size="sm"
              className="h-full animate-vendorzo-fade-up"
              style={{ animationDelay: `${index * 90 + 120}ms` }}
            >
              <CardHeader>
                <Badge variant="outline" className="w-fit">
                  Step {index + 1}
                </Badge>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <span className="bg-muted inline-flex size-8 items-center justify-center rounded-md border">
                    <step.icon className="text-primary size-4" />
                  </span>
                  {step.title}
                </CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => router.push(step.route)}
                >
                  Open {step.route}
                  <ArrowRight className="size-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}