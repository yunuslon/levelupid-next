import type { Metadata } from 'next'
import { RegistrationFlow } from './_components/registration-flow'

export const metadata: Metadata = {
  title: 'Daftar',
  description: 'Daftar akun LevelUpID dan mulai berjualan online hari ini.',
}

export default function RegisterPage() {
  return <RegistrationFlow />
}
