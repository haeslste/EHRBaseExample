import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Decode the JWT (without verifying) to check the role
  const base64Payload = token.split('.')[1]
  const decodedPayload = JSON.parse(Buffer.from(base64Payload, 'base64').toString())

  const role = decodedPayload?.role
  const pathname = request.nextUrl.pathname

  // Restrict access to role-specific paths
  if (pathname.startsWith('/admin') && role !== 'ROLE_ADMIN') {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  if (pathname.startsWith('/doctor') && role !== 'ROLE_DOCTOR') {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  if (pathname.startsWith('/patient') && role !== 'ROLE_PATIENT') {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/doctor/:path*', '/patient/:path*'],
}