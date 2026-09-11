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
