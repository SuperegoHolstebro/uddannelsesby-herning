import { DocumentActionComponent } from 'sanity'
import { useClient } from 'sanity'
import { readToken } from '../lib/sanity.api'

export const duplicateEvent: DocumentActionComponent = ({ id, onComplete }) => {
  const client = useClient({ apiVersion: '2024-05-07' })
  return {
    name: 'duplicate', // <-- CRUCIAL!
    label: 'Duplikér begivenhed',
    onHandle: async () => {
      if (!client) {
        console.error('Sanity client not found')
        return
      }

      try {
        // Fetch the existing event
        const existingEvent = await client.fetch('*[_id == $id][0]', { id })

        if (!existingEvent) {
          console.error('Event not found')
          return
        }

        // Remove `attendees`, `_id`, and `_rev`
        const { attendees, _id, _rev, ...eventData } = existingEvent

        // Ensure the new event has a unique title and slug
        const newEvent = {
          ...eventData,
          title: `${eventData.title}`,
          slug: {
            current: `${eventData.slug.current}`, // Append timestamp for uniqueness
          },
        }

        // Create the duplicated event in Sanity
        const response = await client.create(newEvent)
        console.log('Duplicated event:', response)

        onComplete()
      } catch (error) {
        console.error('Error duplicating event:', error)
      }
    },
  }
}
