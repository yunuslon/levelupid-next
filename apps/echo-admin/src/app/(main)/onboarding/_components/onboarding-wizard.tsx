'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Button } from '@levelupid/ui/components/button'

import { useOnboardingStore } from '../_store/onboarding-store'

const STEPS = [
  { id: 0, title: 'Identitas' },
  { id: 1, title: 'Kontak' },
  { id: 2, title: 'Domain' },
  { id: 3, title: 'Tampilan' },
  { id: 4, title: 'Preferensi' },
  { id: 5, title: 'Konfirmasi' },
]

export function OnboardingSidebar() {
  const { formData, setCurrentStep } = useOnboardingStore()

  const handleStepClick = (stepId: number) => {
    if (stepId <= formData.currentStep) {
      setCurrentStep(stepId)
    }
  }

  return (
    <Sidebar collapsible="none" className="hidden border-r bg-sidebar md:flex">
      <SidebarHeader className="border-b px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sidebar-primary text-sm font-bold text-sidebar-primary-foreground">
            E
          </div>
          <div>
            <p className="font-semibold tracking-tight">Echo Admin</p>
            <p className="text-xs text-sidebar-foreground/60">Store setup</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="px-3 py-6">
          <h3 className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-sidebar-foreground/50">
            Langkah setup
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
                            ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600'
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
      <SidebarFooter className="border-t px-5 py-5">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-sidebar-foreground/60">Progress</span>
          <span className="font-medium">
            {formData.completedSteps.length}/{STEPS.length}
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-sidebar-accent">
          <div
            className="h-full rounded-full bg-sidebar-primary transition-all"
            style={{
              width: `${(formData.completedSteps.length / STEPS.length) * 100}%`,
            }}
          />
        </div>
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
