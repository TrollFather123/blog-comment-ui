import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const has_token = request.cookies.get("token")?.name;

  if (has_token === undefined || has_token === null) {
    request.nextUrl.pathname = "/login";

    return NextResponse.redirect(request.nextUrl);
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/","/create-blog"]
};
