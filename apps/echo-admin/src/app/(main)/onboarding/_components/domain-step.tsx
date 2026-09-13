'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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

import { useOnboardingStore } from '../_store/onboarding-store'

const domainSchema = z.object({
  subdomain: z
    .string()
    .min(3, 'Subdomain minimal 3 karakter')
    .max(50, 'Subdomain maksimal 50 karakter')
    .regex(/^[a-z0-9-]+$/, 'Hanya huruf kecil, angka, dan tanda hubung'),
})

type DomainFormData = z.infer<typeof domainSchema>

export function DomainStep({ onComplete }: { onComplete: () => void }) {
  const { formData, updateField, markStepComplete } = useOnboardingStore()
  const [checking, setChecking] = useState(false)
  const [available, setAvailable] = useState<boolean | null>(null)

  const form = useForm<DomainFormData>({
    resolver: zodResolver(domainSchema),
    defaultValues: { subdomain: formData.subdomain },
  })

  const subdomain = form.watch('subdomain')

  useEffect(() => {
    if (!subdomain || subdomain.length < 3) {
      setAvailable(null)
      return
    }

    const checkAvailability = async () => {
      setChecking(true)
      await new Promise((resolve) => setTimeout(resolve, 500))
      setAvailable(true)
      setChecking(false)
    }

    checkAvailability()
  }, [subdomain])

  const onSubmit = (data: DomainFormData) => {
    if (!available) return
    updateField('subdomain', data.subdomain)
    markStepComplete(2)
    onComplete()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Domain Toko</h2>
        <p className="text-sm text-muted-foreground">
          Pilih subdomain untuk toko Anda
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="subdomain"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Subdomain *</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        placeholder="toko-saya"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                        }}
                      />
                    </div>
                    <span className="flex items-center text-sm text-muted-foreground">
                      .levelupid.com
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {subdomain && subdomain.length >= 3 && (
            <div className="rounded-lg border p-4">
              <p className="text-sm">
                <strong>URL Toko Anda:</strong>
              </p>
              <p className="font-mono text-lg">
                https://{subdomain}.levelupid.com
              </p>
              {checking && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Memeriksa ketersediaan...
                </p>
              )}
              {available === true && (
                <p className="mt-2 text-xs text-green-600">
                  ✓ Subdomain tersedia
                </p>
              )}
              {available === false && (
                <p className="mt-2 text-xs text-red-600">
                  ✗ Subdomain sudah digunakan
                </p>
              )}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={!available || checking}
          >
            Lanjut ke Tampilan
          </Button>
        </form>
      </Form>
    </div>
  )
}
