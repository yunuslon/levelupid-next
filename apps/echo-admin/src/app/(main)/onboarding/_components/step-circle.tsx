'use client'

import { useOnboardingStore } from '../_store/onboarding-store'

const STEPS = [
  { id: 0, title: 'Identitas' },
  { id: 1, title: 'Kontak' },
  { id: 2, title: 'Domain' },
  { id: 3, title: 'Tampilan' },
  { id: 4, title: 'Preferensi' },
  { id: 5, title: 'Konfirmasi' },
]

export default function StepCircle() {
  const { formData, setCurrentStep } = useOnboardingStore()

  const handleStepClick = (stepId: number) => {
    if (stepId <= formData.currentStep) {
      setCurrentStep(stepId)
    }
  }

  return (
    <div className="mx-auto flex max-w-xl flex-row items-center justify-center gap-0">
      {STEPS.map((step, i) => {
        const isCompleted = formData.completedSteps.includes(step.id)
        const isActive = step.id === formData.currentStep
        const isClickable = step.id <= formData.currentStep

        const circleClass = isCompleted
          ? 'border-green-500 bg-green-500/10 text-green-600'
          : isActive
            ? 'border-primary bg-primary/10 text-primary'
            : 'border-border bg-background text-muted-foreground'

        const connectorClass = isCompleted
          ? 'bg-green-500'
          : isActive
            ? 'bg-primary'
            : 'bg-border'

        return (
          <div className="flex flex-row items-center" key={step.id}>
            {i !== 0 && (
              <div
                className={`h-1 min-w-4 max-w-12 flex-1 ${connectorClass}`}
              />
            )}
            <div className="flex flex-col items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleStepClick(step.id)}
                disabled={!isClickable}
                aria-label={`Step ${i + 1}: ${step.title}`}
                className={`border-2 ${circleClass} w-max rounded-full p-1 transition-opacity ${
                  isClickable
                    ? 'cursor-pointer hover:opacity-80'
                    : 'cursor-not-allowed opacity-60'
                }`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold sm:h-9 sm:w-9 sm:text-base ${circleClass}`}
                >
                  {isCompleted ? '✓' : i + 1}
                </div>
              </button>
              <span
                className={`hidden text-xs font-medium sm:block ${
                  isActive
                    ? 'text-primary'
                    : isCompleted
                      ? 'text-green-600'
                      : 'text-muted-foreground'
                }`}
              >
                {step.title}
              </span>
            </div>
            {i + 1 !== STEPS.length && (
              <div
                className={`h-1 min-w-4 max-w-12 flex-1 ${connectorClass}`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
