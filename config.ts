import { LocalePrefix } from 'next-intl/routing'

export const defaultLocale = 'en' as const
export const locales = ['en', 'ko', 'my'] as const

export const localePrefix: LocalePrefix<typeof locales> = 'always'
