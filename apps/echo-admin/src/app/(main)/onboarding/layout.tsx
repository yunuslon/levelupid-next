import type { ReactNode } from 'react'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { OnboardingSidebar } from './_components/onboarding-wizard'

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <OnboardingSidebar />
      <SidebarInset className="min-h-screen">
        <div className="flex h-full flex-col">
          <header className="flex h-16 shrink-0 items-center border-b px-6">
            <h1 className="text-lg font-semibold">Setup Toko Anda</h1>
          </header>
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
