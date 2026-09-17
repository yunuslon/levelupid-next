'use client'

import { DomainStep } from './_components/domain-step'
import { IdentitasStep } from './_components/identitas-step'
import { KonfirmasiStep } from './_components/konfirmasi-step'
import { KontakStep } from './_components/kontak-step'
import { TampilanStep } from './_components/tampilan-step'
import { useOnboardingStore } from './_store/onboarding-store'

export default function OnboardingPage() {
  const { formData, setCurrentStep } = useOnboardingStore()

  const goToNextStep = () => {
    const nextStep = formData.currentStep + 1
    if (nextStep <= 4) {
      setCurrentStep(nextStep)
    }
  }

  const steps = [
    <IdentitasStep key="identitas" onComplete={goToNextStep} />,
    <KontakStep key="kontak" onComplete={goToNextStep} />,
    <DomainStep key="domain" onComplete={goToNextStep} />,
    <TampilanStep key="tampilan" onComplete={goToNextStep} />,
    <KonfirmasiStep key="konfirmasi" />,
  ]

  return <div className="mx-auto max-w-2xl">{steps[formData.currentStep]}</div>
}
