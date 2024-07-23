import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/shared/utils/supabase/server";

const publicRoutes = ["/login", "/api", "/_next", "/public"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  if (pathname.match(/\.(ico|png|jpg|jpeg|svg|gif)$/)) {
    return NextResponse.next();
  }

  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!favicon\\.ico|sitemap\\.xml|robots\\.txt).*)"],
};
