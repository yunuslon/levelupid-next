export interface AlphaSession {
  user: {
    id: string
    role: string
    name: string
    email: string
  }
}

export interface EchoAdminSession {
  user: {
    id: string
    tenantId: string
    role: string
    name: string
    email: string
  }
}

export interface EchoConsumerSession {
  user: {
    id: string
    tenantId: string
    name: string
    email: string
  }
}

export function requireAuth<T>(session: T | null): session is T {
  return session !== null
}

export function requireRole(session: { user: { role: string } }, roles: string[]): boolean {
  return roles.includes(session.user.role)
}
