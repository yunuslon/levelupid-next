'use client'

import { zodResolver } from '@hookform/resolvers/zod'
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
import { Textarea } from '@levelupid/ui/components/textarea'

import { useOnboardingStore } from '../_store/onboarding-store'

const kontakSchema = z.object({
  email: z.string().email('Email tidak valid'),
  phone: z.string().min(10, 'No. telepon minimal 10 digit'),
  whatsapp: z.string().optional(),
  address: z.string().min(10, 'Alamat minimal 10 karakter'),
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
    },
  })

  const onSubmit = (data: KontakFormData) => {
    updateField('email', data.email)
    updateField('phone', data.phone)
    updateField('whatsapp', data.whatsapp)
    updateField('address', data.address)
    markStepComplete(1)
    onComplete()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Kontak & Alamat</h2>
        <p className="text-sm text-muted-foreground">
          Informasi kontak untuk pelanggan Anda
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }: { field: any }) => (
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
            render={({ field }: { field: any }) => (
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
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>WhatsApp</FormLabel>
                <FormControl>
                  <Input placeholder="08123456789" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }: { field: any }) => (
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

          <Button type="submit" className="w-full">
            Lanjut ke Domain
          </Button>
        </form>
      </Form>
    </div>
  )
}
