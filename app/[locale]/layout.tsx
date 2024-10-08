import ClientLayout from '@/components/layout/ClientLayout'
import { Footer } from '@/components/layout/Footer'
import { locales } from '@/config'
import '@/styles/global.css'
import { NextIntlClientProvider } from 'next-intl'
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from 'next-intl/server'
import { Providers } from '../providers'

type Props = {
  children: React.ReactNode
  params: { locale: string }
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  unstable_setRequestLocale(locale)

  const messages = await getMessages()
  const t = await getTranslations({ locale, namespace: 'LocaleLayout' })

  return (
    <html lang={locale}>
      <head>
        <title>{t('title')}</title>
        <link rel="icon" href="/images/favicon.ico" />
        <meta name="description" content={t('description')} />
      </head>
      <body>
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <div className="container">
              <ClientLayout>{children}</ClientLayout>
              <Footer />
            </div>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}
