'use server'

import { AxiosError } from 'axios'
import { alphaCFApi } from '../_lib/alpha-api'
import { type ActionResult, getApiFailureMessage } from '../_lib/env'

export type { ActionResult }

export async function subscribeNewsletter(data: {
  email: string
  full_name?: string
}): Promise<ActionResult> {
  try {
    const res = await alphaCFApi.post('/landing/newsletter', data)
    const failure = getApiFailureMessage(res.data, 'Gagal berlangganan')
    if (failure) return { ok: false, message: failure }
    return { ok: true, message: res.data.message }
  } catch (error) {
    const message =
      error instanceof AxiosError
        ? (error.response?.data?.message ?? 'Gagal berlangganan')
        : 'Terjadi kesalahan. Coba lagi.'
    return { ok: false, message }
  }
}
