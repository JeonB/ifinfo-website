import TimelineComponent from './TimelineComponent'

export const revalidate = 86400 // ISR 사용

export default async function HistoryPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const response = await fetch(`${baseUrl}/api/timeline`, { cache: 'no-store' }) // ISR을 위해 데이터 비캐싱 처리
  const timelineData = await response.json()

  const sortedData = timelineData.sort(
    (a: { year: number }, b: { year: number }) => b.year - a.year,
  )

  sortedData.forEach(
    (yearData: { events: { date: string; description: string }[] }) => {
      yearData.events.sort((a, b) => b.date.localeCompare(a.date))
    },
  )

  return (
    <div>
      <TimelineComponent data={sortedData} />
    </div>
  )
}
