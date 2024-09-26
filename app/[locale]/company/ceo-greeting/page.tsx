// app/ceo-greeting/page.tsx
'use client'

import { Box, Flex, Heading, Image, Text, VStack } from '@chakra-ui/react'

const CeoGreeting = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      py="10"
      px="4">
      <Heading as="h1" size="2xl" mb="8">
        CEO&apos;s Greeting
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
            저희 이프정보시스템을 방문해 주셔서 진심으로 감사드립니다.
          </Text>
          <Text fontSize="lg" lineHeight="tall">
            저희 회사는 국내 은행의 해외 지점 업무와 본점 국제 금융 업무의
            전산화를 담당한 인력이 중심이 되어 설립되었습니다. 사명인
            &quot;이프&quot; 역시 International Finance에서 따왔습니다.
          </Text>

          <Text fontSize="lg" lineHeight="tall">
            이프정보시스템은 런던, 도쿄, 홍콩, 싱가포르, 상하이 등 금융 중심
            도시에서 축적한 지식과 경험을 바탕으로 국제 금융 및 관련 분야의
            솔루션을 제공하고 있습니다. 우리는 순수 국내 제품을 국내외
            금융기관에 공급하며, 사회에 기여하는 기업이 되기 위해 노력하고
            있습니다.
          </Text>

          <Text fontSize="lg" lineHeight="tall">
            이프정보시스템은 금융 분야에서의 전문성과 창의성을 최우선 가치로
            삼고 있습니다. 우리는 고객에게 최적의 금융 솔루션을 제공함으로써
            고객 만족을 극대화하고, 해외 진출을 통해 글로벌 기업으로 성장하고자
            합니다.
          </Text>

          <Text fontSize="lg" lineHeight="tall">
            이 꿈을 이루기 위해 모든 임직원은 한 마음으로 오늘도 최선을 다하고
            있습니다.
          </Text>

          <Text fontWeight="bold" alignSelf="flex-end" display={'inline'}>
            (주)이프정보시스템 대표
          </Text>
          <Text
            alignSelf="flex-end"
            fontFamily="'Nanum Pen Script', cursive"
            fontSize="4xl">
            주준모
          </Text>
        </VStack>
      </Flex>
    </Flex>
  )
}

export default CeoGreeting
