import createMiddleware from 'next-intl/middleware'
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['ko', 'en', 'my'],

  // Used when no locale matches
  defaultLocale: 'en',
})

export const config = {
  // matcher: '/:lng*'
  matcher: [
    '/',
    '/(ko|en|my)/:path*',
    '/((?!api|_next/static|_next/image|assets|favicon.ico|.*\\..*|sw.js|site.webmanifest).*)',
  ],
}
