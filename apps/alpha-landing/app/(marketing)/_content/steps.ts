export const steps = {
  badge: 'Proses Sederhana',
  titleLine1: 'Dari nol ke toko online,',
  titleLine2: '4 langkah saja.',
  subtitle: 'Tanpa pengetahuan teknis. Kami yang mengurus bagian rumitnya.',
} as const

export const stepItems = [
  {
    icon: 'user' as const,
    title: 'Daftar',
    body: 'Buat akun dalam hitungan detik. Cukup nama, email, dan nomor HP.',
  },
  {
    icon: 'palette' as const,
    title: 'Lengkapi data toko',
    body: 'Pilih tema, atur nama toko dan alamat web lewat wizard yang memandu.',
  },
  {
    icon: 'rocket' as const,
    title: 'Toko dibangun otomatis',
    body: 'Sistem menyiapkan website, database, dan keamanan. Anda tinggal tunggu sebentar.',
  },
  {
    icon: 'trend' as const,
    title: 'Mulai terima pesanan',
    body: 'Bagikan link toko ke pelanggan. Pesanan langsung masuk ke dashboard Anda.',
  },
]
