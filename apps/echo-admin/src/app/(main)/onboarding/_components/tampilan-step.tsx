'use client'

import { Button } from '@levelupid/ui/components/button'
import { useOnboardingStore } from '../_store/onboarding-store'

export function TampilanStep({ onComplete }: { onComplete: () => void }) {
  const { markStepComplete } = useOnboardingStore()

  const handleSkip = () => {
    markStepComplete(3)
    onComplete()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Tampilan Toko</h2>
        <p className="text-sm text-muted-foreground">
          Pilih tema dan template untuk toko Anda
        </p>
      </div>

      <div className="rounded-lg border-2 border-dashed border-muted-foreground/50 p-12 text-center">
        <div className="space-y-4">
          <div className="mx-auto h-16 w-16 rounded-full bg-muted flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
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

      <div className="rounded-lg bg-muted p-4">
        <p className="text-sm font-medium">Apa yang akan datang:</p>
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
