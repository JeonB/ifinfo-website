import { LocalePrefix } from 'next-intl/routing'

export const defaultLocale = 'en' as const
export const locales = ['en', 'ko', 'my'] as const

// export const pathnames = {
//   '/': '/',
//   '/pathnames': {
//     en: '/pathnames',
//     ko: '/경로',
//     my: '/tester',
//   },
// } satisfies Pathnames<typeof locales>

export const localePrefix: LocalePrefix<typeof locales> = 'always'
