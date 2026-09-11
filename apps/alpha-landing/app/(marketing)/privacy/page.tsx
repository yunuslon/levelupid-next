import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kebijakan Privasi',
  description: 'Kebijakan privasi LevelUpID.',
}

/** Placeholder legal — naskah final mengikuti kewajiban UU PDP. */
export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
        Kebijakan Privasi
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Terakhir diperbarui: Agustus 2026
      </p>
      <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-slate-600">
        <p>
          Dokumen ini masih berupa placeholder. Naskah final sedang disusun dan
          akan menjelaskan data apa yang kami kumpulkan, cara penyimpanan dan
          penggunaannya, masa retensi, serta hak Anda atas data pribadi sesuai
          UU Pelindungan Data Pribadi.
        </p>
        <p>
          Pertanyaan mengenai privasi dapat dikirim ke{' '}
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
