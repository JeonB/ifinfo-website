'use client'

import {
  Box,
  Flex,
  HStack,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

type Event = {
  date: string
  description: string
}

type YearData = {
  year: number
  events: Event[]
}

const TimelineItem = ({ date, description }: Event) => (
  <HStack align="flex-start" spacing={4} position="relative">
    <Box>
      <Text fontWeight="bold" fontSize="sm" color="gray.500">
        {date}
      </Text>
      <Text>{description}</Text>
    </Box>
  </HStack>
)

const TimelineYear = ({
  year,
  events,
  isLast,
}: {
  year: YearData['year']
  events: YearData['events']
  isLast: boolean
}) => {
  const yearRef = useRef<HTMLDivElement>(null)
  const [lineHeight, setLineHeight] = useState(0)

  useEffect(() => {
    if (yearRef.current) {
      // 요소의 실제 높이를 계산하여 lineHeight 설정
      setLineHeight(yearRef.current.clientHeight)
    }
  }, [events])

  return (
    <Box position="relative" ref={yearRef}>
      <Flex flexDirection="row" alignItems="center">
        {/* Blue dot */}
        <Box position="relative" mr={4}>
          <Box
            width="12px"
            height="12px"
            bg={'gbs.b'}
            borderRadius="full"
            position="relative"
            zIndex="1"
          />
          {/* Vertical line */}
          {!isLast && (
            <Box
              position="absolute"
              top="16px"
              left="5px"
              width="2px"
              height={`${lineHeight}px`} /* 동적으로 높이 설정 */
              bg="gray.300"
              zIndex="0"
            />
          )}
        </Box>

        {/* 연도 */}
        <Text fontWeight="bold" fontSize="2xl" color={'gbs.b'}>
          {year}
        </Text>
      </Flex>

      {/* 연도 아래의 타임라인 이벤트 */}
      <Box pl="30px">
        {events.map((event, idx) => (
          <TimelineItem
            key={idx}
            date={event.date}
            description={event.description}
          />
        ))}
      </Box>
    </Box>
  )
}

const Timeline = ({ data }: { data: YearData[] }) => (
  <VStack align="start" position="relative">
    {data.map((yearData, idx) => (
      <Box key={idx} w="100%" position="relative">
        <TimelineYear
          year={yearData.year}
          events={yearData.events}
          isLast={idx === data.length - 1}
        />
      </Box>
    ))}
  </VStack>
)

export default function TimelineComponent({ data }: { data: YearData[] }) {
  // Chakra의 `useBreakpointValue`를 사용하여 화면 크기에 따라 스타일을 조건부로 적용
  const layout = useBreakpointValue({
    base: 'column', // 모바일 및 작은 화면에서는 항목을 수직으로 쌓기
    md: 'center', // 중간 화면 및 그 이상에서는 타임라인을 중앙에 배치
  })

  return (
    <Flex
      direction="column"
      align={layout === 'center' ? 'center' : 'flex-start'}
      pl={layout === 'center' ? 0 : 4}>
      <Text fontWeight="bold" fontSize="2xl" mb={4}>
        🌎 회사 연혁
      </Text>
      <Text fontSize="xl" fontWeight="bold" mb={6}>
        2001년, 고객을 향한 <br />첫 걸음을 시작했습니다.
      </Text>
      <Box maxW="600px" mt={10}>
        <Timeline data={data} />
      </Box>
    </Flex>
  )
}
