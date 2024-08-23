import NavBar from '@/components/NavBar'
import { ColorModeScript } from '@chakra-ui/react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Providers } from './providers'
import { Footer } from './[locale]/components/Footer/Footer'
export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()
  return (
    <html lang={locale}>
      <head>
        <title>(주)이프정보시스템</title>
        <link rel="icon" href="images/favicon.ico" />
        <meta
          name="description"
          content="글로벌뱅킹의 중심, (주)이프정보시스템"
        />
      </head>
      <body
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <NavBar />
            <ColorModeScript />
            <main style={{ flex: '1' }}>{children}</main>
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
