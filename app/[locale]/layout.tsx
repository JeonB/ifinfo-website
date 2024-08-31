import { Footer } from '@/components/layout/Footer'
import NavBar from '@/components/NavBar'
import { locales } from '@/config'
import { ColorModeScript } from '@chakra-ui/react'
import { NextIntlClientProvider } from 'next-intl'
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from 'next-intl/server'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import '../../styles/global.css'
import { Providers } from '../providers'
const inter = Inter({ subsets: ['latin'] })

type Props = {
  children: ReactNode
  params: { locale: string }
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale)

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()
  const t = await getTranslations({ locale, namespace: 'LocaleLayout' })
  return (
    <html lang={locale}>
      <head>
        <title>{t('title')}</title>
        <link rel="icon" href="images/favicon.ico" />
        <meta name="description" content={t('description')} />
      </head>
      <body>
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <div className="container">
              <NavBar />
              <ColorModeScript />
              <main style={{ flex: '1' }}>{children}</main>
            </div>
            <Footer />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}
