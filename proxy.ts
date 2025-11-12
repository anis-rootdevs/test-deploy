import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { routes } from "./config/routes";
import { extractRoutes, isTokenExpired } from "./lib/utils";

const secret = process.env.NEXTAUTH_SECRET;

function isProtectedRoute(pathname: string): boolean {
  const adminRoutes = extractRoutes(routes.privateRoutes.admin);
  return adminRoutes.some((route) => pathname.startsWith(route));
}

export async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret });
  const { pathname } = req.nextUrl;

  const isProtected = isProtectedRoute(pathname);

  if (isProtected && (!token || isTokenExpired(token.exp))) {
    const loginUrl = new URL(routes.publicRoutes.adminLogin, req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === routes.publicRoutes.adminLogin && token) {
    return NextResponse.redirect(
      new URL(routes.privateRoutes.admin.dashboard, req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
