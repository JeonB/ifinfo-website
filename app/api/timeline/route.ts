import YearData from '@/models/YearData'
import { connectDB } from '@/utils/connectdb'
import { NextRequest, NextResponse } from 'next/server'

// GET handler
export async function GET(req: NextRequest) {
  await connectDB()
  const data = await YearData.find({})
  return NextResponse.json(data, { status: 200 })
}

// POST handler
export async function POST(req: NextRequest) {
  await connectDB()
  const { year, date, description } = await req.json()
  const newEvent = { date, description }

  let yearData = await YearData.findOne({ year })
  if (yearData) {
    yearData.events.push(newEvent)
  } else {
    yearData = new YearData({ year, events: [newEvent] })
  }
  await yearData.save()
  return NextResponse.json(yearData, { status: 201 })
}
