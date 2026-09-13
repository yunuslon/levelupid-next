'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@levelupid/ui/components/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

import { useOnboardingStore } from '../_store/onboarding-store'

const STEPS = [
  { id: 0, title: 'Identitas' },
  { id: 1, title: 'Kontak' },
  { id: 2, title: 'Domain' },
  { id: 3, title: 'Tampilan' },
  { id: 4, title: 'Konfirmasi' },
]

export function OnboardingSidebar() {
  const { formData, setCurrentStep } = useOnboardingStore()

  const handleStepClick = (stepId: number) => {
    if (stepId <= formData.currentStep) {
      setCurrentStep(stepId)
    }
  }

  return (
    <Sidebar collapsible="none">
      <SidebarHeader className="h-16 border-b px-6">
        <div className="flex items-center gap-2 font-semibold">
          <span className="text-lg">Echo Admin</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="px-4 py-4">
          <h3 className="mb-2 px-2 text-xs font-medium uppercase text-muted-foreground">
            Setup Toko
          </h3>
          <SidebarMenu>
            {STEPS.map((step) => {
              const isCompleted = formData.completedSteps.includes(step.id)
              const isActive = step.id === formData.currentStep
              const isDisabled = step.id > formData.currentStep

              return (
                <SidebarMenuItem key={step.id}>
                  <SidebarMenuButton
                    isActive={isActive}
                    disabled={isDisabled}
                    className={isDisabled ? 'opacity-50' : ''}
                    onClick={() => handleStepClick(step.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold ${
                          isCompleted
                            ? 'border-green-500 bg-green-500/10 text-green-600'
                            : isActive
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-border bg-background text-muted-foreground'
                        }`}
                      >
                        {isCompleted ? '✓' : step.id + 1}
                      </div>
                      <span className="text-sm font-medium">{step.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarFooter className="border-t px-4 py-4">
        <p className="text-xs text-muted-foreground">
          {formData.completedSteps.length} / {STEPS.length} selesai
        </p>
      </SidebarFooter>
    </Sidebar>
  )
}

export function OnboardingFooter({
  onBack,
  onNext,
  isLastStep,
}: {
  onBack: () => void
  onNext: () => void
  isLastStep: boolean
}) {
  const { formData } = useOnboardingStore()

  return (
    <div className="flex items-center justify-between border-t px-4 py-4 md:px-6">
      <Button
        variant="outline"
        onClick={onBack}
        disabled={formData.currentStep === 0}
      >
        Kembali
      </Button>
      <Button onClick={onNext}>{isLastStep ? 'Selesai' : 'Lanjut'}</Button>
    </div>
  )
}
