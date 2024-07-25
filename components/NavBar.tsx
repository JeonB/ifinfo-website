"use client";
import Link from "next/link";
import classes from "./navbar.module.css";
import Image from "next/image";
import logoImg from "@/assets/logo.png";
export default function NavBar() {
  return (
    <nav className={classes.nav}>
      <ul className={classes.ul}>
        <li>
          <Link href="/">
            <Image src={logoImg} alt="logo" priority></Image>이프정보시스템
          </Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
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
  );
}
