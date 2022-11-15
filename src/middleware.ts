import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/projects', request.url.toLowerCase()))
}

export const config = {
  matcher: '/projects/:path*([A-Z])'
}