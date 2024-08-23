'use client'
import { useRouter } from '@/navigation'
import {
  Box,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
export const LocaleSwitcher = () => {
  const router = useRouter()
  const pathname = usePathname()
  console.log('pathname', pathname)
  const handleLocaleChange = (locale: string) => {
    // 정규 표현식을 사용하여 URL에서 첫 번째 로케일 부분을 찾아 새 로케일로 대체
    const newPath = pathname.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, `/${locale}`)

    // 업데이트된 URL로 라우팅
    router.push(newPath)
  }
  return (
    <Box>
      <Box borderWidth="1px" borderRadius="md" borderStyle="none" px={4} h={10}>
        <Menu>
          <MenuButton>
            <Image src="/images/locale.png" alt="test" />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleLocaleChange('en-US')}>
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
