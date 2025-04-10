import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  if (token) {
    return NextResponse.next()
  }
  const url = new URL(request.url).pathname = '/login'
  return NextResponse.redirect(url.toString())
}

export const config = {
  matcher: "/dashboard/:path*",
};


