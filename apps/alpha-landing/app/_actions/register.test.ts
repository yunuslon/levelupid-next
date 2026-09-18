import { beforeEach, describe, expect, it, vi } from 'vitest'

const { post } = vi.hoisted(() => ({ post: vi.fn() }))

vi.mock('../_lib/alpha-api', () => ({
  alphaCFApi: { post },
}))

import { registerTenant } from './register'

const payload = {
  full_name: 'Ayu Lestari',
  email: 'ayu@example.test',
  phone: '08123456789',
  password: 'password123',
  password_confirmation: 'password123',
}

describe('registerTenant', () => {
  beforeEach(() => post.mockReset())

  it('normalizes validation errors from a failed envelope', async () => {
    post.mockResolvedValue({
      data: {
        success: false,
        message: 'Validasi gagal.',
        errors: { email: ['Email sudah digunakan.'] },
      },
    })

    await expect(registerTenant(payload)).resolves.toMatchObject({
      ok: false,
      message: 'Validasi gagal.',
      errors: { email: 'Email sudah digunakan.' },
    })
  })

  it('returns registration data on success', async () => {
    post.mockResolvedValue({
      data: {
        success: true,
        message: 'Pendaftaran berhasil.',
        data: { id: 1 },
        meta: { verification_expires_at: '2026-09-20T00:00:00Z' },
      },
    })

    await expect(registerTenant(payload)).resolves.toMatchObject({
      ok: true,
      message: 'Pendaftaran berhasil.',
      data: { id: 1 },
    })
  })
})
