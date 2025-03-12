import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const adminPath = "/admin"
  const loginPath = "/admin/login"

  // Check if the path starts with /admin but is not the login page
  if (request.nextUrl.pathname.startsWith(adminPath) && request.nextUrl.pathname !== loginPath) {
    // For simple password protection, we'll still use the URL parameter approach
    const adminSecret = request.nextUrl.searchParams.get("secret")

    if (adminSecret !== process.env.ADMIN_SECRET) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    // For a more robust solution, you could use Supabase Auth here
    // This would require setting up cookies and session management
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/admin/:path*",
}

