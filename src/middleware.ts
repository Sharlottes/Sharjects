import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  console.log(request.url);
  return NextResponse.redirect(new URL(request.url.toLowerCase(), '/projects'))
}

export const config = {
  matcher: '/projects/:path[A-Z]'
}