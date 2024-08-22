'use client'
import NavBar from '@/components/NavBar'
import { ColorModeScript } from '@chakra-ui/react'
import { Providers } from './providers'
import { Footer } from './[lng]/components/Footer/Footer'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <title>(주)이프정보시스템</title>
        <meta
          name="description"
          content="글로벌뱅킹의 중심, (주)이프정보시스템"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}>
        <Providers>
          <NavBar />
          <ColorModeScript />
          <main style={{ flex: '1' }}>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
