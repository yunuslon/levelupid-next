'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { navLinks, signupCta } from '../_content/site'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const hideSignupCta = pathname?.startsWith('/register') ?? false

  return (
    <header className="sticky top-0 z-40 border-b bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight"
        >
          LevelUp<span className="text-[var(--primary)]">ID</span>
        </Link>

        <nav className="hidden items-start gap-7 md:flex" aria-label="Utama">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {!hideSignupCta && (
            <Link
              href="/register"
              className="inline-flex h-10 items-center justify-center rounded-full bg-[var(--primary)] px-5 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
            >
              {signupCta}
            </Link>
          )}
        </div>

        <button
          type="button"
          className="inline-flex size-9 items-center justify-center rounded-lg border md:hidden"
          aria-expanded={open}
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {open && (
        <div className="border-t md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                {link.label}
              </a>
            ))}
            {!hideSignupCta && (
              <div className="mt-2 flex items-center gap-2 pb-2">
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 flex-1 items-center justify-center rounded-full bg-[var(--primary)] px-5 text-sm font-medium text-white"
                >
                  {signupCta}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
