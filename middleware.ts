import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth/verify-token"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname.startsWith("/api/login") ||
    pathname.startsWith("/api/signup")
  ) {
    return NextResponse.next()
  }

  const token = request.cookies.get("access_token")?.value

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  const valid = await verifyToken(token)

  if (!valid) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/api/:path*"],
}