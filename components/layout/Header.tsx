import { ChevronDownIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { useMediaQuery } from '@chakra-ui/media-query'
import {
  Box,
  Button,
  Collapse,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  // Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Stack,
  Text,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
// states
import dynamic from 'next/dynamic'
import { authSeletor } from '~/states/auth/selector'
import { CommonState } from '~/states/biz/CommonAtom'
import FadeInview from '../common/utill/FadeInview'
// import { LocaleSwitcher } from '~/components/common/locale'

export const Header = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  // status 'loading' | 'authenticated' | 'unauthenticated'
  const { status } = useSession()
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onToggle } = useDisclosure()
  const [isSmallScreen] = useMediaQuery('(min-width:750px)')

  const [authState, setAuthState] = useState(false)
  const authValue = useRecoilValue<any>(authSeletor)
  const setAuthValue = useSetRecoilState(authSeletor)

  const LocaleSwitcher = dynamic(
    () => import('~/components/common/locale/index'),
    { ssr: false },
  )

  useEffect(() => {
    // 세션값 있고, 세션스토리지 값 없으면 로그아웃 처리
    if (status === 'authenticated') {
      console.log('authValue >>', authValue)
      if (!authValue) {
        setAuthValue(null)
        setAuthState(false)

        signOut({ callbackUrl: '/', redirect: true })
      }
    }
  }, [status])

  const onClickSignOut = useCallback(() => {
    setAuthValue(null)
    setAuthState(false)

    signOut({ callbackUrl: '/', redirect: true })
  }, [])

  return (
    <FadeInview type="scale" range="0.3">
      <Box>
        <Flex
          bg="white"
          color={useColorModeValue('gray.500', 'gray.200')}
          minH={'60px'}
          py={{ base: 6 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          align={'center'}>
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}>
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          <Flex
            display={{ base: 'none', md: 'flex' }}
            flex={{ base: 1 }}
            justify={{ base: 'center', md: 'start' }}>
            <Text
              as="b"
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontFamily={'heading'}
              color={'gbs.a'}
              fontSize={'38'}
              ml={5}>
              <Link href="/">GBS</Link>
            </Text>
            <Flex display={{ base: 'none', md: 'flex' }} ml={10} mt={4}>
              <DesktopNav />
            </Flex>
          </Flex>

          <Stack
            flex={{ base: 1, md: 'auto' }}
            justify={'flex-end'}
            direction={'row'}
            spacing={1}>
            {status === 'authenticated' ? (
              <Text
                mt="6px"
                color={'black'}
                display={{ base: 'none', md: 'flex' }}>
                {t('header.greet.header_greet')} {authValue?.UserNm}
                {t('header.greet.last_greet')}
              </Text>
            ) : status === 'loading' ? (
              <Spinner size="md" />
            ) : (
              <Text
                mt="6px"
                color={'black'}
                display={{ base: 'none', md: 'flex' }}>
                {t('header.greet.info_greet')}
              </Text>
            )}
            <LocaleSwitcher />
            {status === 'authenticated' ? (
              <>
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    color={'black'}
                    display={{ base: 'none', md: 'flex' }}>
                    {authValue?.UserNm}
                  </MenuButton>
                  <MenuList color={'black'}>
                    <MenuItem>
                      <Link href={'/biz/CL5551M01'}>
                        {t('header.submenu.loan_appl_list')}
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href={'/biz/CM1011M01'}>
                        {t('CM1011M01.title.account_list')}
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href={'/auth/UserInfo'}>
                        {t('header.submenu.user_info')}
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={onClickSignOut}>
                      {t('header.sign.sign-out')}
                    </MenuItem>
                  </MenuList>
                </Menu>
                <Button
                  fontSize={'19px'}
                  sx={{
                    borderStyle: 'none',
                  }}
                  display={{ base: 'flex', md: 'none' }}
                  _hover={{
                    backgroundColor: 'none',
                  }}
                  _active={{
                    backgroundColor: 'none',
                  }}
                  onClick={onClickSignOut}>
                  {t('header.sign.sign-out')}
                </Button>
              </>
            ) : status === 'loading' ? (
              <Spinner size="md" />
            ) : (
              <Button
                fontSize={'19px'}
                sx={{
                  borderStyle: 'none',
                }}
                _hover={{
                  backgroundColor: 'none',
                }}
                _active={{
                  backgroundColor: 'none',
                }}
                onClick={() => {
                  router.push('/auth/SignIn', '/auth/SignIn', {
                    locale: router.locale,
                  })
                }}>
                {t('header.sign.sign-in')}
              </Button>
            )}

            {/* <Button onClick={toggleColorMode}> {colorMode === 'light' ? <MoonIcon /> : <SunIcon />} </Button> */}
          </Stack>
        </Flex>
        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Box>
    </FadeInview>
  )
}

const DesktopNav = () => {
  const router = useRouter()
  const linkColor = useColorModeValue('gray.600', 'gray.200')
  const linkHoverColor = useColorModeValue('gray.800', 'white')
  const popoverContentBgColor = useColorModeValue('white', 'gray.800')
  // const [menuOn, setMenuOn] = useState('')
  // const [menuOn, setMenuOn] = useRecoilState(CommonState)
  const menuOn = useRecoilValue(CommonState)

  const { t } = useTranslation('common')

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map(navItem => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Box
                color={navItem.label === menuOn ? 'gbs.a' : 'black'}
                fontSize={20}
                fontWeight={navItem.label === menuOn ? '600' : ''}
                pl={3}>
                <Link
                  href={navItem.href ?? '#'}
                  locale={router.locale}
                  color={linkColor}>
                  {/* {navItem.label} */}
                  {t(navItem.label)}
                </Link>
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={'solid 1px #CECECE'}
                bg={popoverContentBgColor}
                p={4}
                borderRadius={'7px'}
                width={'220px'}
                minH={'110px'}>
                <Stack>
                  {navItem.children.map(child => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  )
}

const DesktopSubNav = ({ label, href, subLabel, etc }: NavItem) => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const [menuOn, setMenuOn] = useRecoilState<any>(CommonState)
  return (
    <Link
      href={href ?? '#'}
      locale={router.locale}
      role={'group'}
      onClick={() => {
        setMenuOn(etc)
      }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            fontWeight={500}
            _groupHover={{ color: 'black' }}
            fontSize={'19.5px'}
            margin-top={'25px'}>
            {t(label)}
          </Text>
          <Text fontSize={'18px'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}></Flex>
      </Stack>
    </Link>
  )
}

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}>
      {NAV_ITEMS.map(navItem => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  )
}

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure()
  const { t } = useTranslation('common')

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}>
          {t(label)}
        </Text>

        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map(child => (
              <Link key={child.label} href={child.href ?? '#'}>
                {t(child.label)}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}

interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href?: string
  etc?: string
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'header.menu.about',
    children: [
      {
        label: 'header.submenu.company_about',
        href: '/biz/aboutAs',
        etc: 'header.menu.about',
      },
      {
        label: 'header.submenu.branch_about',
        href: '/biz/Branch',
        etc: 'header.menu.about',
      },
    ],
  },
  {
    label: 'header.menu.product',
    children: [
      {
        label: 'header.submenu.prd_list',
        href: '/biz/IB200PM01',
        etc: 'header.menu.product',
      },
    ],
  },
  {
    label: 'header.menu.notice',
    children: [
      {
        label: 'header.submenu.notice_list',
        href: '/biz/CM1461M01',
        etc: 'header.menu.notice',
      },
    ],
  },
  {
    label: 'header.menu.qna',
    children: [
      {
        label: 'header.submenu.qna_list',
        href: '/biz/IB1462M01',
        etc: 'header.menu.qna',
      },
    ],
  },
  // {
  //   label: 'Test',
  //   children: [
  //     {
  //       label: 'swr',
  //       subLabel: 'swr test',
  //       href: '/test/swr',
  //     },
  //     {
  //       label: 'React Query',
  //       href: '/test/query',
  //     },
  //     {
  //       label: 'session',
  //       href: '/test/session',
  //     },
  //     {
  //       label: 'sample',
  //       href: '/test/sample',
  //     },
  //     {
  //       label: 'CSR(Client Side Rendering)',
  //       href: '/test/csr',
  //     },
  //     {
  //       label: 'SSR(Server Side Rendering)',
  //       href: '/test/ssr',
  //     },
  //     {
  //       label: 'SSG(Static Site Generation)',
  //       href: '/test/ssg',
  //     },
  //     {
  //       label: 'ISR(Incremental Static Regeneration)',
  //       href: '/test/isr',
  //     },
  //   ],
  // },
  // {
  //   label: 'Biz',
  //   children: [
  //     {
  //       label: 'CM1011M01',
  //       href: '/biz/CM1011M01',
  //     },
  //     {
  //       label: '정보수정',
  //       href: '/auth/UserInfo',
  //     },
  //     {
  //       label: 'CL5551M01',
  //       href: '/biz/CL5551M01',
  //     },
  //     {
  //       label: 'Home',
  //       href: '/',
  //     },
  //     {
  //       label: 'Oversea Branch Banking',
  //       href: '#',
  //     },
  //     {
  //       label: 'Statutory Report[Korea]',
  //       href: '#',
  //     },
  //     {
  //       label: 'Statutory Report[Other]',
  //       href: '#',
  //     },
  //   ],
  // },
  // {
  //   label: 'Product',
  //   children: [
  //     {
  //       label: 'GBS',
  //       href: '#',
  //     },
  //     {
  //       label: 'IF-Framework',
  //       href: '#',
  //     },
  //     {
  //       label: 'IF-TradeFinance',
  //       href: '#',
  //     },
  //     {
  //       label: 'IF-Accounting',
  //       href: '#',
  //     },
  //     {
  //       label: 'IF-Loan',
  //       href: '#',
  //     },
  //     {
  //       label: 'IF-Deposit',
  //       href: '#',
  //     },
  //     {
  //       label: 'IF-Reconcile',
  //       href: '#',
  //     },
  //     {
  //       label: 'IF-Foreign Exchange',
  //       href: '#',
  //     },
  //   ],
  // },
  // {
  //   label: 'Recruit',
  //   children: [
  //     {
  //       label: 'Recruit',
  //       href: '#',
  //     },
  //     {
  //       label: 'Human Resources',
  //       href: '#',
  //     },
  //   ],
  // },
  // {
  //   label: 'Intranet',
  //   href: '#',
  // },
]
