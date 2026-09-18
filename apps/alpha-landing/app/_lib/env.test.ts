import { describe, expect, it } from 'vitest'

import { getApiFailureMessage, normalizeFieldErrors } from './env'

describe('Alpha API helpers', () => {
  it('normalizes string and array field errors', () => {
    expect(
      normalizeFieldErrors({
        email: ['Email sudah digunakan.'],
        phone: 'Nomor telepon tidak valid.',
      }),
    ).toEqual({
      email: 'Email sudah digunakan.',
      phone: 'Nomor telepon tidak valid.',
    })
  })

  it('returns a message only for failed envelopes', () => {
    expect(
      getApiFailureMessage(
        { success: false, message: 'Request ditolak.' },
        'Fallback',
      ),
    ).toBe('Request ditolak.')
    expect(getApiFailureMessage({ success: true }, 'Fallback')).toBeUndefined()
  })
})
