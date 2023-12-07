import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-eval' http://localhost:3000/;
    style-src 'unsafe-inline';
    style-src-elem 'unsafe-inline' http://localhost:3000/;
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim()
 
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
 
  requestHeaders.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )
 
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  response.headers.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )

  // Session
  const session = await getToken({ req: request });

  const isAuthPage =
    request.nextUrl.pathname.startsWith("/signin") ||
    request.nextUrl.pathname.startsWith("/signup") ||
    request.nextUrl.pathname.startsWith("/reset");

  if (isAuthPage) {
    if (session) return NextResponse.redirect(new URL("/", request.url));

    return response;
  }

  if (!session) {
    const requestedPage = request.nextUrl.pathname;
    const newUrl = request.nextUrl.clone();

    newUrl.pathname = "/signin";
    newUrl.search = `p=${requestedPage}`;

    return NextResponse.redirect(newUrl);
  }

  return response;
}

export const config = {
  matcher: ["/", "/signin", "/signup", "/reset"],
  // source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
  missing: [
    { type: 'header', key: 'next-router-prefetch' },
    { type: 'header', key: 'purpose', value: 'prefetch' },
  ],
};
