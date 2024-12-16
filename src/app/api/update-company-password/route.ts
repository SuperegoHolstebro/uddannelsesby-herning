import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/sanity.client'

export async function POST(req) {
  try {
    const { documentId, hashedPassword } = await req.json()

    console.log('Received documentId:', documentId)
    console.log('Received hashedPassword:', hashedPassword)
    const query = `
    *[_type == "companyLogin" && companyRef._ref == $id][0]{
      username,
      password,
      email,
      companyRef->{
        _id,
      }
    }
  `

    const companyLogin = await client.fetch(query, { id: documentId })
    await client
      .patch(companyLogin._id)
      .set({ password: hashedPassword })
      .commit()

    return NextResponse.json({ message: 'Password updated successfully!' })
  } catch (error) {
    console.error('Error updating password:', error) // Detailed error log
    return NextResponse.json(
      { message: 'Error updating password', error: error.message },
      { status: 500 },
    )
  }
}
