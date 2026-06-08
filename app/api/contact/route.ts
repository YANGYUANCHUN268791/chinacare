import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import Contact from '@/models/Contact'

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase()

    const body = await request.json()
    const {
      firstName,
      lastName,
      email,
      phone,
      age,
      country,
      specialty,
      conditionDescription,
      urgency,
      preferredHospital,
      budgetRange,
      travelMonth,
      additionalInfo,
    } = body

    // 验证必填字段
    if (!firstName || !lastName || !email || !country || !specialty || !conditionDescription || !urgency) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // 创建联系记录
    const contact = await Contact.create({
      firstName,
      lastName,
      email,
      phone,
      age,
      country,
      specialty,
      conditionDescription,
      urgency,
      preferredHospital,
      budgetRange,
      travelMonth,
      additionalInfo,
    })

    return NextResponse.json(
      { success: true, message: 'Contact form submitted successfully', id: contact._id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    await connectToDatabase()

    const contacts = await Contact.find({}).sort({ createdAt: -1 })
    return NextResponse.json({ success: true, data: contacts })
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
