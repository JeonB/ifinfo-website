import type { ReactNode } from 'react'
import { Box, Container } from '@chakra-ui/react'
import { Header } from '~/components/layout/Header'
import { Footer } from '~/components/layout/Footer'

type LayoutProps = {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Container maxW="100%" p={0}>
      <Header />
      <Box as="main">{children}</Box>
      <Footer />
    </Container>
  )
}
