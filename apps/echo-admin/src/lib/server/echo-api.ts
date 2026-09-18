import { cookies } from 'next/headers'

import { type ApiError, createApiClient } from '@levelupid/api-client'
import {
  type EchoAccountState,
  EchoAccountStateSchema,
  type EchoLoginResponse,
  EchoLoginResponseSchema,
  type EchoSubdomainCheck,
  EchoSubdomainCheckSchema,
  type EchoWizard,
  type EchoWizardOptions,
  EchoWizardOptionsSchema,
  EchoWizardSchema,
} from '@levelupid/types'

export const ECHO_TOKEN_COOKIE = 'echo_token'

type EchoEnvelope<T> = {
  success: boolean
  message: string
  data: T
  meta: { request_id: string; timestamp: string }
}

function getEchoClient(token?: string | null) {
  const baseURL = process.env.ECHO_API_URL
  const clientId = process.env.CF_ACCESS_CLIENT_ID
  const clientSecret = process.env.CF_ACCESS_CLIENT_SECRET

  if (!baseURL || !clientId || !clientSecret) {
    throw new Error('Echo API environment is not configured.')
  }

  return createApiClient({
    baseURL,
    getToken: () => token ?? null,
    headers: {
      'CF-Access-Client-Id': clientId,
      'CF-Access-Client-Secret': clientSecret,
    },
  })
}

async function getToken() {
  return (await cookies()).get(ECHO_TOKEN_COOKIE)?.value ?? null
}

async function request<T>(
  path: string,
  token: string,
  schema: { parse: (value: unknown) => T },
) {
  const response = await getEchoClient(token).get<EchoEnvelope<unknown>>(path)
  return schema.parse(response.data.data)
}

export async function getAccountState(): Promise<EchoAccountState | null> {
  const token = await getToken()
  if (!token) return null

  try {
    return await request('/me', token, EchoAccountStateSchema)
  } catch (error) {
    if ((error as ApiError).status === 401) return null
    throw error
  }
}

export async function getWizardState(): Promise<EchoWizard> {
  const token = await getToken()
  if (!token) throw new Error('Unauthenticated')
  return request('/wizard', token, EchoWizardSchema)
}

export async function getWizardOptions(): Promise<EchoWizardOptions> {
  const token = await getToken()
  if (!token) throw new Error('Unauthenticated')
  return request('/wizard/options', token, EchoWizardOptionsSchema)
}

export async function checkSubdomain(
  subdomain: string,
): Promise<EchoSubdomainCheck> {
  const token = await getToken()
  if (!token) throw new Error('Unauthenticated')
  return request(
    `/wizard/subdomain-check?subdomain=${encodeURIComponent(subdomain)}`,
    token,
    EchoSubdomainCheckSchema,
  )
}

export async function login(
  email: string,
  password: string,
): Promise<EchoLoginResponse> {
  const response = await getEchoClient().post<EchoEnvelope<unknown>>(
    '/auth/login',
    { email, password },
  )
  return EchoLoginResponseSchema.parse(response.data.data)
}

export type { ApiError }
