'use client'

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'

type Event = {
  date: string
  description: string
}

type YearData = {
  year: number
  events: Event[]
}

export default function TimelineManagerPage() {
  const [timelineData, setTimelineData] = useState<YearData[]>([])
  const [year, setYear] = useState<number | ''>('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')

  const addEvent = () => {
    if (!year || !date || !description) return

    const newEvent: Event = { date, description }

    const existingYear = timelineData.find(y => y.year === year)
    if (existingYear) {
      existingYear.events.push(newEvent)
      setTimelineData([...timelineData])
    } else {
      setTimelineData([...timelineData, { year, events: [newEvent] }])
    }

    setYear('')
    setDate('')
    setDescription('')
  }

  //   const deleteEvent = (year: number, eventId: string) => {
  //     setTimelineData(
  //       timelineData.map(yearData =>
  //         yearData.year === year
  //           ? {
  //               ...yearData,
  //               events: yearData.events.filter(event => event.id !== eventId),
  //             }
  //           : yearData,
  //       ),
  //     )
  //   }

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(Number(e.target.value) || '')
  }

  return (
    <Flex direction="column" align="center" justify="center" pl="4">
      <Box maxW="600px" mx="auto" mt={10}>
        <Text fontWeight="bold" fontSize="2xl" mb={4}>
          Manage Timeline
        </Text>

        <VStack spacing={4} align="start">
          <FormControl>
            <FormLabel>Year</FormLabel>
            <Input
              type="number"
              value={year}
              onChange={handleYearChange}
              placeholder="Enter year"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Date</FormLabel>
            <Input
              type="text"
              value={date}
              onChange={e => setDate(e.target.value)}
              placeholder="Enter event date (e.g., 2024.03)"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Enter event description"
            />
          </FormControl>
          <Button colorScheme="blue" onClick={addEvent}>
            Add Event
          </Button>
        </VStack>
      </Box>
    </Flex>
  )
}
