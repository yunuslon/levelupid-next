import { type NextRequest, NextResponse } from 'next/server'

const ONBOARDING_COOKIE = 'echo_onboarded'

/**
 * Mock onboarding guard (development only).
 * Reads `echo_onboarded` cookie set client-side after onboarding completes.
 * Will be replaced by real session/tenant check once Auth.js is wired up.
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isOnboarded = req.cookies.get(ONBOARDING_COOKIE)?.value === 'true'

  if (pathname.startsWith('/dashboard') && !isOnboarded) {
    return NextResponse.redirect(new URL('/onboarding', req.url))
  }

  if (pathname.startsWith('/onboarding') && isOnboarded) {
    return NextResponse.redirect(new URL('/dashboard/default', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/onboarding/:path*'],
}
