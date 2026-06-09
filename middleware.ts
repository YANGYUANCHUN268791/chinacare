import { NextRequest, NextResponse } from 'next/server'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'chinacare2024'

// Routes that don't need auth
const publicRoutes = ['/admin/login']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only intercept /admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // Allow login page
  if (publicRoutes.some(route => pathname === route)) {
    return NextResponse.next()
  }

  // Check admin_token cookie
  const token = request.cookies.get('admin_token')

  if (token && token.value === 'authenticated') {
    return NextResponse.next()
  }

  // Redirect to login
  const loginUrl = new URL('/admin/login', request.url)
  loginUrl.searchParams.set('redirect', pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/admin/:path*'],
}
