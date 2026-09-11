export const site = {
  name: 'LevelUpID',
  tagline: 'Toko online sendiri, bebas komisi marketplace',
  contactEmail: 'halo@levelupid.id',
} as const

export const navLinks = [
  { label: 'Fitur', href: '/#fitur' },
  { label: 'Cara Kerja', href: '/#cara-kerja' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Kontak', href: '/#kontak' },
] as const

export const legalLinks = [
  { label: 'Syarat & Ketentuan', to: '/terms' },
  { label: 'Kebijakan Privasi', to: '/privacy' },
] as const

/** Label CTA tunggal untuk intent daftar — dipakai di seluruh halaman */
export const signupCta = 'Daftar Gratis' as const
