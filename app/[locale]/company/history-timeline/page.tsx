import { Box, Spinner } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import TimelineComponent from './TimelineComponent'

export const revalidate = 86400 // ISR

interface HistoryPageProps {
  initialData: {
    year: number
    events: {
      date: string
      description: string
    }[]
  }[]
}

export default function HistoryPage({ initialData }: HistoryPageProps) {
  const [timelineData, setTimelineData] = useState(initialData || [])
  const [loading, setLoading] = useState(!initialData)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/timeline') // 클라이언트 패칭
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
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!initialData) {
      fetchData() // 초기 데이터가 없으면 비동기로 데이터를 가져옴
    }
  }, [])

  return (
    <div>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minH="100vh">
          <Spinner size="xl" />
        </Box>
      ) : (
        <TimelineComponent data={timelineData} />
      )}
    </div>
  )
}

export async function getStaticProps() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const response = await fetch(`${baseUrl}/api/timeline`)
  const data = await response.json()

  const sortedData = data.sort(
    (a: { year: number }, b: { year: number }) => b.year - a.year,
  )

  sortedData.forEach(
    (yearData: { events: { date: string; description: string }[] }) => {
      yearData.events.sort((a, b) => b.date.localeCompare(a.date))
    },
  )

  return {
    props: {
      initialData: sortedData, // 페이지를 미리 생성할 때 사용
    },
    revalidate: 86400, // ISR을 통한 주기적 재생성
  }
}
