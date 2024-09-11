import createMiddleware from 'next-intl/middleware'
import { defaultLocale, localePrefix, locales } from './config'

export default createMiddleware({
  defaultLocale,
  locales,
  localePrefix,
})

export const config = {
  // matcher: '/:lng*'
  matcher: [
    '/',
    '/(ko|en)/:path*',
    '/((?!api|_next/static|_next/image|assets|favicon.ico|.*\\..*|sw.js|site.webmanifest).*)',
  ],
}
