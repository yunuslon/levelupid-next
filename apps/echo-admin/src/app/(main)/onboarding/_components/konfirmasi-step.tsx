'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@levelupid/ui/components/button'
import { useOnboardingStore } from '../_store/onboarding-store'

const CATEGORY_LABELS: Record<string, string> = {
  fashion: 'Fashion & Apparel',
  food: 'Food & Beverage',
  electronics: 'Electronics',
  home: 'Home & Garden',
  beauty: 'Beauty & Personal Care',
  automotive: 'Automotive',
  other: 'Lainnya',
}

export function KonfirmasiStep() {
  const router = useRouter()
  const { formData, markStepComplete } = useOnboardingStore()
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    setSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    markStepComplete(4)
    document.cookie = 'echo_onboarded=true; path=/; max-age=31536000'
    router.push('/dashboard/default')
  }

  const items = [
    { label: 'Nama Toko', value: formData.storeName },
    {
      label: 'Kategori',
      value: CATEGORY_LABELS[formData.businessCategory] || '-',
    },
    { label: 'Deskripsi', value: formData.description || '-' },
    { label: 'Tagline', value: formData.tagline || '-' },
    { label: 'Email', value: formData.email },
    { label: 'Telepon', value: formData.phone },
    { label: 'WhatsApp', value: formData.whatsapp || '-' },
    { label: 'Alamat', value: formData.address },
    { label: 'URL Toko', value: `https://${formData.subdomain}.levelupid.com` },
  ]

  return (
    <div className="space-y-8 rounded-2xl border bg-card p-5 shadow-sm sm:p-8">
      <div className="space-y-2 border-b pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Langkah 5 dari 5
        </p>
        <h2 className="text-2xl font-bold tracking-tight">Konfirmasi</h2>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
          Periksa kembali informasi toko Anda sebelum menyimpan
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border">
        <div className="divide-y">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-1 px-4 py-3.5 sm:flex-row sm:justify-between sm:gap-4"
            >
              <span className="text-sm text-muted-foreground">
                {item.label}
              </span>
              <span className="text-sm font-medium text-right max-w-[60%] break-words">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-muted/60 p-5">
        <p className="text-sm text-muted-foreground">
          Dengan menekan tombol di bawah, Anda menyetujui untuk membuat toko
          dengan informasi di atas. Anda dapat mengubah informasi ini nanti di
          pengaturan.
        </p>
      </div>

      <Button onClick={handleSubmit} className="w-full" disabled={submitting}>
        {submitting ? 'Menyimpan...' : 'Buat Toko Saya'}
      </Button>
    </div>
  )
}
