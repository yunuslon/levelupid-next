import { create } from 'zustand'

export type OnboardingFormData = {
  // Identitas
  storeName: string
  businessCategory: string
  description: string
  tagline: string
  logo: File | null

  // Kontak
  email: string
  phone: string
  whatsapp: string
  address: string

  // Domain
  subdomain: string

  // Metadata
  currentStep: number
  completedSteps: number[]
}

type OnboardingStore = {
  formData: OnboardingFormData
  updateField: (field: keyof OnboardingFormData, value: any) => void
  setCurrentStep: (step: number) => void
  markStepComplete: (step: number) => void
  reset: () => void
}

const initialData: OnboardingFormData = {
  storeName: '',
  businessCategory: '',
  description: '',
  tagline: '',
  logo: null,
  email: '',
  phone: '',
  whatsapp: '',
  address: '',
  subdomain: '',
  currentStep: 0,
  completedSteps: [],
}

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  formData: initialData,
  updateField: (field, value) =>
    set((state) => ({ formData: { ...state.formData, [field]: value } })),
  setCurrentStep: (step) =>
    set((state) => ({ formData: { ...state.formData, currentStep: step } })),
  markStepComplete: (step) =>
    set((state) => ({
      formData: {
        ...state.formData,
        completedSteps: [...new Set([...state.formData.completedSteps, step])],
      },
    })),
  reset: () => set({ formData: initialData }),
}))
