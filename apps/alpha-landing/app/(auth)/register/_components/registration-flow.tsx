'use client'

import {
  CircleCheckBig,
  CreditCard,
  Globe,
  Lock,
  MailCheck,
  Wallet,
} from 'lucide-react'
import { useState } from 'react'
import { resendVerification } from '../../../_actions/resend'
import { RegisterForm } from './register-form'

type Step = 'form' | 'check-email' | 'verified'

const benefits = [
  { icon: Globe, text: 'Subdomain gratis, bisa domain sendiri' },
  { icon: Wallet, text: 'Terima transfer, QRIS, dan COD' },
  { icon: Lock, text: 'Data pelanggan tersimpan milik Anda' },
]

export function RegistrationFlow() {
  const [step, setStep] = useState<Step>('form')
  const [submittedEmail, setSubmittedEmail] = useState('')

  return (
    <div className="grid  lg:grid-cols-2">
      <div className="flex items-center justify-center px-4 py-12 lg:py-16">
        <div className="w-full max-w-md">
          {step === 'form' && (
            <RegisterForm
              onSuccess={(email) => {
                setSubmittedEmail(email)
                setStep('check-email')
              }}
            />
          )}
          {step === 'check-email' && <CheckEmailStep email={submittedEmail} />}
          {step === 'verified' && <VerifiedStep />}
        </div>
      </div>

      <aside className="hidden border-l bg-[var(--muted)]/40 p-10 lg:flex lg:flex-col lg:justify-center">
        <div className="max-w-md">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            Yang Anda dapatkan setelah mendaftar
          </h2>
          <ul className="mt-8 space-y-5">
            {benefits.map((b) => (
              <li key={b.text} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                  <b.icon className="size-4" />
                </span>
                <span className="pt-1.5 text-sm font-medium">{b.text}</span>
              </li>
            ))}
          </ul>
          <p className="mt-10 flex items-center gap-2 rounded-lg border bg-[var(--card)] px-4 py-3 text-xs text-[var(--muted-foreground)]">
            <CreditCard className="size-4 shrink-0" />
            Tanpa kartu kredit. Gratis untuk memulai.
          </p>
        </div>
      </aside>
    </div>
  )
}

function CheckEmailStep({ email }: { email: string }) {
  const [resendState, setResendState] = useState<
    'idle' | 'sending' | 'sent' | 'error'
  >('idle')
  const [resendMessage, setResendMessage] = useState<string | null>(null)

  async function handleResend() {
    setResendState('sending')
    const result = await resendVerification(email)
    if (result.ok) {
      setResendState('sent')
      setResendMessage(result.message ?? 'Tautan verifikasi dikirim ulang.')
    } else {
      setResendState('error')
      setResendMessage(result.message ?? 'Gagal mengirim ulang.')
    }
  }

  return (
    <div className="animate-rise-in text-center sm:text-left">
      <span className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)] sm:mx-0">
        <MailCheck className="size-7" />
      </span>
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        Cek email Anda
      </h1>
      <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-[var(--muted-foreground)]">
        Kami mengirim tautan verifikasi ke{' '}
        <strong className="font-semibold text-[var(--foreground)]">
          {email}
        </strong>
        . Tautan berlaku 24 jam.
      </p>

      {resendMessage && (
        <p
          className={`mt-4 rounded-lg px-4 py-2.5 text-sm ${
            resendState === 'sent'
              ? 'border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)]'
              : 'border border-[var(--destructive)]/30 bg-[var(--destructive)]/10 text-[var(--destructive)]'
          }`}
        >
          {resendMessage}
        </p>
      )}

      <div className="mt-8 flex flex-col gap-2">
        <button
          type="button"
          onClick={handleResend}
          disabled={resendState === 'sending'}
          className="inline-flex h-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] px-6 text-sm font-medium transition-colors hover:bg-[var(--muted)] disabled:opacity-50"
        >
          {resendState === 'sending' ? 'Mengirim...' : 'Kirim ulang tautan'}
        </button>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex h-11 items-center justify-center rounded-full text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
        >
          Saya sudah verifikasi
        </button>
      </div>
    </div>
  )
}

function VerifiedStep() {
  return (
    <div className="animate-rise-in text-center sm:text-left">
      <span className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)] sm:mx-0">
        <CircleCheckBig className="size-7" />
      </span>
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        Email terverifikasi!
      </h1>
      <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-[var(--muted-foreground)]">
        Akun Anda aktif. Langkah selanjutnya masuk ke dashboard penjual untuk
        melengkapi toko Anda.
      </p>
      <div className="mt-8">
        <button
          type="button"
          disabled
          title="Dashboard penjual segera hadir"
          className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--primary)] px-8 text-[15px] font-medium text-white opacity-50"
        >
          Masuk ke Dashboard Penjual
        </button>
        <p className="mt-3 text-xs text-[var(--muted-foreground)]">
          Dashboard penjual segera hadir.
        </p>
      </div>
    </div>
  )
}
