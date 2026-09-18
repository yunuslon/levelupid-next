'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import type { EchoWizardOptions } from '@levelupid/types'
import { Button } from '@levelupid/ui/components/button'
import {
  Form,
  FormControl,
  FormDescription,
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
import { Textarea } from '@levelupid/ui/components/textarea'

import { echoPut } from '@/lib/echo-client'
import { useOnboardingStore } from '../_store/onboarding-store'

const identitasSchema = z.object({
  storeName: z.string().min(3, 'Nama toko minimal 3 karakter'),
  businessCategory: z.string(),
  description: z.string().max(500).optional(),
  tagline: z.string().max(100).optional(),
})

type IdentitasFormData = z.infer<typeof identitasSchema>

export function IdentitasStep({
  onComplete,
  options,
}: { onComplete: () => void; options: EchoWizardOptions }) {
  const { formData, updateField, markStepComplete } = useOnboardingStore()
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<IdentitasFormData>({
    resolver: zodResolver(identitasSchema),
    defaultValues: {
      storeName: formData.storeName,
      businessCategory: formData.businessCategory,
      description: formData.description,
      tagline: formData.tagline,
    },
  })

  const onSubmit = (data: IdentitasFormData) => {
    setSubmitting(true)
    echoPut('wizard/step/1', {
      store_name: data.storeName,
      ...(data.businessCategory
        ? { category_id: Number(data.businessCategory) }
        : {}),
      description: data.description || null,
      tagline: data.tagline || null,
    })
      .then(() => {
        updateField('storeName', data.storeName)
        updateField('businessCategory', data.businessCategory)
        updateField('description', data.description || '')
        updateField('tagline', data.tagline || '')
        markStepComplete(0)
        onComplete()
      })
      .catch((error) => form.setError('root', { message: error.message }))
      .finally(() => setSubmitting(false))
  }

  return (
    <div className="space-y-8 rounded-2xl border bg-card p-5 shadow-sm sm:p-8">
      <div className="space-y-2 border-b pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Langkah 1 dari 5
        </p>
        <h2 className="text-2xl font-bold tracking-tight">Identitas Toko</h2>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
          Berikan informasi dasar tentang toko Anda
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="storeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Toko *</FormLabel>
                <FormControl>
                  <Input placeholder="Contoh: Toko ABC" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="businessCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategori Usaha</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  items={options.categories.map((category) => ({
                    value: String(category.id),
                    label: category.name,
                  }))}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="min-w-3xs p-2">
                    {options.categories.map((category) => (
                      <SelectItem key={category.id} value={String(category.id)}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Jelaskan tentang toko Anda..."
                    className="resize-none"
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormDescription>Maksimal 500 karakter</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tagline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tagline</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Contoh: Kualitas Terbaik, Harga Terjangkau"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Slogan singkat toko Anda (maksimal 100 karakter)
                </FormDescription>
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
            {submitting ? 'Menyimpan...' : 'Lanjut ke Kontak'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
