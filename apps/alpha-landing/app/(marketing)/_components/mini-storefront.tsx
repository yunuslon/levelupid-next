import { ShoppingBag, Star } from 'lucide-react'

const products = [
  {
    name: 'Kopi Gayo Arabika 250g',
    price: 'Rp 68.000',
    img: 'https://picsum.photos/seed/kopi-gayo/320/240',
  },
  {
    name: 'Kerajinan Bambu Sumpit',
    price: 'Rp 32.500',
    img: 'https://picsum.photos/seed/bambu-kerajinan/320/240',
  },
  {
    name: 'Batik Tulis Pekalongan',
    price: 'Rp 215.000',
    img: 'https://picsum.photos/seed/batik-tulis/320/240',
  },
]

/**
 * Preview storefront — presentational. Tampil di dalam .browser-frame
 * (frame-nya disediakan parent).
 */
export function MiniStorefront() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
            <ShoppingBag className="size-4" />
          </span>
          <div className="text-left leading-tight">
            <p className="text-sm font-semibold">Dapur Nusantara</p>
            <p className="text-[11px] text-slate-500">Oleh Ratna Wijaya</p>
          </div>
        </div>
        <span className="rounded-full border border-[var(--primary)]/20 bg-mint px-2.5 py-0.5 text-xs font-medium text-[var(--primary)]">
          Buka
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 p-3">
        {products.map((p) => (
          <figure key={p.name} className="overflow-hidden rounded-lg border">
            <img
              src={p.img}
              alt={p.name}
              width={320}
              height={240}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
            <figcaption className="space-y-0.5 p-2">
              <p className="line-clamp-1 text-[11px] font-medium">{p.name}</p>
              <p className="text-[11px] text-slate-500">{p.price}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="flex items-center justify-between gap-2 border-t bg-mint-soft px-4 py-3">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
          <Star className="size-3 fill-amber-400 text-amber-400" />
          <span>4,9 dari 128 ulasan</span>
        </div>
        <button
          type="button"
          className="rounded-full bg-[var(--primary)] px-4 py-1.5 text-xs font-medium text-white"
        >
          Beli Sekarang
        </button>
      </div>
    </div>
  )
}
