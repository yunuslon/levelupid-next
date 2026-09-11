'use server'

import { type ActionResult, getEnv } from '../_lib/env'

export type { ActionResult }

export async function subscribeNewsletter(data: {
  email: string
  full_name?: string
}): Promise<ActionResult> {
  try {
    const res = await fetch(`${getEnv('ALPHA_API_URL')}/landing/newsletter`, {
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
      return { ok: false, message: json?.message ?? 'Gagal berlangganan' }
    }
    return { ok: true, message: json?.message }
  } catch {
    return { ok: false, message: 'Terjadi kesalahan. Coba lagi.' }
  }
}
