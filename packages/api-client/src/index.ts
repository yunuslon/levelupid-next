import axios, { type AxiosInstance, AxiosError } from 'axios'

export interface ApiResponse<T> {
  data: T
  meta?: { total: number; page?: number; pageSize?: number }
}

export interface ApiError {
  message: string
  code: string
  status: number
}

export interface CreateApiClientConfig {
  baseURL: string
  getToken?: () => string | null
  onUnauthorized?: () => void
}

export function createApiClient(config: CreateApiClientConfig): AxiosInstance {
  const client = axios.create({
    baseURL: config.baseURL,
    headers: { 'Content-Type': 'application/json' },
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
        code: (error.response?.data as { code?: string })?.code ?? 'UNKNOWN',
        status: error.response?.status ?? 0,
      }
      return Promise.reject(normalized)
    },
  )

  return client
}
