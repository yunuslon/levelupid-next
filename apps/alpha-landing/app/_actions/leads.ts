'use server'

import { AxiosError } from 'axios'
import { alphaPublicApi } from '../_lib/alpha-api'
import type { ActionResult } from '../_lib/env'

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
    const res = await alphaPublicApi.post('/landing/leads', {
      form_code: 'contact',
      ...data,
    })
    return { ok: true, message: res.data.message }
  } catch (error) {
    const message =
      error instanceof AxiosError
        ? (error.response?.data?.message ?? 'Gagal mengirim pesan')
        : 'Terjadi kesalahan. Coba lagi.'
    return { ok: false, message }
  }
}
