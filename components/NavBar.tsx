'use client'
import logoImg from '@/assets/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import classes from './navbar.module.css'
export default function NavBar() {
  return (
    <nav className={classes.nav}>
      <ul className={classes.ul}>
        <li>
          <Link className={classes.a} href="/">
            <Image src={logoImg} alt="logo" width={200}></Image>
          </Link>
        </li>
        <li>
          <Link className={classes.a} href="/about">
            About
          </Link>
        </li>
        <li>
          <Link className={classes.a} href="/contact">
            Contact
          </Link>
        </li>
      </ul>
      {/* <style jsx>{`
        nav {
          background: #333;
          padding: 1em;
        }
        ul {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        li {
          margin-right: 1em;
        }
        a {
          color: white;
          text-decoration: none;
        }
      `}</style> */}
    </nav>
  )
}
