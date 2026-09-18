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

import { echoGet, echoPut } from '@/lib/echo-client'
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
  const [domain, setDomain] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<DomainFormData>({
    resolver: zodResolver(domainSchema),
    defaultValues: { subdomain: formData.subdomain },
  })

  const subdomain = form.watch('subdomain')

  useEffect(() => {
    let active = true

    if (!subdomain || subdomain.length < 3) {
      setAvailable(null)
      setChecking(false)
      return
    }

    const timeout = window.setTimeout(async () => {
      setChecking(true)
      try {
        const result = await echoGet<{ available: boolean; domain: string }>(
          `wizard/subdomain-check?subdomain=${encodeURIComponent(subdomain)}`,
        )
        if (active) {
          setAvailable(result.available)
          setDomain(result.domain)
        }
      } catch {
        if (active) {
          setAvailable(false)
          setDomain('')
        }
      } finally {
        if (active) setChecking(false)
      }
    }, 350)

    return () => {
      active = false
      window.clearTimeout(timeout)
    }
  }, [subdomain])

  const onSubmit = (data: DomainFormData) => {
    if (!available) return
    setSubmitting(true)
    echoPut('wizard/step/3', { subdomain: data.subdomain })
      .then(() => {
        updateField('subdomain', data.subdomain)
        markStepComplete(2)
        onComplete()
      })
      .catch((error) => form.setError('root', { message: error.message }))
      .finally(() => setSubmitting(false))
  }

  return (
    <div className="space-y-8 rounded-2xl border bg-card p-5 shadow-sm sm:p-8">
      <div className="space-y-2 border-b pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Langkah 3 dari 5
        </p>
        <h2 className="text-2xl font-bold tracking-tight">Domain Toko</h2>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
          Pilih subdomain untuk toko Anda
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="subdomain"
            render={({ field }) => (
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
                    <span className="flex items-center whitespace-nowrap text-sm text-muted-foreground">
                      .levelupid.com
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {subdomain && subdomain.length >= 3 && (
            <div className="rounded-xl border bg-muted/30 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <strong>URL Toko Anda:</strong>
              </p>
              <p className="mt-2 break-all font-mono text-base font-medium sm:text-lg">
                https://{domain || `${subdomain}.alpha.test`}
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

          {form.formState.errors.root && (
            <p className="text-sm text-destructive">
              {form.formState.errors.root.message}
            </p>
          )}
          <Button
            type="submit"
            className="w-full"
            disabled={!available || checking || submitting}
          >
            {submitting ? 'Menyimpan...' : 'Lanjut ke Tampilan'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
