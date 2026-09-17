'use client'

import { Button } from '@levelupid/ui/components/button'
import { Palette } from 'lucide-react'
import { useOnboardingStore } from '../_store/onboarding-store'

export function TampilanStep({ onComplete }: { onComplete: () => void }) {
  const { markStepComplete } = useOnboardingStore()

  const handleSkip = () => {
    markStepComplete(3)
    onComplete()
  }

  return (
    <div className="space-y-8 rounded-2xl border bg-card p-5 shadow-sm sm:p-8">
      <div className="space-y-2 border-b pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Langkah 4 dari 5
        </p>
        <h2 className="text-2xl font-bold tracking-tight">Tampilan Toko</h2>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
          Pilih tema dan template untuk toko Anda
        </p>
      </div>

      <div className="rounded-xl border border-dashed border-primary/30 bg-primary/[0.03] p-8 text-center sm:p-12">
        <div className="space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Palette className="h-8 w-8" strokeWidth={1.7} />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Fitur Ini Segera Hadir</h3>
            <p className="text-sm text-muted-foreground">
              Theme builder akan tersedia dalam pembaruan mendatang. Untuk saat
              ini, toko Anda akan menggunakan template default.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-muted/60 p-5">
        <p className="text-sm font-semibold">Apa yang akan datang</p>
        <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
          <li>✓ Pilih template per kategori usaha</li>
          <li>✓ Ubah warna dan font</li>
          <li>✓ Upload logo dan banner</li>
          <li>✓ Preview langsung di dashboard</li>
        </ul>
      </div>

      <Button onClick={handleSkip} className="w-full">
        Lanjut ke Konfirmasi
      </Button>
    </div>
  )
}
