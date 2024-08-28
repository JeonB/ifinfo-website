import { createSharedPathnamesNavigation } from 'next-intl/navigation'

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation()
