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

const TimelineItem = ({
  date,
  description,
}: {
  date: string
  description: string
}) => (
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
  year: number
  events: { date: string; description: string }[]
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
            top="4px" /* Moves the blue dot slightly down */
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

        {/* Year */}
        <Text fontWeight="bold" fontSize="2xl" color={'gbs.b'}>
          {year}
        </Text>
      </Flex>

      {/* Timeline events under the year */}
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

const Timeline = ({
  data,
}: {
  data: { year: number; events: { date: string; description: string }[] }[]
}) => (
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

export default function HistoryPage() {
  const [timelineData, setTimelineData] = useState<
    { year: number; events: { date: string; description: string }[] }[]
  >([])

  const fetchData = async () => {
    const response = await fetch('/api/timeline')
    if (response.ok) {
      const data = await response.json()

      const sortedData = data.sort(
        (a: { year: number }, b: { year: number }) => b.year - a.year,
      )

      sortedData.forEach(
        (yearData: { events: { date: string; description: string }[] }) => {
          yearData.events.sort((a, b) => b.date.localeCompare(a.date))
        },
      )

      setTimelineData(sortedData)
    } else {
      console.error('Failed to fetch data:', response.statusText)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Use Chakra's `useBreakpointValue` to conditionally apply styles based on screen size
  const layout = useBreakpointValue({
    base: 'column', // For mobile and small screens, stack items vertically
    md: 'center', // For medium screens and larger, center the timeline
  })

  return (
    <Flex
      direction="column"
      align={layout === 'center' ? 'center' : 'flex-start'}
      pl={layout === 'center' ? 0 : 4}>
      <Box maxW="600px" mt={10}>
        <Text fontWeight="bold" fontSize="2xl" mb={4}>
          🌎 회사 연혁
        </Text>
        <Text fontSize="xl" fontWeight="bold" mb={6}>
          2001년, 고객을 향한 <br />첫 걸음을 시작했습니다.
        </Text>
        <Timeline data={timelineData} />
      </Box>
    </Flex>
  )
}
