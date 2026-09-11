'use server'

import { type ActionResult, getEnv } from '../_lib/env'

export type { ActionResult }

export async function submitLead(data: {
  full_name: string
  email: string
  phone: string
  message: string
  company_name?: string
  form_code?: string
}): Promise<ActionResult> {
  try {
    const res = await fetch(`${getEnv('ALPHA_API_URL')}/landing/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ form_code: 'contact', ...data }),
    })
    const json = await res.json()
    if (!res.ok) {
      return { ok: false, message: json?.message ?? 'Gagal mengirim pesan' }
    }
    return { ok: true, message: json?.message }
  } catch {
    return { ok: false, message: 'Terjadi kesalahan. Coba lagi.' }
  }
}
