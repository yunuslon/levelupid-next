'use server'

import { AxiosError } from 'axios'
import { alphaCFApi } from '../_lib/alpha-api'

export type RegisterResult = {
  ok: boolean
  message?: string
  data?: {
    id: number
    code: string
    lifecycle_status: string
    owner: {
      id: number
      full_name: string
      email: string
      status: string
      email_verified_at: string | null
    }
    registered_at: string
  }
  verification_expires_at?: string
  errors?: Record<string, string>
}

export async function registerTenant(data: {
  full_name: string
  email: string
  phone: string
  password: string
  password_confirmation: string
  referral_code?: string
}): Promise<RegisterResult> {
  try {
    const res = await alphaCFApi.post('/register', data)

    return {
      ok: true,
      message: res.data.message,
      data: res.data.data,
      verification_expires_at: res.data.meta?.verification_expires_at,
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        ok: false,
        message: error.response?.data?.message ?? 'Pendaftaran gagal',
        errors: error.response?.data?.errors,
      }
    }
    return { ok: false, message: 'Terjadi kesalahan. Coba lagi.' }
  }
}
