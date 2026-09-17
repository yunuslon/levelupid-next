import type { ReactNode } from 'react'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { OnboardingSidebar } from './_components/onboarding-wizard'
import StepCircle from './_components/step-circle'

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
          <header className="flex min-h-16 shrink-0 items-center justify-between border-b bg-background/95 px-4 backdrop-blur sm:px-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Echo Admin
              </p>
              <h1 className="text-lg font-semibold tracking-tight sm:text-xl">
                Siapkan toko Anda
              </h1>
            </div>
            <p className="hidden text-sm text-muted-foreground sm:block">
              Hanya perlu beberapa menit
            </p>
          </header>
          <main className="flex flex-1 flex-col overflow-auto">
            <div className="sticky top-0 z-10 border-b bg-background/95 px-4 py-4 backdrop-blur sm:px-6 md:hidden">
              <StepCircle />
            </div>
            <div className="flex flex-1 justify-center bg-muted/20 px-4 py-6 sm:px-6 sm:py-10">
              <div className="w-full max-w-3xl">{children}</div>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
