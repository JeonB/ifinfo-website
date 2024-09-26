'use client'
import { Link } from '@/navigation'
import logoImg from '@/public/images/logo.png'
import { Text } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import classes from './navbar.module.css'

export default function NavBar() {
  const LocaleSwitcher = dynamic(() => import('../common/LocaleSwitcher'), {
    ssr: false,
  })
  const t = useTranslations()

  return (
    <div className={classes.container}>
      <nav className={classes.nav}>
        <Link href="/">
          <Image src={logoImg} alt="logo" className={classes.logo} />
        </Link>
        <ul className={classes.ul}>
          <li className={classes.li}>
            <Text className={classes.a}>{t('Header.about_us')}</Text>
            <ul className={classes.submenu}>
              <li>
                <Link href="/company/introduction">{t('Header.about_us')}</Link>
              </li>
              <li>
                <Link href="/company/history-timeline">
                  {t('Company.history')}
                </Link>
              </li>
              <li>
                <Link href="/company/ceo-greeting">{t('Company.ceo')}</Link>
              </li>
            </ul>
          </li>
          <li className={classes.li}>
            <Link className={classes.a} href="/business">
              {t('Header.business')}
            </Link>
            {/* <ul className={classes.submenu}>
              <li>
                <Link href="/business/strategy">{t('strategy')}</Link>
              </li>
              <li>
                <Link href="/business/partners">{t('partners')}</Link>
              </li>
            </ul> */}
          </li>
          <li className={classes.li}>
            <Link className={classes.a} href="/product">
              {t('Header.product')}
            </Link>
            {/* <ul className={classes.submenu}>
              <li>
                <Link href="/product/features">{t('features')}</Link>
              </li>
              <li>
                <Link href="/product/pricing">{t('pricing')}</Link>
              </li>
            </ul> */}
          </li>
          <li className={classes.li}>
            <Link className={classes.a} href="/recruit">
              {t('Header.career')}
            </Link>
            {/* <ul className={classes.submenu}>
              <li>
                <Link href="/recruit/openings">{t('openings')}</Link>
              </li>
              <li>
                <Link href="/recruit/apply">{t('apply')}</Link>
              </li>
            </ul> */}
          </li>
        </ul>
        <LocaleSwitcher />
      </nav>
    </div>
  )
}
