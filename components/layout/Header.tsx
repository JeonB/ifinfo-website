'use client'

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
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useTranslation } from '../../app/i18n'
import FadeInview from '../common/utill/FadeInview'

export const Header = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onToggle } = useDisclosure()
  const [isSmallScreen] = useMediaQuery('(min-width:750px)')

  const [authState, setAuthState] = useState(false)

  const LocaleSwitcher = dynamic(
    () => import('~/components/common/locale/index'),
    { ssr: false },
  )

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
                  </MenuList>
                </Menu>
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
]
