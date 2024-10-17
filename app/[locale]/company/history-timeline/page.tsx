import { Event, YearData } from '@/models/YearData'
import TimelineComponent from './TimelineComponent'

export default async function HistoryPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const response = await fetch(`${baseUrl}/api/timeline`, {
    next: { revalidate: 30 },
  })
  const timelineData = await response.json()

  const sortedData = timelineData.sort(
    (a: { year: number }, b: { year: number }) => b.year - a.year,
  )

  sortedData.forEach((yearData: YearData) => {
    yearData.events.sort((a: Event, b: Event) => {
      const [aStartDate] = a.date.trim().split('~')
      const [bStartDate] = b.date.trim().split('~')
      return bStartDate.localeCompare(aStartDate)
    })
  })

  return (
    <div>
      <TimelineComponent data={sortedData} />
    </div>
  )
}
