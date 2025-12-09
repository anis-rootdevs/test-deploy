import { NextResponse } from "next/server";
import { auth } from "./app/api/auth/[...nextauth]/auth";
import { routes } from "./config/routes";
import { extractRoutes } from "./lib/utils";

const secret = process.env.NEXTAUTH_SECRET;

function isProtectedRoute(pathname: string): boolean {
  const adminRoutes = extractRoutes(routes.privateRoutes.admin);
  return adminRoutes.some((route) => pathname.startsWith(route));
}

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const accessToken = req?.auth?.token;
  const isProtected = isProtectedRoute(pathname);

  if (isProtected && !accessToken) {
    const loginUrl = new URL(routes.publicRoutes.adminLogin, req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === routes.publicRoutes.adminLogin && accessToken) {
    return NextResponse.redirect(
      new URL(routes.privateRoutes.admin.dashboard, req.url)
    );
  }

  return NextResponse.next();
});
// export async function proxy(req: NextRequest) {
//   const token = await getToken({ req, secret });
//   const { pathname } = req.nextUrl;

//   // const isProtected = isProtectedRoute(pathname);

//   // if (isProtected && !token) {
//   //   const loginUrl = new URL(routes.publicRoutes.adminLogin, req.url);
//   //   return NextResponse.redirect(loginUrl);
//   // }

//   if (pathname === routes.publicRoutes.adminLogin && token) {
//     return NextResponse.redirect(
//       new URL(routes.privateRoutes.admin.dashboard, req.url)
//     );
//   }

//   return NextResponse.next();
// }

export const config = {
  matcher: ["/admin/:path*"],
};
