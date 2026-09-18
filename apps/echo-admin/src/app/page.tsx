import { redirect } from 'next/navigation'

import { getAccountState } from '@/lib/server/echo-api'

export default async function RootPage() {
  const account = await getAccountState()

  if (!account) redirect('/auth/login')
  if (account.next_screen === 'wizard') redirect('/onboarding')
  redirect('/dashboard/default')
}
