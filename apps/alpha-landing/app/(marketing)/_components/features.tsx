'use client'

import {
  BarChart3,
  type LucideIcon,
  Monitor,
  Package,
  Palette,
  Sparkles,
  Truck,
  Wallet,
} from 'lucide-react'
import { useReveal } from '../../_hooks/use-reveal'
import { type FeatureItem, featureItems, features } from '../_content/features'
import { SectionBadge } from './section-badge'

const iconMap: Record<FeatureItem['icon'], LucideIcon> = {
  wallet: Wallet,
  truck: Truck,
  box: Package,
  chart: BarChart3,
  monitor: Monitor,
  palette: Palette,
}

export function Features() {
  const headRef = useReveal<HTMLDivElement>()
  const gridRef = useReveal<HTMLDivElement>()
  return (
    <section id="fitur" className="bg-mint-soft scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div ref={headRef} className="reveal mx-auto max-w-2xl text-center">
          <SectionBadge icon={Sparkles} label={features.badge} />
          <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            {features.titleLine1}{' '}
            <span className="heading-accent">{features.titleLine2}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-slate-600">
            {features.subtitle}
          </p>
        </div>

        <div
          ref={gridRef}
          className="reveal-group mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {featureItems.map((f) => {
            const Icon = iconMap[f.icon]
            return (
              <div
                key={f.title}
                className="card-lift relative overflow-hidden rounded-2xl border bg-white p-6"
              >
                <div
                  aria-hidden
                  className="blob-mint pointer-events-none absolute inset-0"
                />
                <div className="relative">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-emerald-500 text-white shadow-sm">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    {f.body}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {f.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-center gap-2 text-[13px] font-medium"
                      >
                        <span className="size-1.5 shrink-0 rounded-full bg-[var(--primary)]" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
