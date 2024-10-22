import { client } from '@/sanity/lib/sanity.client'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req) {
  const { navn, email, skole, event } = await req.json()

  try {
    console.log('Event ID being fetched:', event)

    // Fetch the event document
    const eventDoc = await client.getDocument(event)
    if (!eventDoc) {
      return new Response(JSON.stringify({ message: 'Event not found' }), {
        status: 404,
      })
    }

    // Check if the event is full
    if (eventDoc.attendees?.length >= eventDoc.maxAttendees) {
      return new Response(JSON.stringify({ message: 'Event is full' }), {
        status: 400,
      })
    }

    // Create the attendee document
    const attendeeDoc = {
      _type: 'attendee',
      _id: uuidv4(), // Unique ID for the attendee document
      navn, // Use "navn" instead of "name"
      email,
      skole, // Use "skole" instead of "school"
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

    return new Response(JSON.stringify({ message: 'Successfully signed up' }), {
      status: 200,
    })
  } catch (error) {
    console.error(
      'Error in event-signup API:',
      error.message,
      error.response?.body,
    )
    return new Response(
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

export const config = {
  // Ensure POST is the only allowed method
  api: {
    methods: ['POST'],
  },
}
