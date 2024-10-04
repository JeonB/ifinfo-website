import User from '@/models/User'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '../../timeline/route'

export const POST = async (req: NextRequest) => {
  await connectDB()

  const { email, password } = await req.json()
  const user = await User.findOne({ email })

  if (!user) {
    return NextResponse.json({ message: '로그인 실패' }, { status: 401 })
  }

  // 평문 비밀번호를 직접 비교
  if (password !== user.password) {
    return NextResponse.json({ message: '로그인 실패' }, { status: 401 })
  }

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  })

  const response = NextResponse.json(
    { message: '로그인 성공' },
    { status: 200 },
  )
  response.cookies.set('token', token, { path: '/' })

  return response
}
