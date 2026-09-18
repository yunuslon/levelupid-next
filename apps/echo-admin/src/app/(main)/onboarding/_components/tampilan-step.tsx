'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import type { EchoWizardOptions } from '@levelupid/types'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@levelupid/ui/components/select'

import { echoPut } from '@/lib/echo-client'
import { useOnboardingStore } from '../_store/onboarding-store'

const schema = z.object({
  themeId: z.string(),
  primaryColor: z.union([
    z.literal(''),
    z.string().regex(/^#[0-9A-F]{6}$/i, 'Gunakan format warna hex'),
  ]),
  secondaryColor: z.union([
    z.literal(''),
    z.string().regex(/^#[0-9A-F]{6}$/i, 'Gunakan format warna hex'),
  ]),
})

type FormData = z.infer<typeof schema>

export function TampilanStep({
  onComplete,
  options,
}: {
  onComplete: () => void
  options: EchoWizardOptions
}) {
  const { formData, updateField, markStepComplete } = useOnboardingStore()
  const [submitting, setSubmitting] = useState(false)
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      themeId: formData.themeId?.toString() ?? '',
      primaryColor: formData.primaryColor || '#2563EB',
      secondaryColor: formData.secondaryColor || '#0F172A',
    },
  })

  const onSubmit = (data: FormData) => {
    setSubmitting(true)
    echoPut('wizard/step/4', {
      ...(data.themeId ? { theme_id: Number(data.themeId) } : {}),
      ...(data.primaryColor ? { primary_color: data.primaryColor } : {}),
      ...(data.secondaryColor ? { secondary_color: data.secondaryColor } : {}),
    })
      .then(() => {
        updateField('themeId', Number(data.themeId))
        updateField('primaryColor', data.primaryColor)
        updateField('secondaryColor', data.secondaryColor)
        markStepComplete(3)
        onComplete()
      })
      .catch((error) => form.setError('root', { message: error.message }))
      .finally(() => setSubmitting(false))
  }

  return (
    <div className="space-y-8 rounded-2xl border bg-card p-5 shadow-sm sm:p-8">
      <div className="space-y-2 border-b pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Langkah 4 dari 6
        </p>
        <h2 className="text-2xl font-bold tracking-tight">Tampilan Toko</h2>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
          Pilih tema dan warna dasar toko Anda.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="themeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tema</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  items={options.themes.map((theme) => ({
                    value: String(theme.id),
                    label: theme.name,
                  }))}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tema" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {options.themes.map((theme) => (
                      <SelectItem key={theme.id} value={String(theme.id)}>
                        {theme.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="primaryColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Warna utama</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="#2563EB" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="secondaryColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Warna sekunder</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="#0F172A" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {form.formState.errors.root && (
            <p className="text-sm text-destructive">
              {form.formState.errors.root.message}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? 'Menyimpan...' : 'Lanjut ke Preferensi'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
