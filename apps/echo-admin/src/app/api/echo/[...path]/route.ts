import { type ApiError, createApiClient } from '@levelupid/api-client'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

const TOKEN_COOKIE = 'echo_token'
const TOKEN_MAX_AGE = 60 * 60 * 24 * 30

type ApiEnvelope = {
  success: boolean
  message: string
  data: Record<string, unknown>
  meta?: Record<string, unknown>
}

function apiClient(token?: string) {
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

async function forward(request: NextRequest, path: string) {
  const cookieStore = await cookies()
  const token = cookieStore.get(TOKEN_COOKIE)?.value
  const url = `/${path}${request.nextUrl.search}`
  const body = ['GET', 'HEAD'].includes(request.method)
    ? undefined
    : await request.text()
  const response = await apiClient(token).request<ApiEnvelope>({
    method: request.method,
    url,
    data: body ? JSON.parse(body) : undefined,
  })

  if (path === 'auth/login' || path === 'auth/refresh') {
    const { token: _token, ...safeData } = response.data.data
    const nextResponse = NextResponse.json({ ...response.data, data: safeData })
    const responseToken = response.data.data?.token
    if (typeof responseToken === 'string') {
      nextResponse.cookies.set({
        name: TOKEN_COOKIE,
        value: responseToken,
        httpOnly: true,
        maxAge: TOKEN_MAX_AGE,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      })
    }
    return nextResponse
  }

  if (path === 'auth/logout') {
    const nextResponse = NextResponse.json(response.data)
    nextResponse.cookies.delete(TOKEN_COOKIE)
    return nextResponse
  }

  return NextResponse.json(response.data)
}

async function handle(request: NextRequest, segments: string[]) {
  try {
    return await forward(request, segments.join('/'))
  } catch (error) {
    const apiError = error as ApiError
    if (apiError.status) {
      const message =
        apiError.status === 403
          ? 'Echo API menolak request (403). Periksa koneksi jaringan, VPN, Cloudflare policy, atau service token.'
          : apiError.message
      const response = NextResponse.json(
        {
          success: false,
          message,
          error: { code: apiError.code, details: apiError.details ?? {} },
        },
        { status: apiError.status },
      )
      if (apiError.status === 401) {
        response.cookies.delete(TOKEN_COOKIE)
      }
      return response
    }
    return NextResponse.json(
      {
        success: false,
        message: 'Echo API unavailable.',
        error: { code: 'API_UNAVAILABLE' },
      },
      { status: 503 },
    )
  }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return handle(request, (await context.params).path)
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return handle(request, (await context.params).path)
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return handle(request, (await context.params).path)
}
