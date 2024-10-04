import YearData from '@/models/YearData'
import mongoose from 'mongoose'
import { NextResponse } from 'next/server'

export const connectDB = async () => {
  if (mongoose.connections[0].readyState) return
  await mongoose.connect(process.env.MONGODB_URI!)
}

export const GET = async (req: Request) => {
  await connectDB()
  const data = await YearData.find({})
  return NextResponse.json(data, { status: 200 })
}

export const POST = async (req: Request) => {
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
