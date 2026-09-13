import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function RootPage() {
  const cookieStore = await cookies()
  const isOnboarded = cookieStore.get('echo_onboarded')?.value === 'true'

  redirect(isOnboarded ? '/dashboard/default' : '/onboarding')
}
