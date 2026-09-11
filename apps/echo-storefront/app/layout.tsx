import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Store',
  description: 'Powered by LevelUpID',
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
