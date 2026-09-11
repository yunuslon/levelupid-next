'use client'

import { Quote, Star, TrendingUp } from 'lucide-react'
import { useReveal } from '../../_hooks/use-reveal'
import { testimonials, testimonialsSection } from '../_content/testimonials'
import { SectionBadge } from './section-badge'

export function Testimonials() {
  const headRef = useReveal<HTMLDivElement>()
  const listRef = useReveal<HTMLUListElement>()
  return (
    <section className="relative overflow-hidden bg-mint-soft py-20 lg:py-28">
      <div
        aria-hidden
        className="bg-mint pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full opacity-50 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4">
        <div ref={headRef} className="reveal mx-auto max-w-2xl text-center">
          <SectionBadge icon={Quote} label={testimonialsSection.badge} />
          <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            {testimonialsSection.titleLine1}{' '}
            <span className="heading-accent">
              {testimonialsSection.titleLine2}
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-slate-600">
            {testimonialsSection.subtitle}
          </p>
        </div>

        <ul
          ref={listRef}
          className="reveal-group mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0"
        >
          {testimonials.map((t) => (
            <li
              key={t.name}
              className="card-lift w-[85%] max-w-[420px] shrink-0 snap-start rounded-2xl border bg-white p-6 sm:w-[420px] lg:w-auto lg:max-w-none"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-emerald-500 text-white">
                <Quote className="size-4" />
              </span>

              <blockquote className="mt-4 text-[15px] leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="mt-6 flex items-center justify-between gap-3 border-t pt-5">
                <figure className="flex items-center gap-3">
                  <img
                    src={`https://picsum.photos/seed/${t.photoSeed}/96/96`}
                    alt=""
                    width={44}
                    height={44}
                    loading="lazy"
                    className="size-11 rounded-full object-cover"
                  />
                  <figcaption className="leading-tight">
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-slate-500">
                      {t.business} · {t.city}
                    </p>
                    <div
                      className="mt-1 flex gap-0.5"
                      aria-label={`Rating ${t.rating} dari 5`}
                    >
                      {(['1', '2', '3', '4', '5'] as const).map((n, i) => (
                        <Star
                          key={n}
                          className={
                            i < t.rating
                              ? 'size-3.5 fill-amber-400 text-amber-400'
                              : 'size-3.5 text-slate-300'
                          }
                        />
                      ))}
                    </div>
                  </figcaption>
                </figure>
              </div>

              <div className="mt-5 flex items-center justify-between rounded-xl bg-mint px-4 py-2.5">
                <span className="flex items-center gap-2 text-xs font-semibold text-[var(--primary)]">
                  <span className="size-1.5 rounded-full bg-[var(--primary)]" />
                  {t.monthlyRevenue}
                </span>
                <span className="flex size-7 items-center justify-center rounded-lg bg-[var(--primary)] text-white">
                  <TrendingUp className="size-4" />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
