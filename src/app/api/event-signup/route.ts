import { client } from '@/sanity/lib/sanity.client'
import { v4 as uuidv4 } from 'uuid'
import { NextRequest, NextResponse } from 'next/server'

// Define the expected types for the request body
interface EventSignUpRequestBody {
  navn: string
  email: string
  skole: string
  event: string
}

// POST handler
export async function POST(req: NextRequest) {
  try {
    const { navn, email, skole, event }: EventSignUpRequestBody =
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

    // Create the attendee document
    const attendeeDoc = {
      _type: 'attendee',
      _id: uuidv4(), // Unique ID for the attendee document
      navn,
      email,
      skole,
    }

    const createAttendeeResponse = await client.create(attendeeDoc)
    console.log('Created attendee document:', createAttendeeResponse)

    // Add the attendee reference to the event with a unique _key
    const patchResponse = await client
      .patch(event)
      .setIfMissing({ attendees: [] })
      .append('attendees', [
        {
          _type: 'reference',
          _ref: attendeeDoc._id, // Reference to the newly created attendee
          _key: uuidv4(), // Unique _key for this reference
        },
      ])
      .commit()

    console.log('Patch response from Sanity:', patchResponse)

    // Fetch the updated event document
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
