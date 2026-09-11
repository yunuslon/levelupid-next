export const analytics = {
  badge: 'Dashboard Penjualan',
  title: 'Pantau penjualan Anda secara real-time.',
  subtitle: 'Semua data penting toko tersaji ringkas di dashboard penjual.',
} as const

/** Angka mock untuk preview — akan hidup dari data tenant saat BE siap. */
export const statCards = [
  {
    label: 'Total Omzet',
    value: 'Rp 4,89 jt',
    trend: '+23,5%',
    rows: [
      { k: 'Hari ini', v: 'Rp 385 rb' },
      { k: 'Bulan ini', v: 'Rp 42 jt' },
      { k: 'Capaian target', v: '85%' },
    ],
  },
  {
    label: 'Total Pesanan',
    value: '12.485',
    trend: '+15,8%',
    rows: [
      { k: 'Menunggu', v: '127' },
      { k: 'Rata-rata/hari', v: '412' },
      { k: 'Capaian target', v: '78%' },
    ],
  },
  {
    label: 'Pelanggan',
    value: '9.847',
    trend: '+28,4%',
    rows: [
      { k: 'Baru hari ini', v: '+248' },
      { k: 'Retensi', v: '87,5%' },
      { k: 'Capaian target', v: '92%' },
    ],
  },
  {
    label: 'Produk Terjual',
    value: '23.410',
    trend: '+12,3%',
    rows: [
      { k: 'Minggu ini', v: '+1.204' },
      { k: 'Stok menipis', v: '18' },
      { k: 'Capaian target', v: '68%' },
    ],
  },
] as const

export const weeklyOrders = {
  title: 'Pesanan Mingguan',
  subtitle: 'Performa 7 hari terakhir',
  trend: '+18,5%',
  data: [
    { day: 'Min', orders: 420 },
    { day: 'Sen', orders: 610 },
    { day: 'Sel', orders: 680 },
    { day: 'Rab', orders: 740 },
    { day: 'Kam', orders: 720 },
    { day: 'Jum', orders: 860 },
    { day: 'Sab', orders: 790 },
  ],
} as const

export const salesByCategory = {
  title: 'Penjualan per Kategori',
  subtitle: 'Rincian performa produk',
  data: [
    { name: 'Fashion', value: 35, revenue: 'Rp 1,2 jt' },
    { name: 'Elektronik', value: 28, revenue: 'Rp 980 rb' },
    { name: 'Rumah Tangga', value: 18, revenue: 'Rp 620 rb' },
    { name: 'Kecantikan', value: 12, revenue: 'Rp 410 rb' },
    { name: 'Lainnya', value: 7, revenue: 'Rp 240 rb' },
  ],
} as const
