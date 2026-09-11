import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Syarat & Ketentuan',
  description: 'Syarat dan ketentuan penggunaan LevelUpID.',
}

/** Placeholder legal — copy final menunggu review sesuai UU PDP. */
export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
        Syarat &amp; Ketentuan
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Terakhir diperbarui: Agustus 2026
      </p>
      <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-slate-600">
        <p>
          Dokumen ini masih berupa placeholder. Naskah final sedang disusun dan
          akan mencakup ketentuan penggunaan layanan, hak dan kewajiban penjual
          serta pembeli, kebijakan pembayaran dan COD, hingga batasan tanggung
          jawab.
        </p>
        <p>
          Pertanyaan mengenai ketentuan ini dapat dikirim ke{' '}
          <a
            href="mailto:halo@levelupid.id"
            className="text-[var(--primary)] hover:underline"
          >
            halo@levelupid.id
          </a>
          .
        </p>
      </div>
    </div>
  )
}
