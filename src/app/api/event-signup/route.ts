import { client } from '@/sanity/lib/sanity.client'
import { v4 as uuidv4 } from 'uuid'
import { NextRequest, NextResponse } from 'next/server'

// Define the expected types for the request body
interface EventSignUpRequestBody {
  navn: string
  email: string
  telefon: string
  skole: string
  event: string
}

// POST handler
export async function POST(req: NextRequest) {
  try {
    const { navn, email, telefon, skole, event }: EventSignUpRequestBody =
      await req.json()

    console.log('Event ID being fetched:', event)

    // Fetch the event document
    const eventDoc = await client.getDocument(event)
    if (!eventDoc) {
      return new NextResponse(JSON.stringify({ message: 'Event not found' }), {
        status: 404,
      })
    }

    // Check if the event is full
    if (eventDoc.attendees?.length >= eventDoc.maxAttendees) {
      return new NextResponse(JSON.stringify({ message: 'Event is full' }), {
        status: 400,
      })
    }

    // Create a new attendee object and add it to the event's attendees array
    const newAttendee = {
      _type: 'attendee',
      _key: uuidv4(), // Unique _key for the attendee
      name: navn, // Name of the attendee
      email: email, // Email of the attendee
      phone: telefon, // Phone number of the attendee
      school: skole, // School of the attendee
    }

    // Add the new attendee to the event's attendees array
    const patchResponse = await client
      .patch(event)
      .setIfMissing({ attendees: [] }) // Ensure attendees array exists
      .append('attendees', [newAttendee]) // Add the new attendee to the array
      .commit()

    console.log('Patch response from Sanity:', patchResponse)

    // Fetch the updated event document (optional)
    const updatedEventDoc = await client.getDocument(event)
    console.log('Fetched updated eventDoc after signup:', updatedEventDoc)

    return new NextResponse(
      JSON.stringify({ message: 'Successfully signed up' }),
      {
        status: 200,
      },
    )
  } catch (error: any) {
    console.error(
      'Error in event-signup API:',
      error.message,
      error.response?.body,
    )
    return new NextResponse(
      JSON.stringify({
        message: 'Internal Server Error',
        error: error.message,
      }),
      {
        status: 500,
      },
    )
  }
}

// GET handler (returns Method Not Allowed for unsupported methods)
export async function GET() {
  return new NextResponse(JSON.stringify({ message: 'Method not allowed' }), {
    status: 405,
    headers: { Allow: 'POST' },
  })
}
