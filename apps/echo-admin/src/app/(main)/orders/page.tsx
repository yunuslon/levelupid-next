export default function OrdersPage() {
  return (
    <Placeholder
      title="Semua Pesanan"
      description="Manajemen pesanan akan tersedia setelah endpoint pesanan siap."
    />
  )
}

function Placeholder({
  title,
  description,
}: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border bg-card p-8">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="mt-2 text-muted-foreground">{description}</p>
      <span className="mt-6 inline-flex rounded-full border px-3 py-1 text-xs text-muted-foreground">
        Segera hadir
      </span>
    </div>
  )
}
