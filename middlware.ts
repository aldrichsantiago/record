import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth/verify-token"

const PUBLIC_ROUTES = ["/login"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (PUBLIC_ROUTES.includes(pathname)) {
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
  matcher: ["/dashboard/:path*", "/api/:path*"],
}