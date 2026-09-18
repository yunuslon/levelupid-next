'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@levelupid/ui/components/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@levelupid/ui/components/form'
import { Input } from '@levelupid/ui/components/input'

import { echoPut } from '@/lib/echo-client'
import { useOnboardingStore } from '../_store/onboarding-store'

const schema = z.object({
  currency: z
    .string()
    .refine(
      (value) => value.length === 0 || value.length === 3,
      'Gunakan kode mata uang 3 karakter',
    ),
  language: z
    .string()
    .refine(
      (value) => value.length === 0 || value.length >= 2,
      'Bahasa tidak valid',
    ),
  timezone: z.string(),
})

type FormData = z.infer<typeof schema>

export function PreferencesStep({ onComplete }: { onComplete: () => void }) {
  const { formData, updateField, markStepComplete } = useOnboardingStore()
  const [submitting, setSubmitting] = useState(false)
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      currency: formData.currency,
      language: formData.language,
      timezone: formData.timezone,
    },
  })

  const onSubmit = (data: FormData) => {
    setSubmitting(true)
    echoPut('wizard/step/5', data)
      .then(() => {
        updateField('currency', data.currency)
        updateField('language', data.language)
        updateField('timezone', data.timezone)
        markStepComplete(4)
        onComplete()
      })
      .catch((error) => form.setError('root', { message: error.message }))
      .finally(() => setSubmitting(false))
  }

  return (
    <div className="space-y-8 rounded-2xl border bg-card p-5 shadow-sm sm:p-8">
      <div className="space-y-2 border-b pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Langkah 5 dari 6
        </p>
        <h2 className="text-2xl font-bold tracking-tight">Preferensi Toko</h2>
        <p className="text-sm leading-6 text-muted-foreground">
          Tentukan pengaturan dasar untuk toko Anda.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mata uang</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bahasa</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="timezone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Timezone</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.formState.errors.root && (
            <p className="text-sm text-destructive">
              {form.formState.errors.root.message}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? 'Menyimpan...' : 'Lanjut ke Konfirmasi'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
