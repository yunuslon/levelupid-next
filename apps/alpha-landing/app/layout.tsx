import type { Metadata } from 'next'
import { Bricolage_Grotesque, Onest } from 'next/font/google'
import './globals.css'

const onest = Onest({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'LevelUpID — Platform E-commerce untuk UMKM Indonesia',
    template: '%s | LevelUpID',
  },
  description:
    'Buat toko online Anda dalam hitungan menit. Kelola produk, pesanan, dan pelanggan dalam satu platform. Gratis untuk memulai, tanpa kartu kredit.',
  keywords: [
    'toko online',
    'e-commerce',
    'UMKM',
    'platform jualan',
    'website toko',
    'Indonesia',
  ],
  authors: [{ name: 'LevelUpID' }],
  creator: 'LevelUpID',
  publisher: 'LevelUpID',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    siteName: 'LevelUpID',
    title: 'LevelUpID — Platform E-commerce untuk UMKM Indonesia',
    description:
      'Buat toko online Anda dalam hitungan menit. Kelola produk, pesanan, dan pelanggan dalam satu platform.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LevelUpID',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LevelUpID — Platform E-commerce untuk UMKM Indonesia',
    description:
      'Buat toko online Anda dalam hitungan menit. Kelola produk, pesanan, dan pelanggan dalam satu platform.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${onest.variable} ${bricolage.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased font-sans">{children}</body>
    </html>
  )
}
