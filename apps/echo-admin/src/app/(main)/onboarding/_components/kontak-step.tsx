'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { type ControllerRenderProps, useForm } from 'react-hook-form'
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
import { Textarea } from '@levelupid/ui/components/textarea'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@levelupid/ui/components/select'
import { useEffect } from 'react'
import { CITIES_BY_PROVINCE, PROVINCES } from '../_data/indonesia-regions'
import { useOnboardingStore } from '../_store/onboarding-store'

const kontakSchema = z.object({
  email: z.string().email('Email tidak valid'),
  phone: z.string().min(10, 'No. telepon minimal 10 digit'),
  whatsapp: z.string().optional(),
  address: z.string().min(10, 'Alamat minimal 10 karakter'),
  province: z.string().min(1, 'Pilih provinsi'),
  city: z.string().min(1, 'Pilih kota/kabupaten'),
  postalCode: z.string().regex(/^\d{5}$/, 'Kode pos harus 5 digit angka'),
})

type KontakFormData = z.infer<typeof kontakSchema>

export function KontakStep({ onComplete }: { onComplete: () => void }) {
  const { formData, updateField, markStepComplete } = useOnboardingStore()

  const form = useForm<KontakFormData>({
    resolver: zodResolver(kontakSchema),
    defaultValues: {
      email: formData.email,
      phone: formData.phone,
      whatsapp: formData.whatsapp,
      address: formData.address,
      city: formData.city,
      province: formData.province,
      postalCode: formData.postalCode,
    },
  })

  const selectedProvince = form.watch('province')
  const availableCities = selectedProvince
    ? CITIES_BY_PROVINCE[selectedProvince] || []
    : []

  useEffect(() => {
    if (selectedProvince) {
      form.setValue('city', '')
    }
  }, [selectedProvince, form])

  const onSubmit = (data: KontakFormData) => {
    updateField('email', data.email)
    updateField('phone', data.phone)
    updateField('whatsapp', data.whatsapp || '')
    updateField('address', data.address)
    updateField('city', data.city)
    updateField('province', data.province)
    updateField('postalCode', data.postalCode)
    markStepComplete(1)
    onComplete()
  }

  return (
    <div className="space-y-8 rounded-2xl border bg-card p-5 shadow-sm sm:p-8">
      <div className="space-y-2 border-b pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Langkah 2 dari 5
        </p>
        <h2 className="text-2xl font-bold tracking-tight">Kontak & Alamat</h2>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
          Informasi kontak untuk pelanggan Anda
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="toko@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor Telepon *</FormLabel>
                <FormControl>
                  <Input placeholder="08123456789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="whatsapp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>WhatsApp</FormLabel>
                <FormControl>
                  <Input placeholder="08123456789" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="province"
              render={({
                field,
              }: {
                field: ControllerRenderProps<KontakFormData, 'province'>
              }) => (
                <FormItem>
                  <FormLabel>Provinsi *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    items={PROVINCES}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih provinsi" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PROVINCES.map((p) => (
                        <SelectItem key={p.value} value={p.value}>
                          {p.label}
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
              name="city"
              render={({
                field,
              }: {
                field: ControllerRenderProps<KontakFormData, 'city'>
              }) => (
                <FormItem>
                  <FormLabel>Kota/Kabupaten *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!selectedProvince}
                    items={availableCities}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kota/kabupaten" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableCities.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Jl. Contoh No. 123, Kota, Provinsi 12345"
                    className="resize-none"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="postalCode"
            render={({
              field,
            }: {
              field: ControllerRenderProps<KontakFormData, 'postalCode'>
            }) => (
              <FormItem>
                <FormLabel>Kode Pos *</FormLabel>
                <FormControl>
                  <Input placeholder="12345" maxLength={5} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Lanjut ke Domain
          </Button>
        </form>
      </Form>
    </div>
  )
}
