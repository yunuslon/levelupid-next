'use client'

import { CircleCheck } from 'lucide-react'
import Link from 'next/link'
import { useReveal } from '../../_hooks/use-reveal'
import { closingCta } from '../_content/cta'

export function CtaSection() {
  const ref = useReveal<HTMLDivElement>()
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div
          ref={ref}
          className="reveal relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-600 via-[var(--primary)] to-emerald-700 px-6 py-20 text-center md:px-12"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[560px] -translate-x-1/2 rounded-full bg-white/15 blur-3xl"
          />

          <div className="relative mx-auto max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur">
              {closingCta.badge}
            </span>

            <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-balance text-white md:text-5xl">
              {closingCta.headlineLine1} {closingCta.headlineLine2}
            </h2>
            <p className="mx-auto mt-4 max-w-[52ch] leading-relaxed text-white/90">
              {closingCta.body}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/register"
                className="inline-flex h-11 items-center justify-center rounded-full bg-white px-7 text-[15px] font-semibold text-[var(--primary)] transition-transform hover:-translate-y-0.5 hover:bg-white/95 active:translate-y-0"
              >
                {closingCta.primaryCta}
              </Link>
              <a
                href="#kontak"
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/40 bg-transparent px-7 text-[15px] font-semibold text-white hover:bg-white/10"
              >
                {closingCta.secondaryCta}
              </a>
            </div>

            <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 border-t border-white/20 pt-6 text-xs text-white/90">
              {closingCta.trust.map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <CircleCheck className="size-3.5" />
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
