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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Konfirmasi</h2>
        <p className="text-sm text-muted-foreground">
          Periksa kembali informasi toko Anda sebelum menyimpan
        </p>
      </div>

      <div className="rounded-lg border">
        <div className="divide-y">
          {items.map((item) => (
            <div key={item.label} className="flex justify-between px-4 py-3">
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

      <div className="rounded-lg bg-muted p-4">
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
