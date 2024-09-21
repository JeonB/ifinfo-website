import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

// Can be imported from a shared config
const locales = ['ko', 'en']

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound()
  // 각각의 JSON 파일을 import하여 합친다
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
