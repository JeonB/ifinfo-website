'use client'

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
        { date: '2024.03', description: '�����ڻ����ȸ�� �����ý��� �籸��' },
        { date: '2024.01', description: '�ϳ����� CLS �����ý��� �籸��' },
      ],
    },
    {
      year: 2023,
      events: [
        {
          date: '2024.03',
          description: '�ϳ����� ä�ǰŷ��ý��� ������ȭ ����',
        },
        {
          date: '2024.03',
          description: '�ϳ�����(�߱�)���Ѱ��� ������ý��� ����',
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
          2001��, ���� ����
          <br />ù ������ �����߽��ϴ�.
        </Text>
        <Timeline data={timelineData} />
      </Box>
    </Flex>
  )
}
