'use client'

import { Mail, MapPin, Phone, Send } from 'lucide-react'
import Link from 'next/link'
import { type FormEvent, useState } from 'react'
import { subscribeNewsletter } from '../../_actions/newsletter'
import { footer } from '../_content/footer'
import { site } from '../_content/site'

const socials = [
  { label: 'Facebook', slug: 'facebook' },
  { label: 'YouTube', slug: 'youtube' },
  { label: 'Instagram', slug: 'instagram' },
  { label: 'WhatsApp', slug: 'whatsapp' },
]

export function SiteFooter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setPending(true)
    setError(null)
    const result = await subscribeNewsletter({ email })
    setPending(false)
    if (result.ok) {
      setSubscribed(true)
    } else {
      setError(result.message ?? 'Gagal berlangganan')
    }
  }

  return (
    <footer className="bg-[#0d1b26] text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <p className="font-display text-xl font-bold tracking-tight text-white">
              LevelUp<span className="text-emerald-400">ID</span>
            </p>
            <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-slate-400">
              {footer.tagline}
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  aria-label={s.label}
                  className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 opacity-70 transition-opacity hover:bg-white/10 hover:opacity-100"
                >
                  <img
                    src={`https://cdn.simpleicons.org/${s.slug}/e2e8f0`}
                    alt=""
                    width={16}
                    height={16}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>

          {footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-semibold text-white">
                <span className="mb-3 block h-0.5 w-8 bg-emerald-400" />
                {col.title}
              </h3>
              <ul className="mt-3 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      <span className="size-1 rounded-full bg-slate-600" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 grid gap-10 rounded-2xl border border-white/10 bg-white/5 p-8 lg:grid-cols-2">
          <div>
            <h3 className="font-semibold text-white">
              <span className="mb-3 block h-0.5 w-8 bg-emerald-400" />
              {footer.getInTouch.title}
            </h3>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                  <Mail className="size-4" />
                </span>
                <div className="text-sm leading-tight">
                  <p className="text-slate-400">Email</p>
                  <a
                    href={`mailto:${footer.getInTouch.email}`}
                    className="mt-0.5 inline-block font-medium text-white hover:text-emerald-400"
                  >
                    {footer.getInTouch.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                  <Phone className="size-4" />
                </span>
                <div className="text-sm leading-tight">
                  <p className="text-slate-400">WhatsApp</p>
                  <p className="mt-0.5 font-medium text-white">Segera hadir</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                  <MapPin className="size-4" />
                </span>
                <div className="text-sm leading-tight">
                  <p className="text-slate-400">Lokasi</p>
                  <p className="mt-0.5 font-medium text-white">
                    {footer.getInTouch.address}
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white">
              {footer.newsletter.title}
            </h3>
            <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-slate-400">
              {footer.newsletter.body}
            </p>
            {subscribed ? (
              <p className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
                <Send className="size-4" />
                Terima kasih! Email Anda sudah terdaftar.
              </p>
            ) : (
              <form onSubmit={onSubmit} className="mt-5 flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={footer.newsletter.placeholder}
                  aria-label="Email untuk newsletter"
                  disabled={pending}
                  className="h-11 flex-1 rounded-lg border border-white/10 bg-white/5 px-4 text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={pending}
                  className="h-11 rounded-lg bg-[var(--primary)] px-5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {pending ? 'Memproses...' : footer.newsletter.cta}
                </button>
              </form>
            )}
            {error && <p className="mt-3 text-xs text-red-400">{error}</p>}
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
          Copyright © 2026 <span className="text-emerald-400">{site.name}</span>
          . Seluruh hak cipta dilindungi.
        </div>
      </div>
    </footer>
  )
}
