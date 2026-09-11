'use client'

import { Star } from 'lucide-react'
import { useReveal } from '../../_hooks/use-reveal'
import { statsBand } from '../_content/stats'

/** Kartu besar berisi 4 metrik utama — pola stats band referensi. Angka mock. */
export function StatsBand() {
  const ref = useReveal<HTMLDivElement>()
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 lg:py-24">
      <div
        ref={ref}
        className="reveal grid grid-cols-2 gap-8 rounded-3xl border bg-white px-8 py-10 shadow-sm lg:grid-cols-4"
      >
        {statsBand.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-display text-4xl font-semibold tracking-tight text-[var(--primary)]">
              {s.value}
            </p>
            {s.stars && (
              <div className="mt-2 flex justify-center gap-0.5">
                {['s1', 's2', 's3', 's4', 's5'].map((n) => (
                  <Star
                    key={n}
                    className="size-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
            )}
            <p className="mt-2 text-sm font-semibold">{s.label}</p>
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[var(--primary)]/20 bg-mint px-2.5 py-0.5 text-[11px] text-[var(--primary)]">
              {s.badge}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
