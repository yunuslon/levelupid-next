import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LevelUpID — Grow Your Business Online',
  description: 'Start your e-commerce journey with LevelUpID',
}

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
