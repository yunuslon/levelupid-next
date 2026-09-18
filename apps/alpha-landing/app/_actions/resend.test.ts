import { beforeEach, describe, expect, it, vi } from 'vitest'

const { post } = vi.hoisted(() => ({ post: vi.fn() }))

vi.mock('../_lib/alpha-api', () => ({
  alphaPublicApi: { post },
}))

import { resendVerification } from './resend'

describe('resendVerification', () => {
  beforeEach(() => post.mockReset())

  it('uses the public API client for successful resend', async () => {
    post.mockResolvedValue({
      data: { success: true, message: 'Tautan dikirim.' },
    })

    await expect(resendVerification('ayu@example.test')).resolves.toEqual({
      ok: true,
      message: 'Tautan dikirim.',
    })
    expect(post).toHaveBeenCalledWith('/register/resend', {
      email: 'ayu@example.test',
    })
  })

  it('returns backend failure messages from a successful HTTP response', async () => {
    post.mockResolvedValue({
      data: { success: false, message: 'Terlalu banyak permintaan.' },
    })

    await expect(resendVerification('ayu@example.test')).resolves.toEqual({
      ok: false,
      message: 'Terlalu banyak permintaan.',
    })
  })
})
