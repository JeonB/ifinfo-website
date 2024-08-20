import { dir } from 'i18next'
import NavBar from '../../components/NavBar'
import '../../styles/global.css'
import { languages } from '../i18n/settings'

export async function generateStaticParams() {
  return languages.map(lng => ({ lng }))
}
export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode
  params: { lng: string }
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <head>
        <title>(주)이프정보시스템</title>
        <meta
          name="description"
          content="글로벌뱅킹의 중심, (주)이프정보시스템"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <NavBar />
        <main>{children}</main>
        <footer>
          <p>&copy; {new Date().getFullYear()} (주)이프정보시스템</p>
        </footer>
      </body>
    </html>
  )
}
