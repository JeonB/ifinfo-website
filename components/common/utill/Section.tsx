'use client'
import FadeInview from '@/components/common/utill/FadeInview'
import { Box, Flex, Heading } from '@chakra-ui/react'
import 'react-multi-carousel/lib/styles.css'
export const Section = ({
  children,
  title,
  description,
}: {
  children?: React.ReactNode
  title: string
  description: string
}) => {
  return (
    <FadeInview type="scale" range={0.3}>
      <Flex
        justify="center"
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}>
        <Box style={{ width: '100%', marginBottom: '3em' }}>
          <Heading
            className="mainSection1text"
            size={{ base: 'lg', md: '3xl' }} // 반응형 폰트 크기 설정
            style={{
              fontStyle: 'italic',
              textAlign: 'center',
            }}>
            {title}
          </Heading>
          <Heading
            className="mainSection1text"
            size={{ base: 'sm', md: 'lg' }} // 반응형 폰트 크기 설정
            style={{
              textAlign: 'center',
              fontWeight: '400',
              marginTop: 10,
            }}>
            {description}
          </Heading>
          {children}
        </Box>
      </Flex>
    </FadeInview>
  )
}
