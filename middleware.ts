import { type NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-change-this-in-production")

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Protect admin routes (but not API routes - they handle auth differently)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login") && !pathname.startsWith("/admin/api")) {
    const token = request.cookies.get("admin_session")?.value

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    try {
      await jwtVerify(token, secret)
      return NextResponse.next()
    } catch (error) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
