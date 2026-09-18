'use client'

import { echoGet } from '@/lib/echo-client'
import type { EchoWizard, EchoWizardOptions } from '@levelupid/types'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { DomainStep } from './_components/domain-step'
import { IdentitasStep } from './_components/identitas-step'
import { KonfirmasiStep } from './_components/konfirmasi-step'
import { KontakStep } from './_components/kontak-step'
import { PreferencesStep } from './_components/preferences-step'
import { TampilanStep } from './_components/tampilan-step'
import { useOnboardingStore } from './_store/onboarding-store'

export default function OnboardingPage() {
  const router = useRouter()
  const { formData, setCurrentStep } = useOnboardingStore()
  const [options, setOptions] = useState<EchoWizardOptions | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const load = async () => {
      const [account, wizard, wizardOptions] = await Promise.all([
        echoGet<{ next_screen: string }>('me'),
        echoGet<EchoWizard>('wizard'),
        echoGet<EchoWizardOptions>('wizard/options'),
      ])

      if (account.next_screen !== 'wizard') {
        router.replace('/dashboard/default')
        return
      }

      const payload = Array.isArray(wizard.payload)
        ? {}
        : (wizard.payload as Record<string, Record<string, unknown>>)
      const step1 = payload.step_1 ?? {}
      const step2 = payload.step_2 ?? {}
      const step3 = payload.step_3 ?? {}
      const step4 = payload.step_4 ?? {}
      const step5 = payload.step_5 ?? {}

      useOnboardingStore.getState().hydrate(
        {
          storeName: wizard.website.store_name,
          businessCategory: wizard.website.category_id?.toString() ?? '',
          description: String(step1.description ?? ''),
          tagline: String(step1.tagline ?? ''),
          email: String(step2.contact_email ?? ''),
          phone: String(step2.contact_phone ?? ''),
          whatsapp: String(step2.whatsapp_number ?? ''),
          address: String(step2.address_line ?? ''),
          city: String(step2.city ?? ''),
          province: String(step2.province ?? ''),
          postalCode: String(step2.postal_code ?? ''),
          subdomain: String(step3.subdomain ?? ''),
          themeId: wizard.website.theme_id ?? null,
          primaryColor: String(step4.primary_color ?? ''),
          secondaryColor: String(step4.secondary_color ?? ''),
          logoUrl: String(step4.logo_url ?? ''),
          faviconUrl: String(step4.favicon_url ?? ''),
          currency: String(wizard.website.currency ?? step5.currency ?? 'IDR'),
          language: String(
            wizard.website.language ?? step5.language ?? 'id-ID',
          ),
          timezone: String(
            wizard.website.timezone ?? step5.timezone ?? 'Asia/Jakarta',
          ),
        },
        wizard.current_step,
      )
      setOptions(wizardOptions)
      setReady(true)
    }

    load().catch(() => router.replace('/auth/login'))
  }, [router])

  const goToNextStep = () => {
    const nextStep = formData.currentStep + 1
    if (nextStep <= 5) {
      setCurrentStep(nextStep)
    }
  }

  if (!ready || !options) {
    return (
      <div className="rounded-2xl border bg-card p-8 text-center text-muted-foreground">
        Memuat konfigurasi wizard...
      </div>
    )
  }

  const steps = [
    <IdentitasStep
      key="identitas"
      options={options}
      onComplete={goToNextStep}
    />,
    <KontakStep key="kontak" onComplete={goToNextStep} />,
    <DomainStep key="domain" onComplete={goToNextStep} />,
    <TampilanStep key="tampilan" options={options} onComplete={goToNextStep} />,
    <PreferencesStep key="preferences" onComplete={goToNextStep} />,
    <KonfirmasiStep key="konfirmasi" options={options} />,
  ]

  return <div className="mx-auto max-w-2xl">{steps[formData.currentStep]}</div>
}
