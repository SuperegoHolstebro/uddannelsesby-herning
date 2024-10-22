'use client'

import { useState, useEffect } from 'react'
import Section from './Section'
import { AdvancedButton } from '../atoms/AdvancedButton'

function EventSignUpForm({ event }) {
  const [formData, setFormData] = useState({ navn: '', email: '', skole: '' })
  const [isFull, setIsFull] = useState(false)

  // Update isFull based on attendees and maxAttendees
  useEffect(() => {
    if (event.attendees && event.maxAttendees !== undefined) {
      const isEventFull = event.attendees.length >= event.maxAttendees
      console.log('Event Attendees:', event.attendees?.length)
      console.log('Max Attendees:', event.maxAttendees)
      console.log('Is Event Full:', isEventFull)
      setIsFull(isEventFull) // Ensure `isFull` state is updated
    }
  }, [event.attendees, event.maxAttendees])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch('/api/event-signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        navn: formData.navn,
        email: formData.email,
        skole: formData.skole,
        event: event._id,
      }),
    })

    const data = await response.json()

    if (response.ok) {
      alert('Du er nu tilmeldt begivenheden')
      setFormData({ navn: '', email: '', skole: '' })
    } else {
      console.log('Error response:', data)
      alert('Der skete en fejl. Prøv igen senere')
    }
  }

  return (
    <Section variant="primary" className="flex justify-center col-span-full">
      <div className="">
        <h2>{event.title}</h2>
        <p>{event.description}</p>
        <p>Dato: {new Date(event.date).toLocaleString()}</p>
        <p>Lokation: {event.location}</p>

        {event.isExternal ? (
          <a
            href={event.externalLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Gå til begivenhed
          </a>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Navn"
              value={formData.navn}
              onChange={(e) =>
                setFormData({ ...formData, navn: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <select
              value={formData.skole}
              onChange={(e) =>
                setFormData({ ...formData, skole: e.target.value })
              }
              required
            >
              <option value="">Vælg skole</option>
              <option value="skole 1">Skole 1</option>
              <option value="skole 2">Skole 2</option>
            </select>
            {/* Use the correct isFull state */}
            <AdvancedButton variant="default" type="submit" disabled={isFull}>
              {isFull ? 'Begivenheden er fuld' : 'Tilmeld dig'}
            </AdvancedButton>
          </form>
        )}
      </div>
    </Section>
  )
}

export default EventSignUpForm
