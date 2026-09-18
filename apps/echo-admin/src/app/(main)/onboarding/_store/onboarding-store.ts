import { create } from 'zustand'

export type OnboardingFormData = {
  // Identitas
  storeName: string
  businessCategory: string
  themeId: number | null
  primaryColor: string
  secondaryColor: string
  logoUrl: string
  faviconUrl: string
  description: string
  tagline: string
  logo: File | null

  // Kontak
  email: string
  phone: string
  whatsapp: string
  address: string
  city: string
  province: string
  postalCode: string

  // Preferences
  currency: string
  language: string
  timezone: string

  // Domain
  subdomain: string

  // Metadata
  currentStep: number
  completedSteps: number[]
}

type OnboardingStore = {
  formData: OnboardingFormData
  updateField: <K extends keyof OnboardingFormData>(
    field: K,
    value: OnboardingFormData[K],
  ) => void
  setCurrentStep: (step: number) => void
  markStepComplete: (step: number) => void
  hydrate: (data: Partial<OnboardingFormData>, currentStep: number) => void
  reset: () => void
}

const initialData: OnboardingFormData = {
  storeName: '',
  businessCategory: '',
  themeId: null,
  primaryColor: '',
  secondaryColor: '',
  logoUrl: '',
  faviconUrl: '',
  description: '',
  tagline: '',
  logo: null,
  email: '',
  phone: '',
  whatsapp: '',
  address: '',
  city: '',
  province: '',
  postalCode: '',
  currency: 'IDR',
  language: 'id-ID',
  timezone: 'Asia/Jakarta',
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
  hydrate: (data, currentStep) =>
    set((state) => ({
      formData: {
        ...state.formData,
        ...data,
        currentStep: Math.max(0, Math.min(currentStep - 1, 5)),
        completedSteps: Array.from(
          { length: Math.max(0, currentStep - 1) },
          (_, index) => index,
        ),
      },
    })),
  reset: () => set({ formData: initialData }),
}))
