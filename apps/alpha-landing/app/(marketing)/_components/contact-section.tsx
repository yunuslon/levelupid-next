'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Mail } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { submitLead } from '../../_actions/leads'
import { useReveal } from '../../_hooks/use-reveal'
import { contact, faqSupport } from '../_content/cta'
import { site } from '../_content/site'

const contactSchema = z.object({
  fullName: z.string().min(3, 'Minimal 3 karakter'),
  email: z.string().email('Email tidak valid'),
  phone: z
    .string()
    .min(9, 'Nomor HP tidak valid')
    .regex(/^[0-9+\-\s]+$/, 'Hanya angka'),
  businessName: z.string().optional(),
  message: z.string().min(10, 'Min. 10 karakter'),
})

type ContactValues = z.infer<typeof contactSchema>

const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--ring)]/20 aria-invalid:border-red-400'

export function ContactSection() {
  const leftRef = useReveal<HTMLDivElement>()
  const formRef = useReveal<HTMLFormElement>()
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      businessName: '',
      message: '',
    },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    setServerError(null)
    const result = await submitLead({
      full_name: values.fullName,
      email: values.email,
      phone: values.phone,
      message: values.message,
      company_name: values.businessName,
    })
    if (result.ok) {
      setSuccess(true)
      form.reset()
    } else {
      setServerError(result.message ?? 'Terjadi kesalahan')
    }
  })

  return (
    <section
      id="kontak"
      className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 lg:py-28"
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div ref={leftRef} className="reveal">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            {contact.heading}
          </h2>
          <p className="mt-4 max-w-[46ch] leading-relaxed text-slate-600">
            {contact.body}
          </p>
          <a
            href={`mailto:${site.contactEmail}`}
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:underline"
          >
            <Mail className="size-4" />
            {site.contactEmail}
          </a>
        </div>

        <form
          ref={formRef}
          onSubmit={onSubmit}
          noValidate
          className="reveal rounded-xl border bg-white p-6 sm:p-8"
        >
          {success ? (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <Mail className="size-6" />
              </span>
              <p className="font-semibold">Pesan terkirim!</p>
              <p className="text-sm text-slate-600">
                Tim kami akan membalas dalam satu hari kerja.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="ct-name" className="text-sm font-medium">
                    Nama lengkap
                  </label>
                  <input
                    {...form.register('fullName')}
                    id="ct-name"
                    placeholder="Nama Anda"
                    className={inputClass}
                    aria-invalid={!!form.formState.errors.fullName}
                  />
                  {form.formState.errors.fullName && (
                    <p className="text-xs text-red-500">
                      {form.formState.errors.fullName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="ct-biz" className="text-sm font-medium">
                    Nama usaha{' '}
                    <span className="text-slate-400">(opsional)</span>
                  </label>
                  <input
                    {...form.register('businessName')}
                    id="ct-biz"
                    placeholder="Contoh: Dapur Nusantara"
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="ct-email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    {...form.register('email')}
                    id="ct-email"
                    type="email"
                    placeholder="nama@email.com"
                    className={inputClass}
                    aria-invalid={!!form.formState.errors.email}
                  />
                  {form.formState.errors.email && (
                    <p className="text-xs text-red-500">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="ct-phone" className="text-sm font-medium">
                    No. HP
                  </label>
                  <input
                    {...form.register('phone')}
                    id="ct-phone"
                    type="tel"
                    placeholder="08xx xxxx xxxx"
                    className={inputClass}
                    aria-invalid={!!form.formState.errors.phone}
                  />
                  {form.formState.errors.phone && (
                    <p className="text-xs text-red-500">
                      {form.formState.errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="ct-msg" className="text-sm font-medium">
                  Pertanyaan Anda
                </label>
                <textarea
                  {...form.register('message')}
                  id="ct-msg"
                  rows={4}
                  placeholder="Tulis pertanyaan atau kebutuhan usaha Anda"
                  className={`${inputClass} resize-y`}
                  aria-invalid={!!form.formState.errors.message}
                />
                {form.formState.errors.message && (
                  <p className="text-xs text-red-500">
                    {form.formState.errors.message.message}
                  </p>
                )}
              </div>
              {serverError && (
                <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                  {serverError}
                </p>
              )}
              <button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-8 text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50 sm:w-auto"
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="size-4 animate-spin" />
                )}
                Kirim Pesan
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
