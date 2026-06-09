import { NextRequest, NextResponse } from 'next/server'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'chinacare2024'

export async function POST(request: NextRequest) {
  const { password } = await request.json()

  if (password === ADMIN_PASSWORD) {
    const response = NextResponse.json({ success: true })
    response.cookies.set('admin_token', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })
    return response
  }

  return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 401 })
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.delete('admin_token')
  return response
}
