import { type NextRequest, NextResponse } from "next/server";

//TODO - 대소문자 rewrite route
const Middleware = (req: NextRequest) => {
  if (req.nextUrl.pathname === req.nextUrl.pathname.toLowerCase())
    return NextResponse.next();

  return NextResponse.redirect(
    new URL(req.nextUrl.origin + req.nextUrl.pathname.toLowerCase())
  );
};

export default Middleware;
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
