'use client'

import { Check, CircleCheck, Gift } from 'lucide-react'
import Link from 'next/link'
import { useReveal } from '../../_hooks/use-reveal'
import { freePanel } from '../_content/free-panel'
import { signupCta } from '../_content/site'
import { SectionBadge } from './section-badge'

export function FreePanel() {
  const ref = useReveal<HTMLDivElement>()
  return (
    <section id="gratis" className="scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div
          ref={ref}
          className="reveal relative overflow-hidden rounded-3xl border bg-mint-soft px-6 py-14 text-center md:px-12"
        >
          <div
            aria-hidden
            className="blob-mint pointer-events-none absolute inset-0 opacity-70"
          />

          <div className="relative mx-auto max-w-3xl">
            <SectionBadge icon={Gift} label={freePanel.badge} />
            <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-balance md:text-4xl">
              {freePanel.titleLine1}{' '}
              <span className="heading-accent">{freePanel.titleLine2}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-slate-600">
              {freePanel.subtitle}
            </p>

            <ul className="mt-10 grid grid-cols-1 gap-3 text-left sm:grid-cols-2 lg:grid-cols-3">
              {freePanel.chips.map((chip) => (
                <li
                  key={chip}
                  className="flex items-center gap-3 rounded-xl border bg-white px-4 py-3 text-sm font-medium"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-[var(--primary)]/10 text-[var(--primary)]">
                    <Check className="size-3.5" />
                  </span>
                  {chip}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/register"
                className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--primary)] px-7 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
              >
                {freePanel.primaryCta || signupCta}
              </Link>
              <a
                href="#cara-kerja"
                className="inline-flex h-11 items-center justify-center rounded-full border bg-white px-7 text-[15px] font-medium transition-colors hover:bg-slate-50"
              >
                {freePanel.secondaryCta}
              </a>
            </div>

            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-600">
              {freePanel.trust.map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <CircleCheck className="size-3.5 text-[var(--primary)]" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
