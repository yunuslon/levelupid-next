import { SiteFooter } from '../(marketing)/_components/site-footer'
import { SiteHeader } from '../(marketing)/_components/site-header'

/**
 * Auth layout — reuses marketing SiteHeader + SiteFooter for consistency.
 * SiteHeader auto-hides signup CTA when pathname starts with /register.
 * The min-h-[100dvh] flex column ensures footer sticks to bottom on short pages.
 */
export default function AuthLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
