'use client'
import useAuth from '@/app/api/auth'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Event = {
  date: string
  description: string
}

type YearData = {
  year: number
  events: Event[]
}

export default function TimelineManagerPage() {
  useAuth()
  const [timelineData, setTimelineData] = useState<YearData[]>([])
  const [year, setYear] = useState<number | ''>('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [editIndex, setEditIndex] = useState<{
    yearIdx: number
    eventIdx: number
  } | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/timeline')
      const data = await response.json()

      // Sort the fetched data by year in descending order
      const sortedData = data.sort(
        (a: YearData, b: YearData) => b.year - a.year,
      )

      // Sort each year's events in descending order by date
      sortedData.forEach((yearData: YearData) => {
        yearData.events.sort((a: Event, b: Event) =>
          b.date.localeCompare(a.date),
        )
      })

      setTimelineData(sortedData)
    }

    fetchData()
  }, [])

  const addEvent = async () => {
    if (!year) {
      alert('연도를 입력해야 합니다.')
      return
    }
    if (!date) {
      alert('날짜를 입력해야 합니다.')
      return
    }
    if (!description) {
      alert('설명을 입력해야 합니다.')
      return
    }

    const newEvent: Event = { date, description }

    if (editIndex !== null) {
      const updatedTimeline = [...timelineData]
      updatedTimeline[editIndex.yearIdx].events[editIndex.eventIdx] = newEvent
      updatedTimeline[editIndex.yearIdx].events.sort(
        (a, b) => b.date.localeCompare(a.date), // Ensure descending order of events by date
      )
      setTimelineData(updatedTimeline)
      setEditIndex(null)
    } else {
      const response = await fetch('/api/timeline', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ year, date, description }),
      })
      const data = await response.json()
      const updatedTimeline = [...timelineData, data]
      updatedTimeline.sort((a, b) => b.year - a.year) // Sort years in descending order
      updatedTimeline.forEach(yearData => {
        yearData.events.sort((a: { date: any }, b: { date: string }) =>
          b.date.localeCompare(a.date),
        ) // Sort events in descending order
      })
      setTimelineData(updatedTimeline)
    }

    setYear('')
    setDate('')
    setDescription('')
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(Number(e.target.value) || '')
  }

  const handleYearBlur = () => {
    if (year && !/^\d{4}$/.test(String(year))) {
      alert('연도는 4자리 숫자여야 합니다.')
      setYear('')
    }
  }

  const handleDateBlur = () => {
    if (date && !/^\d{4}\.\d{2}$/.test(date)) {
      alert('날짜는 YYYY.MM 형식이어야 합니다.')
      setDate('')
    }
  }

  const handleEdit = (yearIdx: number, eventIdx: number) => {
    const event = timelineData[yearIdx].events[eventIdx]
    setYear(timelineData[yearIdx].year)
    setDate(event.date)
    setDescription(event.description)
    setEditIndex({ yearIdx, eventIdx })
  }

  const handleDelete = (yearIdx: number, eventIdx: number) => {
    const updatedTimeline = [...timelineData]
    updatedTimeline[yearIdx].events.splice(eventIdx, 1)
    if (updatedTimeline[yearIdx].events.length === 0) {
      updatedTimeline.splice(yearIdx, 1)
    }
    setTimelineData(updatedTimeline)
  }

  return (
    <Flex direction="column" align="center" justify="center" pl="4">
      <Box maxW="600px" mx="auto" mt={10}>
        <Text fontWeight="bold" fontSize="2xl" mb={4}>
          연혁 관리
        </Text>

        <VStack spacing={4} align="start">
          <FormControl>
            <FormLabel>연도</FormLabel>
            <Input
              type="number"
              value={year}
              onChange={handleYearChange}
              onBlur={handleYearBlur}
              placeholder="연도 입력"
            />
          </FormControl>
          <FormControl>
            <FormLabel>날짜</FormLabel>
            <Input
              type="text"
              value={date}
              onChange={e => setDate(e.target.value)}
              onBlur={handleDateBlur}
              placeholder="(e.g., 2024.03)"
            />
          </FormControl>
          <FormControl>
            <FormLabel>설명</FormLabel>
            <Textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="연혁 설명 입력"
            />
          </FormControl>
          <Button colorScheme="blue" onClick={addEvent}>
            {editIndex !== null ? 'Update Event' : 'Add Event'}
          </Button>
        </VStack>

        <VStack spacing={4} align="start" m={10}>
          {timelineData.map((yearData, yearIdx) => (
            <Box key={yearIdx} w="100%">
              <Text fontWeight="bold" fontSize="lg" color="blue.500" mb={4}>
                {yearData.year}
              </Text>
              {yearData.events.map((event, eventIdx) => (
                <HStack key={eventIdx} spacing={4} align="flex-start">
                  <Box>
                    <Text fontWeight="bold" fontSize="sm">
                      {event.date}
                    </Text>
                    <Text>{event.description}</Text>
                  </Box>
                  <IconButton
                    aria-label="Edit event"
                    icon={<EditIcon />}
                    onClick={() => handleEdit(yearIdx, eventIdx)}
                  />
                  <IconButton
                    aria-label="Delete event"
                    icon={<DeleteIcon />}
                    onClick={() => handleDelete(yearIdx, eventIdx)}
                  />
                </HStack>
              ))}
            </Box>
          ))}
        </VStack>
      </Box>
    </Flex>
  )
}
