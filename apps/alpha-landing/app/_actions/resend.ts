'use server'

import { alphaPublicApi } from '../_lib/alpha-api'
import { type ActionResult, getApiFailureMessage } from '../_lib/env'

export async function resendVerification(email: string): Promise<ActionResult> {
  try {
    const response = await alphaPublicApi.post('/register/resend', { email })
    const failure = getApiFailureMessage(
      response.data,
      'Gagal mengirim ulang tautan',
    )
    if (failure) return { ok: false, message: failure }
    return { ok: true, message: response.data?.message }
  } catch (error) {
    const response = (error as { response?: { data?: unknown } }).response
    const message = getApiFailureMessage(
      response?.data,
      'Gagal mengirim ulang tautan',
    )
    if (message) return { ok: false, message }
    return { ok: false, message: 'Terjadi kesalahan. Coba lagi.' }
  }
}
