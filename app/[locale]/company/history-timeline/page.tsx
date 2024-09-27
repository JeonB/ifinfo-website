import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'

const TimelineItem = ({
  date,
  description,
}: {
  date: string
  description: string
}) => (
  <HStack align="flex-start" spacing={4} mb={6}>
    <Box position="relative">
      <Box
        width="10px"
        height="10px"
        bg="blue.500"
        borderRadius="full"
        position="relative"
        zIndex="1"
      />
      <Box
        position="absolute"
        top="10px"
        left="4px"
        width="2px"
        height="calc(100% + 20px)"
        bg="gray.300"
        zIndex="0"
      />
    </Box>
    <Box>
      <Text fontWeight="bold" fontSize="sm">
        {date}
      </Text>
      <Text>{description}</Text>
    </Box>
  </HStack>
)

const TimelineYear = ({
  year,
  events,
}: {
  year: number
  events: { date: string; description: string }[]
}) => (
  <Box>
    <Text fontWeight="bold" fontSize="lg" color="blue.500" mb={4}>
      {year}
    </Text>
    {events.map((event, idx) => (
      <TimelineItem
        key={idx}
        date={event.date}
        description={event.description}
      />
    ))}
  </Box>
)

const Timeline = ({
  data,
}: {
  data: { year: number; events: { date: string; description: string }[] }[]
}) => (
  <VStack align="start" spacing={6} position="relative">
    {data.map((yearData, idx) => (
      <Box key={idx} w="100%" position="relative">
        <TimelineYear year={yearData.year} events={yearData.events} />
      </Box>
    ))}
  </VStack>
)

export default function HistoryPage() {
  const t = useTranslations('Company')
  const timelineData = [
    {
      year: 2024,
      events: [
        { date: '2024.03', description: '농협자산관리회사 업무시스템 재구축' },
        { date: '2024.01', description: '하나은행 CLS 결제시스템 재구축' },
      ],
    },
    {
      year: 2023,
      events: [
        {
          date: '2024.03',
          description: '하나은행 채권거래시스템 디지털화 개발',
        },
        {
          date: '2024.03',
          description: '하나은행(중국)유한공사 차세대시스템 구축',
        },
      ],
    },
  ]

  return (
    <Flex direction="column" align="center" justify="center" pl="4">
      <Box maxW="600px" mx="auto" mt={10}>
        <Text fontWeight="bold" fontSize="2xl" mb={4}>
          {t('history')}
        </Text>
        <Text fontSize="xl" fontWeight="bold" mb={6}>
          2001년, 고객을 향한
          <br />첫 걸음을 시작했습니다.
        </Text>
        <Timeline data={timelineData} />
      </Box>
    </Flex>
  )
}
