import { createSharedPathnamesNavigation } from 'next-intl/navigation'

export const { Link, usePathname, useRouter } =
  createSharedPathnamesNavigation()
