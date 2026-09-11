import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const hostname = req.headers.get('host') ?? ''

  const currentHost = hostname
    .replace('.localhost:3000', '')
    .replace('.levelupid.com', '')

  const url = req.nextUrl.clone()

  const response = NextResponse.next()
  response.headers.set('x-tenant-slug', currentHost)

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
