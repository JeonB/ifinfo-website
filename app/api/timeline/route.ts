import YearData from '@/models/YearData'
import { connectDB } from '@/utils/connectdb'
import { startSession } from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  await connectDB()
  const data = await YearData.find({}).lean() // lean() 사용
  const headers = { 'Cache-Control': 's-maxage=86400, stale-while-revalidate' }
  return NextResponse.json(data, { status: 200, headers })
}

export async function POST(req: NextRequest) {
  await connectDB()
  const { year, date, description } = await req.json()
  const newEvent = { date, description }

  const session = await startSession() // 트랜잭션 시작
  session.startTransaction()

  try {
    let yearData = await YearData.findOne({ year }).session(session)
    if (yearData) {
      yearData.events.push(newEvent)
    } else {
      yearData = new YearData({ year, events: [newEvent] })
    }
    await yearData.save({ session })
    await session.commitTransaction() // 트랜잭션 커밋
    session.endSession()

    return NextResponse.json(yearData, { status: 201 })
  } catch (error) {
    await session.abortTransaction() // 트랜잭션 롤백
    session.endSession()
    return NextResponse.json({ error: 'Failed to add event' }, { status: 500 })
  }
}
export async function PUT(req: NextRequest) {
  await connectDB()
  const { year, eventIdx, date, description } = await req.json()

  try {
    const yearData = await YearData.findOne({ year })
    console.log(eventIdx)
    if (!yearData) {
      return NextResponse.json({ error: 'Year not found' }, { status: 404 })
    }

    yearData.events[eventIdx] = { date, description }
    await yearData.save()

    return NextResponse.json(
      { message: 'Event updated successfully' },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 },
    )
  }
}

export async function DELETE(req: NextRequest) {
  await connectDB()
  const { year, eventIdx } = await req.json()

  try {
    const yearData = await YearData.findOne({ year })
    if (!yearData) {
      return NextResponse.json({ error: 'Year not found' }, { status: 404 })
    }

    yearData.events.splice(eventIdx, 1)
    if (yearData.events.length === 0) {
      await YearData.deleteOne({ year })
    } else {
      await yearData.save()
    }

    return NextResponse.json(
      { message: 'Event deleted successfully' },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 },
    )
  }
}
