import {
  type ApiError,
  type ApiResponse,
  createApiClient,
} from '@levelupid/api-client'

export type EchoClientError = ApiError

const client = createApiClient({ baseURL: '/api/echo' })

async function requestWithoutRefresh<T>(
  path: string,
  method: 'GET' | 'POST' | 'PUT',
  data?: unknown,
): Promise<T> {
  const response = await client.request<ApiResponse<T>>({
    url: path,
    method,
    data,
  })
  const envelope = response.data
  if (!envelope.success) {
    throw {
      message: envelope.message,
      code: envelope.error?.code ?? 'API_ERROR',
      status: response.status,
      details: envelope.error?.details,
    } satisfies EchoClientError
  }

  return envelope.data
}

async function refreshSession() {
  await requestWithoutRefresh('auth/refresh', 'POST')
}

export async function echoRequest<T>(
  path: string,
  method: 'GET' | 'POST' | 'PUT' = 'GET',
  data?: unknown,
): Promise<T> {
  try {
    return await requestWithoutRefresh<T>(path, method, data)
  } catch (error) {
    const apiError = error as EchoClientError
    if (apiError.status !== 401 || path.startsWith('auth/')) {
      throw error
    }

    try {
      await refreshSession()
      return await requestWithoutRefresh<T>(path, method, data)
    } catch (refreshError) {
      window.location.assign('/auth/login')
      throw refreshError
    }
  }
}

export const echoGet = <T>(path: string) => echoRequest<T>(path)

export const echoPost = <T>(path: string, data?: unknown) =>
  echoRequest<T>(path, 'POST', data)

export const echoPut = <T>(path: string, data: unknown) =>
  echoRequest<T>(path, 'PUT', data)
