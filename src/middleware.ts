import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.url.toLowerCase() === request.url) return;
  return NextResponse.redirect(new URL(request.url.toLowerCase(), '/projects'))
}

export const config = {
  matcher: '/projects/:path'
}