'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Checkbox } from '@levelupid/ui/components/checkbox'
import { ArrowLeft, FileText, Loader2, Send, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { signupCta } from '../../../(marketing)/_content/site'
import { registerTenant } from '../../../_actions/register'

const registerSchema = z.object({
  fullName: z.string().min(3, 'Minimal 3 karakter'),
  email: z.string().email('Email tidak valid'),
  phone: z
    .string()
    .min(9, 'Nomor HP tidak valid')
    .regex(/^[0-9+\-\s]+$/, 'Hanya angka'),
  password: z.string().min(8, 'Minimal 8 karakter'),
  agreeTerms: z.literal(true, {
    message: 'Anda harus menyetujui syarat & ketentuan',
  }),
})

export type RegisterValues = z.infer<typeof registerSchema>

const inputClass =
  'h-10 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none placeholder:text-[var(--muted-foreground)] transition-colors focus:border-[var(--ring)] focus:ring-2 focus:ring-[var(--ring)]/30 aria-invalid:border-[var(--destructive)]'

export function RegisterForm({
  onSuccess,
}: {
  onSuccess: (email: string) => void
}) {
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      agreeTerms: false as never,
    },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    const result = await registerTenant({
      full_name: values.fullName,
      email: values.email,
      phone: values.phone,
      password: values.password,
      password_confirmation: values.password,
    })
    if (result.ok) {
      onSuccess(values.email)
    } else {
      if (result.errors) {
        const fieldMap: Record<string, keyof RegisterValues> = {
          full_name: 'fullName',
          email: 'email',
          phone: 'phone',
          password: 'password',
        }
        for (const [key, msg] of Object.entries(result.errors)) {
          const mapped = fieldMap[key] ?? (key as keyof RegisterValues)
          form.setError(mapped, { message: msg })
        }
      } else {
        form.setError('root', {
          message: result.message ?? 'Terjadi kesalahan',
        })
      }
    }
  })

  return (
    <div className="animate-rise-in">
      <Link
        href="/"
        className="mb-6 -ml-2 inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
      >
        <ArrowLeft className="size-4" />
        Kembali ke beranda
      </Link>

      <h1 className="font-display text-3xl font-semibold tracking-tight">
        Buat akun Anda
      </h1>
      <p className="mt-2 text-sm text-[var(--muted-foreground)]">
        Satu menit isi form, toko online Anda langsung diproses.
      </p>

      <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5">
        <div className="space-y-1.5">
          <label htmlFor="rg-name" className="text-sm font-medium">
            Nama lengkap
          </label>
          <input
            {...form.register('fullName')}
            id="rg-name"
            autoComplete="name"
            placeholder="Nama Anda"
            className={inputClass}
            aria-invalid={!!form.formState.errors.fullName}
          />
          {form.formState.errors.fullName && (
            <p className="text-xs text-[var(--destructive)]">
              {form.formState.errors.fullName.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="rg-email" className="text-sm font-medium">
            Email
          </label>
          <input
            {...form.register('email')}
            id="rg-email"
            type="email"
            autoComplete="email"
            placeholder="nama@email.com"
            className={inputClass}
            aria-invalid={!!form.formState.errors.email}
          />
          {form.formState.errors.email && (
            <p className="text-xs text-[var(--destructive)]">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="rg-phone" className="text-sm font-medium">
            No. HP
          </label>
          <input
            {...form.register('phone')}
            id="rg-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="08xx xxxx xxxx"
            className={inputClass}
            aria-invalid={!!form.formState.errors.phone}
          />
          {form.formState.errors.phone && (
            <p className="text-xs text-[var(--destructive)]">
              {form.formState.errors.phone.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="rg-pass" className="text-sm font-medium">
            Password
          </label>
          <input
            {...form.register('password')}
            id="rg-pass"
            type="password"
            autoComplete="new-password"
            placeholder="Minimal 8 karakter"
            className={inputClass}
            aria-invalid={!!form.formState.errors.password}
          />
          {form.formState.errors.password && (
            <p className="text-xs text-[var(--destructive)]">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        <Controller
          control={form.control}
          name="agreeTerms"
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <div className="flex items-start gap-2.5">
                <Checkbox
                  id="rg-terms"
                  checked={Boolean(field.value)}
                  onCheckedChange={(v) => field.onChange(v)}
                  aria-invalid={fieldState.invalid}
                  className="mt-0.5 size-4 shrink-0 rounded-[4px] border-[var(--input)] text-white data-checked:border-[var(--primary)] data-checked:bg-[var(--primary)] focus-visible:border-[var(--ring)] focus-visible:ring-[var(--ring)]/50 [&_[data-slot=checkbox-indicator]>svg]:!size-3"
                />
                <label
                  htmlFor="rg-terms"
                  className="min-w-0 cursor-pointer text-sm font-normal leading-snug"
                >
                  Saya menyetujui perjanjian penggunaan layanan.
                </label>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pl-[26px] pt-1 text-xs">
                <Link
                  href="/terms"
                  className="inline-flex items-center gap-1.5 rounded px-1 py-0.5 text-[var(--muted-foreground)] transition-colors hover:text-[var(--primary)] hover:underline"
                >
                  <FileText className="size-3 shrink-0" />
                  Syarat & Ketentuan
                </Link>
                <Link
                  href="/privacy"
                  className="inline-flex items-center gap-1.5 rounded px-1 py-0.5 text-[var(--muted-foreground)] transition-colors hover:text-[var(--primary)] hover:underline"
                >
                  <ShieldCheck className="size-3 shrink-0" />
                  Kebijakan Privasi
                </Link>
              </div>
              {fieldState.error && (
                <p className="text-xs text-[var(--destructive)]">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />

        {form.formState.errors.root && (
          <p className="rounded-lg border border-[var(--destructive)]/30 bg-[var(--destructive)]/10 px-4 py-3 text-sm text-[var(--destructive)]">
            {form.formState.errors.root.message}
          </p>
        )}

        <div>
          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[var(--primary)] text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {form.formState.isSubmitting && (
              <Loader2 className="size-4 animate-spin" />
            )}
            {signupCta}
          </button>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-[var(--muted-foreground)]">
            <Send className="size-3" />
            Verifikasi via email. Tanpa kartu kredit.
          </p>
        </div>
      </form>
    </div>
  )
}
