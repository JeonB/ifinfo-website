'use client'
import logoImg from '@/assets/logo.png'
import { Link } from '@/navigation'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import classes from './navbar.module.css'
export default function NavBar() {
  const LocaleSwitcher = dynamic(() => import('./LocaleSwitcher'), {
    ssr: false,
  })
  return (
    <nav className={classes.nav}>
      <Link href="/">
        <Image src={logoImg} alt="logo" className={classes.logo} />
      </Link>
      <ul className={classes.ul}>
        <li className={classes.li}>
          <Link className={classes.a} href="/about">
            COMPANY
          </Link>
        </li>
        <li className={classes.li}>
          <Link className={classes.a} href="/contact">
            BUSINESS
          </Link>
        </li>
        <li className={classes.li}>
          <Link className={classes.a} href="/product">
            PRODUCT
          </Link>
        </li>
        <li className={classes.li}>
          <Link className={classes.a} href="/recruit">
            RECRUIT
          </Link>
        </li>
        <li className={classes.li}>
          <LocaleSwitcher />
        </li>
      </ul>
    </nav>
  )
}
