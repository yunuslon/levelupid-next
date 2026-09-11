export const testimonialsSection = {
  badge: 'Dipercaya penjual Indonesia',
  titleLine1: 'Kisah sukses dari',
  titleLine2: 'para penjual kami.',
  subtitle:
    'Pengusaha nyata, hasil nyata. Begini LevelUpID membantu usaha mereka tumbuh.',
} as const

export interface Testimonial {
  quote: string
  name: string
  business: string
  city: string
  rating: 1 | 2 | 3 | 4 | 5
  /** Mock chip omzet bulanan — ganti data riil saat tersedia */
  monthlyRevenue: string
  photoSeed: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Dulu untung tipis karena potongan marketplace. Sekarang pelanggan langganan saya pesan lewat toko sendiri, margin balik lagi.',
    name: 'Ratna Wijaya',
    business: 'Dapur Nusantara',
    city: 'Bandung',
    rating: 5,
    monthlyRevenue: 'Rp 15 jt+ / bulan',
    photoSeed: 'ratna-dapur-nusantara',
  },
  {
    quote:
      'Saya gaptek total, tapi wizard-nya benar-benar memandu. Toko baju saya online sebelum anak saya pulang sekolah.',
    name: 'Hendra Kusuma',
    business: 'Kios Sneakers ID',
    city: 'Surabaya',
    rating: 5,
    monthlyRevenue: 'Rp 8 jt+ / bulan',
    photoSeed: 'hendra-kios-sneakers',
  },
  {
    quote:
      'Fitur COD-nya penyelamat. Pembeli di luar kota lebih percaya bayar di tempat, jualan saya naik hampir dua kali lipat.',
    name: 'Siti Marlina',
    business: 'Skincare Halal Bunda',
    city: 'Makassar',
    rating: 4,
    monthlyRevenue: 'Rp 12 jt+ / bulan',
    photoSeed: 'siti-skincare-bunda',
  },
]
