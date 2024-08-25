'use client'
import { usePathname, useRouter } from '@/navigation'
import {
  Box,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export const LocaleSwitcher = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [locale, setLocale] = useState<string>('')

  const handleLocaleChange = (locale: string) => {
    // 업데이트된 URL로 라우팅
    setLocale(locale)
  }

  useEffect(() => {
    if (locale) {
      const pathWithoutLocale = pathname.replace(/^\/(en|ko|my)(\/|$)/, '')
      const newPath = `/${pathWithoutLocale === '' ? '/' : pathWithoutLocale}`
      router.replace(newPath, { locale: locale })
    }
  }, [locale])

  return (
    <Box>
      <Box borderWidth="1px" borderRadius="md" borderStyle="none" px={8} h={10}>
        <Menu>
          <MenuButton>
            <Image src="/images/locale.png" alt="test" />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleLocaleChange('en')}>
              English
            </MenuItem>
            <MenuItem onClick={() => handleLocaleChange('ko')}>한국어</MenuItem>
            <MenuItem onClick={() => handleLocaleChange('my')}>
              မြန်မာဘာသာစကား
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  )
}

export default LocaleSwitcher
