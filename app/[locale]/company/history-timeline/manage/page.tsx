'use client'
import useAuth from '@/app/api/auth'
import { Event, YearData } from '@/models/YearData'
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
  const [dataChanged, setDataChanged] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const fetchTimelineData = async () => {
    const response = await fetch('/api/timeline')
    const data = await response.json()

    const sortedData = data.sort((a: YearData, b: YearData) => b.year - a.year)

    sortedData.forEach((yearData: YearData) => {
      yearData.events.sort((a: Event, b: Event) => {
        const [aStartDate] = a.date.trim().split('~')
        const [bStartDate] = b.date.trim().split('~')
        return bStartDate.localeCompare(aStartDate)
      })
    })

    setTimelineData(sortedData)
  }

  useEffect(() => {
    fetchTimelineData()
  }, [dataChanged])

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
      updatedTimeline[editIndex.yearIdx].events.sort((a: Event, b: Event) => {
        const [aStartDate] = a.date.trim().split('~')
        const [bStartDate] = b.date.trim().split('~')
        return bStartDate.localeCompare(aStartDate)
      })
      setTimelineData(updatedTimeline)
      const response = await fetch('/api/timeline', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          year: timelineData[editIndex.yearIdx].year,
          eventIdx: editIndex.eventIdx,
          date: newEvent.date,
          description: newEvent.description,
        }),
      })
      setEditIndex(null)
      if (response.ok) {
        setDataChanged(!dataChanged)
      } else {
        console.error('Failed to add event:', response.statusText)
      }
    } else {
      const response = await fetch('/api/timeline', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ year, date, description }),
      })
      if (response.ok) {
        setDataChanged(!dataChanged)
      } else {
        console.error('Failed to add event:', response.statusText)
      }
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

  const handleEdit = async (yearIdx: number, eventIdx: number) => {
    const event = timelineData[yearIdx].events[eventIdx]
    setYear(timelineData[yearIdx].year)
    setDate(event.date)
    setDescription(event.description)
    setEditIndex({ yearIdx, eventIdx })
  }

  const handleDelete = async (yearIdx: number, eventIdx: number) => {
    const updatedTimeline = [...timelineData]
    updatedTimeline[yearIdx].events.splice(eventIdx, 1)
    if (updatedTimeline[yearIdx].events.length === 0) {
      updatedTimeline.splice(yearIdx, 1)
    }
    setTimelineData(updatedTimeline)

    const response = await fetch('/api/timeline', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ year: timelineData[yearIdx].year, eventIdx }),
    })

    if (response.ok) {
      setDataChanged(!dataChanged)
    } else {
      console.error('Failed to delete event:', response.statusText)
    }
  }

  const handleFileUpload = async () => {
    const response = await fetch('/api/timeline/bulk', {
      method: 'POST',
    })

    if (response.ok) {
      setDataChanged(!dataChanged)
    } else {
      console.error('Failed to upload file:', response.statusText)
    }
  }

  const handleDeleteAll = async () => {
    const confirmed = window.confirm('정말로 삭제하겠습니까?')
    if (!confirmed) {
      return
    }

    const response = await fetch('/api/timeline/bulk', {
      method: 'DELETE',
    })

    if (response.ok) {
      setDataChanged(!dataChanged)
    } else {
      console.error('Failed to delete all events:', response.statusText)
    }
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
          <HStack spacing={4} justifyContent="space-between">
            <Button colorScheme="blue" onClick={addEvent}>
              {editIndex !== null ? 'Update Event' : 'Add Event'}
            </Button>
            <Button colorScheme="blue" onClick={handleFileUpload}>
              JSON 파일 업로드
            </Button>
            <Button colorScheme="red" onClick={handleDeleteAll}>
              Delete All Events
            </Button>
          </HStack>
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
