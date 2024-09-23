'use client'
import logoImg from '@/assets/logo.png'
import { HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Collapse,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  StackDivider,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import LocaleSwitcher from '../LocaleSwitcher'
import classes from './navbar.module.css'
export const MobileHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [toggle, setToggle] = useState(false)
  const onToggle = () => setToggle(!toggle)
  const t = useTranslations('Header')
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
              align="stretch">
              <Box h="40px" bg="yellow.200">
                <Link className={classes.a} href="/company">
                  {t('about_us')}
                </Link>
                <Button onClick={onToggle}>{t('about_us')}</Button>
                <Collapse in={toggle} animateOpacity>
                  <Box
                    p="40px"
                    color="white"
                    mt="4"
                    bg="teal.500"
                    rounded="md"
                    shadow="md">
                    Test
                  </Box>
                </Collapse>
              </Box>
              <Box h="40px" bg="green.200" onClick={onClose}>
                <Link className={classes.a} href="/business">
                  {t('business')}
                </Link>
              </Box>
              <Box h="40px" bg="blue.200" onClick={onClose}>
                <Link className={classes.a} href="/product">
                  {t('product')}
                </Link>
              </Box>
              <Box h="40px" bg="tomato" onClick={onClose}>
                <Link className={classes.a} href="/recruit">
                  {t('career')}
                </Link>
              </Box>
            </VStack>
          </DrawerBody>
          <DrawerFooter>하단 내용</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default MobileHeader
