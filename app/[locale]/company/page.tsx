'use client'
import FadeInview from '@/components/common/utill/FadeInview'
import { Box, Flex, Heading } from '@chakra-ui/react'
import 'react-multi-carousel/lib/styles.css'
import './card-styles.css'
export default function Company() {
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
            size="3xl"
            style={{
              fontStyle: 'italic',
              textAlign: 'center',
            }}>
            Company
          </Heading>
          <Heading
            className="mainSection1text"
            size="lg"
            style={{
              textAlign: 'center',
              fontWeight: '400',
              marginTop: 10,
            }}></Heading>
        </Box>
      </Flex>
    </FadeInview>
  )
}
