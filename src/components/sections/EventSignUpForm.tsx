'use client'

import { useState, useEffect } from 'react'
import Section from './Section'
import { AdvancedButton } from '../atoms/AdvancedButton'

function EventSignUpForm({ event }) {
  const [formData, setFormData] = useState({ navn: '', email: '', skole: '' })
  const [isFull, setIsFull] = useState(false)
  const [submitting, setSubmitting] = useState(false) // Add submitting state to prevent multiple form submissions

  // Update `isFull` based on attendees and maxAttendees
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

    if (isFull) {
      // Prevent form submission if the event is full
      alert('Begivenheden er fuld')
      return
    }

    setSubmitting(true) // Disable the form while submitting

    try {
      const response = await fetch('/api/event-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          navn: formData.navn,
          email: formData.email,
          skole: formData.skole,
          event: event._id, // Ensure the event ID is being passed correctly
        }),
      })

      const data = await response.json()

      if (response.ok) {
        alert('Du er nu tilmeldt begivenheden')
        // Reset form
        setFormData({ navn: '', email: '', skole: '' })
        // Optimistically update the `isFull` state if the event is now full
        if (event.attendees.length + 1 >= event.maxAttendees) {
          setIsFull(true)
        }
      } else {
        console.log('Error response:', data)
        alert('Der skete en fejl. Prøv igen senere')
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('Der skete en fejl. Prøv igen senere')
    } finally {
      setSubmitting(false) // Enable the form after submission
    }
  }

  return (
    <Section variant="primary" className="flex justify-center col-span-full">
      <div className="">
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
              <option value="Aarhus Universitet i Herning">
                Aarhus Universitet i Herning
              </option>
              <option value="VIA University College">
                VIA University College
              </option>
              <option value="Erhvervsakademi MidtVest">
                Erhvervsakademi MidtVest
              </option>
              <option value="Social- og Sundhedsskolen Herning">
                Social- og Sundhedsskolen Herning
              </option>
              <option value="Herningsholm Erhvervsskole & HHX/HTX">
                Herningsholm Erhvervsskole & HHX/HTX
              </option>
            </select>
            {/* Use the correct isFull state and disable the button during submission */}
            <AdvancedButton
              variant="default"
              type="submit"
              disabled={isFull || submitting} // Disable if the event is full or the form is submitting
            >
              {isFull
                ? 'Begivenheden er fuld'
                : submitting
                  ? 'Indsender...'
                  : 'Tilmeld dig'}
            </AdvancedButton>
          </form>
        )}
      </div>
    </Section>
  )
}

export default EventSignUpForm
