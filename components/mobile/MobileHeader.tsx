'use client'
import logoImg from '@/assets/logo.png'
import { HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
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
import Image from 'next/image'
import Link from 'next/link'
import LocaleSwitcher from '../LocaleSwitcher'
import classes from './navbar.module.css'
export const MobileHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Flex justifyContent="space-between">
        <Link href="/" style={{ width: '30%', padding: 5 }}>
          <Image src={logoImg} alt="logo" />
        </Link>
        <Button
          onClick={onOpen}
          fontSize={{ base: 'xl', md: 'md' }}
          border="none">
          <HamburgerIcon />
        </Button>
      </Flex>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontSize={{ base: '3xl', md: 'sm' }}>메뉴</DrawerHeader>
          <DrawerBody>
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={4}
              align="stretch">
              <Box h="40px" bg="yellow.200" onClick={onClose}>
                <Link className={classes.a} href="/company">
                  COMPANY
                </Link>
              </Box>
              <Box h="40px" bg="green.200" onClick={onClose}>
                <Link className={classes.a} href="/business">
                  BUSINESS
                </Link>
              </Box>
              <Box h="40px" bg="blue.200" onClick={onClose}>
                <Link className={classes.a} href="/product">
                  PRODUCT
                </Link>
              </Box>
              <Box h="40px" bg="tomato" onClick={onClose}>
                <Link className={classes.a} href="/recruit">
                  RECRUIT
                </Link>
              </Box>
              <Box h="40px" bg="pink.100" onClick={onClose}>
                <LocaleSwitcher />
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
