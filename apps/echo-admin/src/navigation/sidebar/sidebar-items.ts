import {
  Boxes,
  CircleDollarSign,
  ClipboardList,
  Clock3,
  LayoutDashboard,
  type LucideIcon,
  MessageCircle,
  PackageCheck,
  PackageOpen,
  ShoppingBag,
  Tags,
  Warehouse,
  XCircle,
} from 'lucide-react'

export type NavBadge = 'new' | 'soon'

export interface NavSubItem {
  id: string
  title: string
  url: string
  icon?: LucideIcon
  badge?: NavBadge
  disabled?: boolean
  newTab?: boolean
}

interface NavItemBase {
  id: string
  title: string
  icon?: LucideIcon
  badge?: NavBadge
  disabled?: boolean
  newTab?: boolean
}

export interface NavMainLinkItem extends NavItemBase {
  url: string
  subItems?: never
}

export interface NavMainParentItem extends NavItemBase {
  subItems: NavSubItem[]
}

export type NavMainItem = NavMainLinkItem | NavMainParentItem

export interface NavGroup {
  id: number
  label?: string
  items: NavMainItem[]
}

const comingSoon = { badge: 'soon' as const, disabled: true }

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    items: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        url: '/dashboard/default',
        icon: LayoutDashboard,
      },
    ],
  },
  {
    id: 2,
    label: 'Manajemen Produk',
    items: [
      {
        id: 'products',
        title: 'Manajemen Produk',
        icon: ShoppingBag,
        subItems: [
          {
            id: 'product-list',
            title: 'Daftar Produk',
            url: '/products',
            icon: Boxes,
            ...comingSoon,
          },
          {
            id: 'product-categories',
            title: 'Kategori Produk',
            url: '/products/categories',
            icon: Tags,
            ...comingSoon,
          },
          {
            id: 'product-stock',
            title: 'Manajemen Stok',
            url: '/products/stock',
            icon: Warehouse,
            ...comingSoon,
          },
          {
            id: 'product-collections',
            title: 'Etalase & Koleksi',
            url: '/products/collections',
            icon: PackageOpen,
            ...comingSoon,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    label: 'Manajemen Pesanan',
    items: [
      {
        id: 'orders',
        title: 'Manajemen Pesanan',
        icon: ClipboardList,
        subItems: [
          {
            id: 'all-orders',
            title: 'Semua Pesanan',
            url: '/orders',
            icon: ClipboardList,
            ...comingSoon,
          },
          {
            id: 'pending-payment',
            title: 'Menunggu Pembayaran',
            url: '/orders/pending-payment',
            icon: Clock3,
            ...comingSoon,
          },
          {
            id: 'payment-verification',
            title: 'Verifikasi Pembayaran',
            url: '/orders/payment-verification',
            icon: CircleDollarSign,
            ...comingSoon,
          },
          {
            id: 'packed',
            title: 'Dikemas',
            url: '/orders/packed',
            icon: PackageCheck,
            ...comingSoon,
          },
          {
            id: 'completed-cancelled',
            title: 'Selesai & Dibatalkan',
            url: '/orders/completed-cancelled',
            icon: XCircle,
            ...comingSoon,
          },
          {
            id: 'complaints-chat',
            title: 'Komplain & Chat',
            url: '/orders/complaints',
            icon: MessageCircle,
            ...comingSoon,
          },
        ],
      },
    ],
  },
]
