'use client'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (response.ok) {
      router.push('/ko/company/history-timeline/manage')
    } else {
      alert('로그인 실패')
    }
  }

  return (
    <Flex direction="column" align="center" justify="center" minH="100vh">
      <Box maxW="400px" w="100%" p={4} borderWidth={1} borderRadius="lg">
        <Text fontWeight="bold" fontSize="2xl" mb={4}>
          로그인
        </Text>
        <VStack spacing={4} align="start">
          <FormControl>
            <FormLabel>이메일</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="이메일 입력"
            />
          </FormControl>
          <FormControl>
            <FormLabel>비밀번호</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="비밀번호 입력"
            />
          </FormControl>
          <Button colorScheme="blue" onClick={handleLogin}>
            로그인
          </Button>
        </VStack>
      </Box>
    </Flex>
  )
}
