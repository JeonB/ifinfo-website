'use client'

import { Box, Flex, Heading, Image, Text, VStack } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'

const CeoGreeting = () => {
  const t = useTranslations('CeoGreeting')
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      py="10"
      px="4">
      <Heading as="h1" size="2xl" mb="8">
        {t('heading')}
      </Heading>

      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="center"
        maxW="1200px">
        <Box mb={{ base: 8, md: 0 }} mr={{ md: 8 }} pb={{ md: '8em' }}>
          <Image
            src="/images/ceo.png"
            alt="CEO Image"
            objectFit="cover"
            borderRadius="md"
          />
        </Box>

        <VStack
          align="start"
          spacing="4"
          maxW="800px"
          color="#222"
          fontFamily="'Nanum Gothic', sans-serif">
          <Text fontSize="lg" lineHeight="tall">
            {t('thankYou')}
          </Text>
          <Text fontSize="lg" lineHeight="tall">
            {t('companyIntro')}
          </Text>

          <Text fontSize="lg" lineHeight="tall">
            {t('companyExpertise')}
          </Text>

          <Text fontSize="lg" lineHeight="tall">
            {t('coreValues')}
          </Text>

          <Text fontSize="lg" lineHeight="tall">
            {t('commitment')}
          </Text>

          <Text fontWeight="bold" alignSelf="flex-end" display={'inline'}>
            {t('ceoTitle')}
          </Text>
          <Text
            alignSelf="flex-end"
            fontFamily="'Nanum Pen Script', cursive"
            fontSize="4xl">
            {t('ceoName')}
          </Text>
        </VStack>
      </Flex>
    </Flex>
  )
}

export default CeoGreeting
