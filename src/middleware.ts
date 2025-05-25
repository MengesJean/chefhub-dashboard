// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login", "/favicon.ico", "/robots.txt"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Autoriser les chemins publics
  if (PUBLIC_PATHS.includes(pathname) || pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  const token = req.cookies.get("access_token")?.value;
  console.log("Token is", token);
  if (!token) {
    console.log("No token found, redirecting to login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
