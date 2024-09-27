'use client'
import logoImg from '@/public/images/logo.png'
import { ChevronDownIcon, ChevronUpIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Collapse,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  StackDivider,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import LocaleSwitcher from '../../common/LocaleSwitcher'
import classes from './navbar.module.css'
export const MobileHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [toggle, setToggle] = useState(false)
  const onToggle = () => setToggle(!toggle)
  const t = useTranslations()
  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Link href="/" className={classes.logo}>
          <Image src={logoImg} alt="logo" />
        </Link>
        <Button
          onClick={onOpen}
          paddingRight={4}
          fontSize={{ base: 'lg', lg: 'xl' }}
          border="none">
          <HamburgerIcon boxSize={'1.8em'} />
        </Button>
      </Flex>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader
            fontSize={{ base: 'sm', md: 'sm' }}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: '0 1em',
            }}>
            <Link href="/" onClick={onClose}>
              <Image src={logoImg} alt="logo" style={{ width: '7em' }} />
            </Link>
            <Box margin="0 2em 0 0">
              <LocaleSwitcher />
            </Box>
          </DrawerHeader>
          <DrawerBody>
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={4}
              padding={'2em 0 0 1em'}
              align="stretch">
              <Box>
                <Heading
                  whiteSpace={'nowrap'}
                  fontSize={['lg', 'xl', '2xl', '3xl']}
                  onClick={onToggle}>
                  {t('Header.about_us')}
                  {toggle ? (
                    <ChevronUpIcon ml={'1em'} />
                  ) : (
                    <ChevronDownIcon ml={'1em'} />
                  )}
                </Heading>
                <Collapse in={toggle} animateOpacity>
                  <Box p="1em" color="white" mt="4" rounded="md" shadow="md">
                    <Link
                      className={classes.a}
                      href="/company/introduction"
                      onClick={onClose}>
                      {t('Header.about_us')}
                    </Link>
                    <Link
                      className={classes.a}
                      href="/company/history-timeline"
                      onClick={onClose}>
                      {t('Company.history')}
                    </Link>
                    <Link
                      className={classes.a}
                      href="/company/ceo-greeting"
                      onClick={onClose}>
                      {t('Company.ceo')}
                    </Link>
                    {/* <Link
                      className={classes.a}
                      href="/company/office"
                      onClick={onClose}>
                      {t('about_us')}
                    </Link> */}
                  </Box>
                </Collapse>
              </Box>
              <Heading fontSize={['lg', 'xl', '2xl', '3xl']} onClick={onClose}>
                <Link className={classes.a2} href="/business">
                  {t('Header.business')}
                </Link>
              </Heading>
              <Heading fontSize={['lg', 'xl', '2xl', '3xl']} onClick={onClose}>
                <Link className={classes.a2} href="/product">
                  {t('Header.product')}
                </Link>
              </Heading>
              <Heading fontSize={['lg', 'xl', '2xl', '3xl']} onClick={onClose}>
                <Link className={classes.a2} href="/recruit">
                  {t('Header.career')}
                </Link>
              </Heading>
            </VStack>
          </DrawerBody>
          {/* <DrawerFooter>하단 내용</DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default MobileHeader
