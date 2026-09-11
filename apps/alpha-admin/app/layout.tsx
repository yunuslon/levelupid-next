import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Alpha Admin | LevelUpID',
  description: 'Internal admin panel for LevelUpID',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
