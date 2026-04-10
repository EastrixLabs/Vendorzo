"use client"

import { ArrowRight, Terminal } from "lucide-react"
import { useRouter } from "next/navigation"

import { workflowSteps } from "@/components/landing/content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
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
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 space-y-4 text-center md:text-left flex flex-col md:items-start items-center"
        >
          <Badge variant="outline" className="px-4 py-1.5 text-xs tracking-widest uppercase font-semibold text-primary/70 border-primary/20 bg-primary/5 shadow-xs">
            Product flow
          </Badge>
          <h2 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl leading-[1.1]">
            A seamless journey from <span className="text-primary italic">login</span> to dashboard.
          </h2>
          <p className="text-muted-foreground/90 max-w-2xl text-lg mt-2">
            Keep the product path obvious, lightweight, and easy to extend when backend auth is ready.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {workflowSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.05,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <Card className="h-full group border-border/50 shadow-xs hover:border-primary/20 transition-all duration-300 flex flex-col">
                <CardHeader className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-flex size-10 items-center justify-center rounded-lg bg-muted/40 shadow-xs border border-border/50 text-foreground transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/5 group-hover:text-primary">
                      <step.icon className="size-4" />
                    </span>
                    <Badge variant="secondary" className="font-mono text-[10px] uppercase shadow-xs">
                      0{index + 1}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-semibold tracking-tight">
                    {step.title}
                  </CardTitle>
                  <CardDescription className="text-sm mt-2 leading-relaxed">
                    {step.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-6">
                  <Button
                    variant="outline"
                    className="w-full justify-between hover:bg-primary/5 hover:text-primary transition-colors border-border/50 shadow-xs h-12"
                    onClick={() => router.push(step.route)}
                  >
                    <span className="flex items-center gap-2">
                      <Terminal className="size-3 text-muted-foreground" />
                      {step.route}
                    </span>
                    <ArrowRight className="size-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}