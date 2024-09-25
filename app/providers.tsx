'use client'

import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource/open-sans/700.css'
import '@fontsource/raleway/400.css'
import theme from './theme'
export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
