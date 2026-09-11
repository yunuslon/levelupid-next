'use server'

import { getEnv } from '../_lib/env'

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
    const res = await fetch(`${getEnv('ALPHA_API_URL')}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'CF-Access-Client-Id': getEnv('CF_ACCESS_CLIENT_ID'),
        'CF-Access-Client-Secret': getEnv('CF_ACCESS_CLIENT_SECRET'),
      },
      body: JSON.stringify(data),
    })
    const json = await res.json()
    if (!res.ok) {
      return {
        ok: false,
        message: json?.message ?? 'Pendaftaran gagal',
        errors: json?.errors,
      }
    }
    return {
      ok: true,
      message: json?.message,
      data: json?.data,
      verification_expires_at: json?.meta?.verification_expires_at,
    }
  } catch {
    return { ok: false, message: 'Terjadi kesalahan. Coba lagi.' }
  }
}
