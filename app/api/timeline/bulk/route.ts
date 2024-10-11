import YearData from '@/models/YearData'
import { connectDB } from '@/utils/connectdb'
import fs from 'fs'
import { startSession } from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

export async function POST(req: NextRequest, res: NextResponse) {
  await connectDB()

  // Extract language from query parameters or request body
  const { searchParams } = new URL(req.url)
  const lang = searchParams.get('lang') || 'ko' // Default to 'ko' if no language is specified

  // Construct the path to the JSON file based on the language
  const filePath = path.join(
    process.cwd(),
    `app/i18n/locales/${lang}/history.json`,
  )

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    return new NextResponse(JSON.stringify({ error: 'File not found' }), {
      status: 404,
    })
  }

  // Read the JSON file
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { YearData: timelineData } = JSON.parse(fileContent)

  const session = await startSession() // Start transaction
  session.startTransaction()

  try {
    for (const { year, events } of timelineData) {
      let yearData = await YearData.findOne({ year }).session(session)
      if (yearData) {
        yearData.events.push(...events)
      } else {
        yearData = new YearData({ year, events })
      }
      await yearData.save({ session })
    }
    await session.commitTransaction() // Commit transaction
    session.endSession()

    return new NextResponse(
      JSON.stringify({ message: 'Timeline data added successfully' }),
      { status: 201 },
    )
  } catch (error) {
    await session.abortTransaction() // Rollback transaction
    session.endSession()
    return new NextResponse(
      JSON.stringify({ error: 'Failed to add timeline data' }),
      { status: 500 },
    )
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  await connectDB()

  try {
    await YearData.deleteMany({})
    return new NextResponse(
      JSON.stringify({ message: 'All timeline data deleted successfully' }),
      { status: 200 },
    )
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Failed to delete timeline data' }),
      { status: 500 },
    )
  }
}
