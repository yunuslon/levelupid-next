import axios, { type AxiosError, type AxiosInstance } from 'axios'

export interface ApiMeta {
  request_id?: string
  timestamp?: string
  pagination?: {
    total: number
    per_page: number
    current_page: number
    last_page: number
  }
  [key: string]: unknown
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
  meta: ApiMeta
  error?: {
    code?: string
    details?: Record<string, unknown>
  }
}

export interface ApiError {
  message: string
  code: string
  status: number
  details?: Record<string, unknown>
}

export interface CreateApiClientConfig {
  baseURL: string
  getToken?: () => string | null
  onUnauthorized?: () => void
  headers?: Record<string, string>
}

export function createApiClient(config: CreateApiClientConfig): AxiosInstance {
  const client = axios.create({
    baseURL: config.baseURL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...config.headers,
    },
  })

  client.interceptors.request.use((req) => {
    const token = config.getToken?.()
    if (token && req.headers) {
      req.headers.Authorization = `Bearer ${token}`
    }
    return req
  })

  client.interceptors.response.use(
    (res) => res,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        config.onUnauthorized?.()
      }
      const normalized: ApiError = {
        message:
          (error.response?.data as { message?: string })?.message ??
          error.message ??
          'Unknown error',
        code:
          (error.response?.data as { error?: { code?: string } })?.error
            ?.code ?? 'UNKNOWN',
        status: error.response?.status ?? 0,
        details: (
          error.response?.data as {
            error?: { details?: Record<string, unknown> }
          }
        )?.error?.details,
      }
      return Promise.reject(normalized)
    },
  )

  return client
}
