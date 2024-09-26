import { isMobi } from '@/components/common/utill/device'
import { Footer } from '@/components/layout/Footer'
import MobileHeader from '@/components/layout/mobile/MobileHeader'
import NavBar from '@/components/layout/NavBar'
import { locales } from '@/config'
import '@/styles/global.css'
import { ColorModeScript } from '@chakra-ui/react'
import { NextIntlClientProvider } from 'next-intl'
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from 'next-intl/server'
import { headers } from 'next/headers'
import { ReactNode } from 'react'
import { Providers } from '../providers'

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

  const messages = await getMessages()
  const t = await getTranslations({ locale, namespace: 'LocaleLayout' })

  // 서버에서 헤더를 통해 user-agent 가져오기
  const userAgent = headers().get('user-agent') || ''
  const isMobile = isMobi(userAgent) // 모바일 여부 판별

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
              <header
                style={{
                  position: 'relative',
                  top: 0,
                  width: '100%',
                  zIndex: 1000,
                  backgroundColor: 'white',
                }}>
                {isMobile ? <MobileHeader /> : <NavBar />}
              </header>

              <ColorModeScript />
              <main>{children}</main>

              <Footer />
            </div>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}
