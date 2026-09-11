import { BadgeCheck } from 'lucide-react'
import { capabilities } from '../_content/free-panel'

/** Deretan chip kapabilitas di bawah hero. */
export function CapabilityChips() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16">
      <ul className="flex flex-wrap items-center justify-center gap-3">
        {capabilities.map((c) => (
          <li
            key={c}
            className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-medium shadow-xs"
          >
            <BadgeCheck className="size-4 text-[var(--primary)]" />
            {c}
          </li>
        ))}
      </ul>
    </section>
  )
}
