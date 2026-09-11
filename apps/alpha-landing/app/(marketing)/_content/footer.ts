import { site } from './site'

export const footer = {
  tagline:
    'Membantu penjual kecil Indonesia punya toko online sendiri: mudah, cepat, dan bebas komisi marketplace.',
  columns: [
    {
      title: 'Jelajahi',
      links: [
        { label: 'Fitur', href: '/#fitur' },
        { label: 'Cara Kerja', href: '/#cara-kerja' },
        { label: 'Harga', href: '/#gratis' },
        { label: 'FAQ', href: '/#faq' },
      ],
    },
    {
      title: 'Perusahaan',
      links: [
        { label: 'Kontak', href: '/#kontak' },
        { label: 'Syarat & Ketentuan', href: '/terms' },
        { label: 'Kebijakan Privasi', href: '/privacy' },
      ],
    },
  ],
  getInTouch: {
    title: 'Hubungi Kami',
    email: site.contactEmail,
    address: 'Menteng, Jakarta Pusat, Indonesia',
  },
  newsletter: {
    title: 'Tetap Terhubung',
    body: 'Berlangganan kabar terbaru, tips jualan online, dan penawaran khusus.',
    placeholder: 'Masukkan email Anda',
    cta: 'Berlangganan',
  },
  copyright: `Copyright © 2026 ${site.name}. Seluruh hak cipta dilindungi.`,
} as const
