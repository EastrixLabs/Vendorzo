import { PosShell } from "@/components/pos/pos-shell"

type PosLayoutProps = {
  children: React.ReactNode
}

export default function PosLayout({ children }: PosLayoutProps) {
  return <PosShell>{children}</PosShell>
}
