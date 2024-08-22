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
    <Box bg={'gbs.g'} color={useColorModeValue('gray.500', 'gray.200')}>
      <Container as={Stack} maxW={'6xl'} py={10}>
        <Flex justifyContent={'space-between;'}>
          <Box>
            <Stack>
              <Text fontSize={'13px'}>
                <span className="footSpan">대출문의 02.6383.3104</span> |
                영업시간 09:00 ~ 17:00
              </Text>
            </Stack>

            <Stack>
              <Text mt={'15px'} fontSize={'13px'}>
                <span className="footSpan">기타문의 02.6383.3101</span> |
                영업시간 09:00 ~ 17:00
              </Text>
            </Stack>
          </Box>

          <Stack mt={'18px'}>
            <Text color={'#505050'} fontSize={'13px'}>
              <span className="footSpan">대표지점</span> 서울시 강서구 마곡서로
              152, 두산더랜드타워, B동
            </Text>
          </Stack>
        </Flex>
      </Container>
    </Box>
  )
}
