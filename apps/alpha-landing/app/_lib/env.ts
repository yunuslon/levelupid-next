/**
 * Typed accessor for required env vars. Throws early if missing so that
 * misconfigured deployments fail loudly at request time instead of silently
 * sending broken requests to the backend.
 *
 * Server-only. Do NOT import from client components.
 */
export function getEnv(key: string): string {
  const value = process.env[key]
  if (!value) throw new Error(`Missing env: ${key}`)
  return value
}

export type ActionResult = {
  ok: boolean
  message?: string
  errors?: Record<string, string>
}

export function normalizeFieldErrors(
  value: unknown,
): Record<string, string> | undefined {
  if (!value || typeof value !== 'object') return undefined

  const errors: Record<string, string> = {}
  for (const [key, messages] of Object.entries(value)) {
    if (Array.isArray(messages)) {
      errors[key] = messages.filter(Boolean).join(' ')
    } else if (typeof messages === 'string') {
      errors[key] = messages
    }
  }

  return Object.keys(errors).length > 0 ? errors : undefined
}

export function getApiFailureMessage(
  value: unknown,
  fallback: string,
): string | undefined {
  if (!value || typeof value !== 'object') return fallback
  const body = value as { success?: boolean; message?: string }
  return body.success === false ? body.message || fallback : undefined
}
