'use client'
import logoImg from '@/assets/logo.png'
import { Link } from '@/navigation'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import classes from './navbar.module.css'
export default function NavBar() {
  const LocaleSwitcher = dynamic(() => import('./LocaleSwitcher'), {
    ssr: false,
  })
  const t = useTranslations('Header')
  return (
    <nav className={classes.nav}>
      <Link href="/">
        <Image src={logoImg} alt="logo" className={classes.logo} />
      </Link>
      <ul className={classes.ul}>
        <li className={classes.li}>
          <Link className={classes.a} href="/company">
            {t('about_us')}
          </Link>
        </li>
        <li className={classes.li}>
          <Link className={classes.a} href="/business">
            {t('business')}
          </Link>
        </li>
        <li className={classes.li}>
          <Link className={classes.a} href="/product">
            {t('product')}
          </Link>
        </li>
        <li className={classes.li}>
          <Link className={classes.a} href="/recruit">
            {t('career')}
          </Link>
        </li>
        <li className={classes.li}>
          <LocaleSwitcher />
        </li>
      </ul>
    </nav>
  )
}
