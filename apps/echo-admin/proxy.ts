import { type NextRequest, NextResponse } from 'next/server'

const TOKEN_COOKIE = 'echo_token'

/**
 * The backend decides the tenant screen through GET /me. Proxy only checks that
 * a server-managed token exists; page/layout code performs the account-state check.
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  const hasToken = Boolean(req.cookies.get(TOKEN_COOKIE)?.value)

  if (
    (pathname.startsWith('/dashboard') || pathname.startsWith('/onboarding')) &&
    !hasToken
  ) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/onboarding/:path*'],
}
