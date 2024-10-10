'use client'

import { Box, Spinner } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import TimelineComponent from './TimelineComponent'

export default function HistoryPage() {
  const [timelineData, setTimelineData] = useState<
    { year: number; events: { date: string; description: string }[] }[]
  >([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/timeline') // 클라이언트 사이드에서 패칭
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
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false) // 로딩 상태 종료
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      {loading ? (
        // 로딩 중일 때 스피너를 표시
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minH="100vh">
          <Spinner size="xl" />
        </Box>
      ) : (
        // 데이터 로드가 완료되면 타임라인을 표시
        <TimelineComponent data={timelineData} />
      )}
    </div>
  )
}
