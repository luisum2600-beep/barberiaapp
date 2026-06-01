import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const isLoginPage = req.nextUrl.pathname === '/admin/login'

  if (!isLoginPage) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  }
}

export const config = {
  matcher: ['/admin/:path*'],
}
