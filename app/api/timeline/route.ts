import YearData, { Event } from '@/models/YearData'
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
  const { year, eventId, date, description } = await req.json()

  try {
    const yearData = await YearData.findOne({ year })
    if (!yearData) {
      return NextResponse.json({ error: 'Year not found' }, { status: 404 })
    } else {
      const event = yearData.events.id(eventId)
      if (event) {
        event.date = date
        event.description = description
        await yearData.save()
        return NextResponse.json(
          { message: 'Event updated successfully' },
          { status: 200 },
        )
      } else {
        return NextResponse.json(
          { message: 'Event not found' },
          { status: 404 },
        )
      }
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 },
    )
  }
}

export async function DELETE(req: NextRequest) {
  await connectDB()
  const { year, eventId } = await req.json()

  const session = await startSession()
  session.startTransaction()

  try {
    const yearData = await YearData.findOne({ year }).session(session)
    if (!yearData) {
      await session.abortTransaction()
      session.endSession()
      return NextResponse.json({ error: 'Year not found' }, { status: 404 })
    }

    const eventIndex = yearData.events.findIndex(
      (event: Event) => event._id && event._id.equals(eventId),
    )
    if (eventIndex === -1) {
      await session.abortTransaction()
      session.endSession()
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }
    yearData.events.splice(eventIndex, 1)
    if (yearData.events.length === 0) {
      await YearData.deleteOne({ year }).session(session)
    } else {
      await yearData.save({ session })
    }

    await session.commitTransaction()
    session.endSession()

    return NextResponse.json(
      { message: 'Event deleted successfully' },
      { status: 200 },
    )
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    console.error('Failed to delete event:', error)
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 },
    )
  }
}
