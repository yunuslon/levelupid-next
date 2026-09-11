import type { LucideIcon } from 'lucide-react'

export function SectionBadge({
  icon: Icon,
  label,
}: { icon: LucideIcon; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-1.5 text-sm font-medium text-slate-600 shadow-xs">
      <Icon className="size-4 text-[var(--primary)]" />
      {label}
    </span>
  )
}
