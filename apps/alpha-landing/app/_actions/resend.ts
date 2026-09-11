'use server'

import { type ActionResult, getEnv } from '../_lib/env'

export async function resendVerification(email: string): Promise<ActionResult> {
  try {
    const res = await fetch(`${getEnv('ALPHA_API_URL')}/register/resend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'CF-Access-Client-Id': getEnv('CF_ACCESS_CLIENT_ID'),
        'CF-Access-Client-Secret': getEnv('CF_ACCESS_CLIENT_SECRET'),
      },
      body: JSON.stringify({ email }),
    })
    const json = await res.json()
    if (!res.ok) {
      return {
        ok: false,
        message: json?.message ?? 'Gagal mengirim ulang tautan',
      }
    }
    return { ok: true, message: json?.message }
  } catch {
    return { ok: false, message: 'Terjadi kesalahan. Coba lagi.' }
  }
}
