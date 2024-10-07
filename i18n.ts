import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

const locales = ['ko', 'en']

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound()

  const commonMessages = (
    await import(`./app/i18n/locales/${locale}/common.json`)
  ).default
  const footerMessages = (
    await import(`./app/i18n/locales/${locale}/footer.json`)
  ).default
  const indexMessages = (
    await import(`./app/i18n/locales/${locale}/index.json`)
  ).default
  return {
    messages: { ...commonMessages, ...footerMessages, ...indexMessages },
    timeZone: 'Asia/Seoul',
  }
})
