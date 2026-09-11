'use client'

import { Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useReveal } from '../../_hooks/use-reveal'
import { hero } from '../_content/hero'
import { MiniStorefront } from './mini-storefront'
import { SectionBadge } from './section-badge'

export function Hero() {
  const ref = useReveal<HTMLDivElement>()
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="bg-mint pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[880px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
      />

      <div
        ref={ref}
        className="reveal relative mx-auto max-w-6xl px-4 pb-16 pt-16 text-center md:pt-24 lg:pb-24"
      >
        <SectionBadge icon={Sparkles} label={hero.badge} />

        <h1 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-semibold leading-[1.08] tracking-tighter text-balance md:text-6xl">
          {hero.headlineLine1}{' '}
          <span className="heading-accent">{hero.headlineLine2}</span>
        </h1>
        <p className="mx-auto mt-5 max-w-[52ch] text-base leading-relaxed text-slate-600 md:text-lg">
          {hero.subtext}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/register"
            className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--primary)] px-7 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
          >
            {hero.primaryCta}
          </Link>
          <a
            href="#cara-kerja"
            className="inline-flex h-11 items-center justify-center rounded-full border bg-white px-7 text-[15px] font-medium transition-colors hover:bg-slate-50"
          >
            {hero.secondaryCta}
          </a>
        </div>

        <div className="animate-rise-in-delay-2 mt-14 flex justify-center">
          <div className="browser-frame w-full max-w-2xl">
            <div className="browser-frame-bar">
              <span className="browser-frame-dot" />
              <span className="browser-frame-dot" />
              <span className="browser-frame-dot" />
              <span className="ml-3 truncate text-xs text-slate-500">
                dapurnusantara.levelupid.id
              </span>
            </div>
            <MiniStorefront />
          </div>
        </div>
      </div>
    </section>
  )
}
