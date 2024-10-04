import jwt from 'jsonwebtoken'

export const GET = async (req: Request) => {
  const token = req.headers.get('cookie')?.split('token=')[1]

  if (!token) {
    return new Response(JSON.stringify({ isAuthenticated: false }), {
      status: 401,
    })
  }

  try {
    const secret = process.env.JWT_SECRET
    if (!secret) {
      throw new Error('JWT_SECRET is not defined')
    }
    jwt.verify(token, secret)
    return new Response(JSON.stringify({ isAuthenticated: true }), {
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ isAuthenticated: false }), {
      status: 401,
    })
  }
}
