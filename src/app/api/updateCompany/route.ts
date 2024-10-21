import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/sanity/lib/authOptions'
import { client } from '@/sanity/lib/sanity.client'

export async function POST(req: Request) {
  try {
    // Log the incoming request
    console.log('Incoming POST request to update company')

    // Fetch the session server-side
    const session = await getServerSession(authOptions)

    if (!session) {
      console.log('No session found, returning unauthorized')
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const {
      documentId,
      companyName,
      companyDescription,
      email,
      address,
      phone,
    } = await req.json()

    // Log the received data
    console.log('Received data:', {
      documentId,
      companyName,
      companyDescription,
      email,
      address,
      phone,
    })

    if (!documentId || !companyName || !companyDescription) {
      console.log('Invalid request data, returning bad request')
      return NextResponse.json(
        { success: false, message: 'Invalid request data' },
        { status: 400 },
      )
    }

    // Update the company in Sanity
    const result = await client
      .patch(documentId)
      .set({
        name: companyName,
        description: companyDescription,
        email: email,
        address: address,
        phone: phone,
      })
      .commit()

    // Log success result
    console.log('Company updated successfully:', result)

    return NextResponse.json({ success: true, result })
  } catch (error) {
    // Log the error
    console.log('Error updating company:', error)

    return NextResponse.json(
      { success: false, message: 'Failed to update company', error },
      { status: 500 },
    )
  }
}
