export const features = {
  badge: 'Fitur Unggulan',
  titleLine1: 'Semua yang Anda butuhkan,',
  titleLine2: 'dalam satu tempat.',
  subtitle:
    'Dirancang untuk penjual kecil yang ingin fokus pada usaha, bukan pada teknologi.',
} as const

export interface FeatureItem {
  icon: 'truck' | 'box' | 'chart' | 'monitor' | 'wallet' | 'palette'
  title: string
  body: string
  bullets: string[]
}

export const featureItems: FeatureItem[] = [
  {
    icon: 'wallet',
    title: 'Pembayaran Lengkap',
    body: 'Terima pembayaran dengan cara yang paling nyaman bagi pelanggan Anda.',
    bullets: [
      'Transfer manual + konfirmasi',
      'QRIS statis',
      'COD (bayar di tempat)',
    ],
  },
  {
    icon: 'truck',
    title: 'Pengiriman Simpel',
    body: 'Hubungkan toko Anda dengan kurir-kurir utama Indonesia.',
    bullets: ['Integrasi Biteship', 'Ongkir real-time', 'Cetak label otomatis'],
  },
  {
    icon: 'box',
    title: 'Produk & Stok',
    body: 'Kelola katalog dan stok tanpa drama, langsung dari HP Anda.',
    bullets: [
      'Varian & harga per varian',
      'Peringatan stok menipis',
      'Import CSV dari marketplace',
    ],
  },
  {
    icon: 'chart',
    title: 'Laporan Penjualan',
    body: 'Pantau performa toko kapan saja dengan data yang mudah dipahami.',
    bullets: ['Ringkasan harian', 'Produk terlaris', 'Riwayat pelanggan'],
  },
  {
    icon: 'monitor',
    title: 'Tampilan Responsif',
    body: 'Toko Anda tampil rapi di semua perangkat pelanggan.',
    bullets: [
      'Mobile-first',
      'Cepat di jaringan 4G',
      'Siap dibagikan ke WhatsApp',
    ],
  },
  {
    icon: 'palette',
    title: 'Kustomisasi Toko',
    body: 'Sesuaikan tampilan toko agar mencerminkan karakter usaha Anda.',
    bullets: ['Pilihan tema', 'Logo & warna sendiri', 'Domain sendiri'],
  },
]
