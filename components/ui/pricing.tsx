'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion, type Transition } from 'framer-motion'
import { CheckCircleIcon, StarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { Badge } from "@/components/ui/badge"

type FREQUENCY = 'monthly' | 'yearly'
const frequencies: FREQUENCY[] = ['monthly', 'yearly']

export interface Plan {
  name: string
  info: string
  price: {
    monthly: number | string
    yearly: number | string
  }
  features: {
    text: string
    tooltip?: string
  }[]
  btn: {
    text: string
    href: string
  }
  highlighted?: boolean
}

interface PricingSectionProps extends React.ComponentProps<'div'> {
  plans: Plan[]
}

export function PricingSection({
  plans,
  ...props
}: PricingSectionProps) {
  const [frequency, setFrequency] = React.useState<FREQUENCY>('monthly')

  return (
    <section
      className={cn(
        'mx-auto w-full max-w-6xl px-6 lg:px-8 py-24 sm:py-32',
        props.className,
      )}
      {...props}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 flex flex-col md:flex-row md:items-end justify-between w-full gap-8"
      >
        <div className="space-y-4 text-center md:text-left flex flex-col md:items-start items-center">
          <Badge
            variant="outline"
            className="px-4 py-1.5 text-xs tracking-widest uppercase font-semibold text-primary/70 border-primary/20 bg-primary/5 shadow-xs gap-1.5"
          >
            Clear Pricing
          </Badge>
          <h2 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl leading-[1.1]">
            Flexible plans that <span className="text-primary italic font-thin">scale</span> with your growth.
          </h2>
          <p className="text-muted-foreground/90 max-w-2xl text-lg mt-2 font-medium">
            Keep onboarding simple now, then extend billing and entitlement logic when your backend is ready.
          </p>
        </div>

        <Tabs
          value={frequency}
          onValueChange={(value) => setFrequency(value as FREQUENCY)}
          className="w-full sm:w-auto shadow-xs rounded-xl p-1 bg-muted/20 border border-border/50 h-12 flex items-center"
        >
          <TabsList className="bg-transparent h-full p-0 w-full flex items-center">
            <TabsTrigger value="monthly" className="h-full rounded-lg px-6 data-[state=active]:bg-background data-[state=active]:shadow-xs transition-all flex-1 sm:flex-initial">Monthly</TabsTrigger>
            <TabsTrigger value="yearly" className="h-full rounded-lg px-6 data-[state=active]:bg-background data-[state=active]:shadow-xs transition-all flex-1 sm:flex-initial">Yearly</TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      <div className="mx-auto grid w-full grid-cols-1 gap-6 md:grid-cols-3">
        {plans.map((plan, index) => (
          <PricingCard
            plan={plan}
            key={plan.name}
            frequency={frequency}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}

type PricingCardProps = React.ComponentProps<'div'> & {
  plan: Plan
  frequency?: FREQUENCY
  index?: number
}

export function PricingCard({
  plan,
  className,
  frequency = frequencies[0],
  index = 0,
  ...props
}: PricingCardProps) {
  const MotionDiv = motion.div as any
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={cn(
        'relative flex w-full flex-col overflow-hidden rounded-[1.25rem] border bg-background shadow-sm',
        className,
      )}
      {...props}
    >
      {plan.highlighted && (
        <BorderTrail
          style={{
            boxShadow:
              '0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)',
          }}
          size={100}
        />
      )}

      <div
        className={cn(
          'rounded-t-[1.1rem] border-b p-6',
          plan.highlighted ? 'bg-muted/40' : 'bg-muted/20',
        )}
      >
        <div className="absolute top-4 right-4 flex items-center gap-2">
          {plan.highlighted && (
            <p className="bg-background flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium shadow-xs">
              <StarIcon className="h-3.5 w-3.5" />
              Most popular
            </p>
          )}
          {frequency === 'yearly' && typeof plan.price.monthly === 'number' && typeof plan.price.yearly === 'number' && plan.price.monthly > 0 && (
            <p className="bg-primary text-primary-foreground flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium shadow-xs">
              {Math.round(
                ((plan.price.monthly * 12 - plan.price.yearly) /
                  (plan.price.monthly * 12)) *
                100,
              )}
              % off
            </p>
          )}
        </div>

        <div className="text-lg font-medium">{plan.name}</div>
        <p className="text-muted-foreground text-sm font-normal">{plan.info}</p>
        <h3 className="mt-4 flex items-end gap-2">
          {typeof plan.price[frequency] === 'number' ? (
            <>
              <span className="text-5xl font-bold tracking-tight">${plan.price[frequency]}</span>
              <span className="text-muted-foreground mb-1">
                /{frequency === 'monthly' ? 'mo' : 'yr'}
              </span>
            </>
          ) : (
            <span className="text-5xl font-bold tracking-tight">{plan.price[frequency]}</span>
          )}
        </h3>
      </div>

      <div
        className={cn(
          'space-y-4 px-6 py-6 text-sm text-muted-foreground',
          plan.highlighted && 'bg-muted/10',
        )}
      >
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-start gap-2">
            <CheckCircleIcon className="mt-1 h-4 w-4 text-foreground" />
            <TooltipProvider delay={0}>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className={cn(
                      feature.tooltip &&
                      'cursor-pointer border-b border-dashed border-muted-foreground/50 pb-0.5',
                    )}
                  >
                    {feature.text}
                  </div>
                </TooltipTrigger>
                {feature.tooltip && (
                  <TooltipContent>
                    <p>{feature.tooltip}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
        ))}
      </div>

      <div
        className={cn(
          'mt-auto w-full border-t p-5',
          plan.highlighted && 'bg-muted/40',
        )}
      >
        <Button className="w-full" variant={plan.highlighted ? 'default' : 'outline'} asChild>
          <Link href={plan.btn.href}>{plan.btn.text}</Link>
        </Button>
      </div>
    </MotionDiv>
  )
}

type BorderTrailProps = {
  className?: string
  size?: number
  transition?: Transition
  delay?: number
  onAnimationComplete?: () => void
  style?: React.CSSProperties
}

export function BorderTrail({
  className,
  size = 60,
  transition,
  delay,
  onAnimationComplete,
  style,
}: BorderTrailProps) {
  const BASE_TRANSITION: Transition = {
    repeat: Infinity,
    duration: 5,
    ease: 'linear',
  }

  return (
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
      <motion.div
        className={cn('absolute aspect-square bg-zinc-500', className)}
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          ...style,
        }}
        animate={{
          offsetDistance: ['0%', '100%'],
        }}
        transition={{
          ...(transition ?? BASE_TRANSITION),
          delay,
        }}
        onAnimationComplete={onAnimationComplete}
      />
    </div>
  )
}
