export const partners = {
  badge: 'Mitra Strategis',
  titleLine1: 'Terhubung dengan mitra',
  titleLine2: 'logistik & pembayaran Indonesia.',
  subtitle:
    'Terintegrasi dengan penyedia layanan terbaik untuk kelancaran usaha Anda.',
  moreNote: 'Integrasi lain menyusul untuk mendukung pertumbuhan usaha Anda',
} as const

/**
 * Wordmark mitra — ditulis sebagai teks bergaya (logo resmi tidak tersedia
 * via CDN publik). Ganti dengan asset logo resmi saat kemitraan terjalin.
 */
export const logisticsPartners = [
  { name: 'JNE', className: 'font-extrabold text-[#1a2f6e]' },
  { name: 'J&T Express', className: 'font-extrabold text-[#e30613]' },
  { name: 'SiCepat', className: 'font-extrabold text-[#0f4c81]' },
  { name: 'AnterAja', className: 'font-extrabold text-[#f26522]' },
] as const

export const paymentPartners = [
  { name: 'QRIS', className: 'font-extrabold text-[#c8102e]' },
  { name: 'BCA', className: 'font-extrabold text-[#01579b]' },
  { name: 'Mandiri', className: 'font-extrabold text-[#003366]' },
  { name: 'BRI', className: 'font-extrabold text-[#003d79]' },
  { name: 'COD', className: 'font-extrabold text-emerald-700' },
] as const
