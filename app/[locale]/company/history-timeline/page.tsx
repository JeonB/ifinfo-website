import TimelineComponent from './TimelineComponent'

// Server-side component that fetches data
export default async function HistoryPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const response = await fetch(`${baseUrl}/api/timeline`, {
    next: { revalidate: 30 },
  })
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
