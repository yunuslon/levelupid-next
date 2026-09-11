'use client'

import { BadgeCheck, ChartColumn, ChartPie, TrendingUp } from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts'
import { useReveal } from '../../_hooks/use-reveal'
import {
  analytics,
  salesByCategory,
  statCards,
  weeklyOrders,
} from '../_content/analytics'
import { SectionBadge } from './section-badge'

const categoryColors = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
]

export function AnalyticsPreview() {
  const headRef = useReveal<HTMLDivElement>()
  const cardsRef = useReveal<HTMLDivElement>()
  const chartsRef = useReveal<HTMLDivElement>()

  return (
    <section className="bg-mint-soft py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div ref={headRef} className="reveal mx-auto max-w-2xl text-center">
          <SectionBadge icon={ChartColumn} label={analytics.badge} />
          <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            {analytics.title}
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-slate-600">
            {analytics.subtitle}
          </p>
        </div>

        <div
          ref={cardsRef}
          className="reveal-group mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {statCards.map((s) => (
            <div
              key={s.label}
              className="card-lift rounded-2xl border bg-white p-5"
            >
              <div className="flex items-start justify-between">
                <p className="text-sm font-medium text-slate-500">{s.label}</p>
                <span className="inline-flex items-center gap-0.5 rounded-full bg-[var(--primary)]/10 px-2 py-0.5 text-[11px] font-semibold text-[var(--primary)]">
                  <TrendingUp className="size-3" />
                  {s.trend}
                </span>
              </div>
              <p className="mt-3 font-display text-3xl font-semibold tracking-tight">
                {s.value}
              </p>
              <dl className="mt-3 space-y-1.5 border-t pt-3">
                {s.rows.map((r) => (
                  <div
                    key={r.k}
                    className="flex items-center justify-between text-xs"
                  >
                    <dt className="text-slate-500">{r.k}</dt>
                    <dd className="font-semibold">{r.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        <div
          ref={chartsRef}
          className="reveal-group mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2"
        >
          <div className="rounded-2xl border bg-white p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold">{weeklyOrders.title}</h3>
                <p className="text-xs text-slate-500">
                  {weeklyOrders.subtitle}
                </p>
              </div>
              <span className="inline-flex items-center gap-0.5 rounded-full bg-[var(--primary)]/10 px-2 py-0.5 text-[11px] font-semibold text-[var(--primary)]">
                <TrendingUp className="size-3" />
                {weeklyOrders.trend}
              </span>
            </div>
            <div className="mt-4 h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[...weeklyOrders.data]}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    fontSize={12}
                  />
                  <Tooltip />
                  <Bar dataKey="orders" fill="var(--primary)" radius={6} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold">{salesByCategory.title}</h3>
                <p className="text-xs text-slate-500">
                  {salesByCategory.subtitle}
                </p>
              </div>
              <BadgeCheck className="size-5 text-[var(--primary)]" />
            </div>
            <div className="mt-4 h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip />
                  <Pie
                    data={[...salesByCategory.data]}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={2}
                    strokeWidth={0}
                  >
                    {salesByCategory.data.map((entry, i) => (
                      <Cell
                        key={entry.name}
                        fill={categoryColors[i % categoryColors.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="mt-4 space-y-2">
              {salesByCategory.data.map((d, i) => (
                <li
                  key={d.name}
                  className="flex items-center justify-between text-xs"
                >
                  <span className="flex items-center gap-2 font-medium">
                    <span
                      className="size-2.5 rounded-full"
                      style={{
                        background: categoryColors[i % categoryColors.length],
                      }}
                    />
                    {d.name}
                  </span>
                  <span className="text-slate-500">
                    <span className="font-semibold text-slate-900">
                      {d.revenue}
                    </span>{' '}
                    {d.value}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          <ChartPie className="mr-1 inline size-3.5" /> Preview memakai data
          contoh — dashboard Anda akan menampilkan data toko sendiri.
        </p>
      </div>
    </section>
  )
}
