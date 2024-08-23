'use client'
import {
  Box,
  Container,
  Flex,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

export const Footer = () => {
  return (
    <Box bg={'gbs.footer'} color={useColorModeValue('gbs.f', 'gbs.a')}>
      <Container as={Stack} maxW={'6xl'} py={10}>
        <Flex justifyContent={'space-between;'}>
          <Box>
            <Stack>
              <Text fontSize={'13px'}>
                <span className="footSpan">
                  주소 : 서울 강서구 마곡서로 152 두산더랜드타워 B동
                  801호(마곡동)
                </span>
              </Text>
            </Stack>

            <Stack>
              <Text mt={'15px'} fontSize={'13px'}>
                <span className="footSpan">대표번호 : 02-6383-3101</span> | 팩스
                : 02-6383-3104
              </Text>
            </Stack>
          </Box>

          <Box>
            <Stack>
              <Text fontSize={'13px'}>
                <span className="footSpan">
                  본 사이트의 콘텐츠는 저작권법의 보호를 받는바, 무단 전재,
                  복사, 배포 등을 금합니다.
                </span>
              </Text>
            </Stack>
            <Stack mt={'15px'}>
              <Text fontSize={'13px'}>
                <span className="footSpan">
                  &copy; 2001 - {new Date().getFullYear()} IF Information
                  Systems All Rights Reserved.
                </span>
              </Text>
            </Stack>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}
