import { create } from 'zustand'

export type MockSession = {
  id: string
  tenantId: string
  tenantName: string
  role: 'owner' | 'staff'
  hasCompletedOnboarding: boolean
}

type MockAuthStore = {
  session: MockSession | null
  setSession: (session: MockSession) => void
  logout: () => void
}

export const useMockAuth = create<MockAuthStore>((set) => ({
  session: {
    id: 'user-001',
    tenantId: 'tenant-001',
    tenantName: 'Toko ABC',
    role: 'owner',
    hasCompletedOnboarding: false,
  },
  setSession: (session) => set({ session }),
  logout: () => set({ session: null }),
}))
