'use client'

import { MonitorPlay, Play } from 'lucide-react'
import Link from 'next/link'
import { useReveal } from '../../_hooks/use-reveal'
import { demo } from '../_content/demo'
import { MiniStorefront } from './mini-storefront'
import { SectionBadge } from './section-badge'

export function DemoTheme() {
  const ref = useReveal<HTMLDivElement>()
  return (
    <section className="bg-mint py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div ref={ref} className="reveal">
            <SectionBadge icon={MonitorPlay} label={demo.badge} />
            <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-balance md:text-4xl">
              {demo.titleLine1}{' '}
              <span className="heading-accent">{demo.titleLine2}</span>
            </h2>
            <blockquote className="mt-5 max-w-[48ch] border-l-2 border-[var(--primary)]/30 pl-4 leading-relaxed text-slate-600">
              &ldquo;{demo.quote}&rdquo;
            </blockquote>
            <Link
              href="/register"
              className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-7 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
            >
              <Play className="size-4" />
              {demo.cta}
            </Link>
          </div>

          <div className="animate-rise-in-delay-2 flex justify-center lg:justify-end">
            <div className="browser-frame w-full max-w-xl">
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
      </div>
    </section>
  )
}
