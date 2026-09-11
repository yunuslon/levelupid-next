'use client'

import {
  type LucideIcon,
  Palette,
  Rocket,
  TrendingUp,
  UserRound,
} from 'lucide-react'
import { useReveal } from '../../_hooks/use-reveal'
import { stepItems, steps } from '../_content/steps'
import { SectionBadge } from './section-badge'

const iconMap: Record<(typeof stepItems)[number]['icon'], LucideIcon> = {
  user: UserRound,
  palette: Palette,
  rocket: Rocket,
  trend: TrendingUp,
}

export function HowItWorks() {
  const headRef = useReveal<HTMLDivElement>()
  const listRef = useReveal<HTMLOListElement>()
  return (
    <section id="cara-kerja" className="scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div ref={headRef} className="reveal mx-auto max-w-2xl text-center">
          <SectionBadge icon={Rocket} label={steps.badge} />
          <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            {steps.titleLine1}{' '}
            <span className="heading-accent">{steps.titleLine2}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-slate-600">
            {steps.subtitle}
          </p>
        </div>

        <div className="relative mt-14">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-16 hidden border-t border-dashed border-[var(--primary)]/30 lg:block"
          />
          <ol
            ref={listRef}
            className="reveal-group relative grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {stepItems.map((step, i) => {
              const Icon = iconMap[step.icon]
              return (
                <li key={step.title} className="relative">
                  <span className="absolute -top-2 left-6 z-10 flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-emerald-500 text-xs font-bold text-white shadow-sm">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="card-lift flex h-full flex-col items-center rounded-2xl border bg-white px-6 pb-6 pt-14 text-center">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {step.body}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
