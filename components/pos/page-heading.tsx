import { type LucideIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"

type PageHeadingProps = {
  title: string
  description: string
  icon: LucideIcon
  badge?: string
  actions?: React.ReactNode
}

export function PageHeading({
  title,
  description,
  icon: Icon,
  badge,
  actions,
}: PageHeadingProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Icon className="text-muted-foreground size-4" />
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {badge ? <Badge variant="secondary">{badge}</Badge> : null}
        </div>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  )
}
