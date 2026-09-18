'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { echoPost } from '@/lib/echo-client'
import type { EchoWizardOptions } from '@levelupid/types'
import { Button } from '@levelupid/ui/components/button'
import { useOnboardingStore } from '../_store/onboarding-store'

export function KonfirmasiStep({ options }: { options: EchoWizardOptions }) {
  const router = useRouter()
  const { formData, markStepComplete } = useOnboardingStore()
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async () => {
    setSubmitting(true)
    setErrorMessage('')
    try {
      const result = await echoPost<{ domain: string }>('wizard/finish')
      markStepComplete(5)
      router.push(
        `/dashboard/default?provisioning_domain=${encodeURIComponent(result.domain)}`,
      )
      router.refresh()
    } catch (error) {
      setSubmitting(false)
      setErrorMessage(
        error instanceof Error ? error.message : 'Toko belum dapat dibuat.',
      )
    }
  }

  const items = [
    { label: 'Nama Toko', value: formData.storeName },
    {
      label: 'Kategori',
      value:
        options.categories.find(
          (category) => String(category.id) === formData.businessCategory,
        )?.name || '-',
    },
    { label: 'Deskripsi', value: formData.description || '-' },
    { label: 'Tagline', value: formData.tagline || '-' },
    { label: 'Email', value: formData.email },
    { label: 'Telepon', value: formData.phone },
    { label: 'WhatsApp', value: formData.whatsapp || '-' },
    { label: 'Alamat', value: formData.address },
    { label: 'Subdomain', value: formData.subdomain },
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

      {errorMessage && (
        <p className="text-sm text-destructive">{errorMessage}</p>
      )}
      <Button onClick={handleSubmit} className="w-full" disabled={submitting}>
        {submitting ? 'Menyimpan...' : 'Buat Toko Saya'}
      </Button>
    </div>
  )
}
