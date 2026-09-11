'use client'

import { Banknote, Handshake, Truck } from 'lucide-react'
import { useReveal } from '../../_hooks/use-reveal'
import {
  logisticsPartners,
  partners,
  paymentPartners,
} from '../_content/partners'
import { SectionBadge } from './section-badge'

export function Partners() {
  const ref = useReveal<HTMLDivElement>()
  const gridRef = useReveal<HTMLDivElement>()
  return (
    <section className="bg-mint-soft py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div ref={ref} className="reveal mx-auto max-w-2xl text-center">
          <SectionBadge icon={Handshake} label={partners.badge} />
          <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            {partners.titleLine1}{' '}
            <span className="heading-accent">{partners.titleLine2}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-slate-600">
            {partners.subtitle}
          </p>
        </div>

        <div
          ref={gridRef}
          className="reveal-group mt-14 grid grid-cols-1 gap-5 lg:grid-cols-2"
        >
          <div className="rounded-2xl border bg-white p-6">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-emerald-500 text-white">
                <Truck className="size-5" />
              </span>
              <div>
                <h3 className="font-semibold text-[var(--primary)]">
                  Mitra Kurir
                </h3>
                <p className="text-xs text-slate-500">
                  Solusi pengiriman andal
                </p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {logisticsPartners.map((p) => (
                <div
                  key={p.name}
                  className="flex h-16 items-center justify-center rounded-xl border bg-white shadow-xs"
                >
                  <span className={`text-lg tracking-wide ${p.className}`}>
                    {p.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-emerald-500 text-white">
                <Banknote className="size-5" />
              </span>
              <div>
                <h3 className="font-semibold text-[var(--primary)]">
                  Mitra Pembayaran
                </h3>
                <p className="text-xs text-slate-500">Kanal pembayaran aman</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {paymentPartners.map((p) => (
                <div
                  key={p.name}
                  className="flex h-16 items-center justify-center rounded-xl border bg-white shadow-xs"
                >
                  <span className={`text-lg tracking-wide ${p.className}`}>
                    {p.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-slate-500">
          {partners.moreNote}
        </p>
      </div>
    </section>
  )
}
