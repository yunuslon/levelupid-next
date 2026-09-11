import { SiteFooter } from './_components/site-footer'
import { SiteHeader } from './_components/site-header'

/**
 * Marketing layout — flex column dengan min-h-[100dvh] supaya footer
 * selalu nempel di bawah viewport pada halaman pendek (seperti /privacy,
 * /terms) tanpa menyisakan space putih.
 */
export default function MarketingLayout({
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
