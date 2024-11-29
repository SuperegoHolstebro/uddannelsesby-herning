'use client'

import { useState, useEffect } from 'react'
import Section from './Section'
import { AdvancedButton } from '../atoms/AdvancedButton'
import punycode from 'punycode/'
import Heading from '../atoms/Heading'
import Paragraph from '../atoms/Paragraph'

function EventSignUpForm({ event }) {
  const [formData, setFormData] = useState({
    navn: '',
    email: '',
    telefon: '',
    skole: '',
    numberOfTickets: 1,
  })
  const [isFull, setIsFull] = useState(false)
  const [submitting, setSubmitting] = useState(false) // Add submitting state to prevent multiple form submissions
  const [ticketsLeft, setTicketsLeft] = useState(0)

  // Calculate remaining tickets
  useEffect(() => {
    const bookedTickets =
      event.attendees?.reduce(
        (sum, attendee) => sum + (attendee.numberOfTickets || 0),
        0,
      ) || 0
    const maxTickets = event.maxAttendees || 0
    setTicketsLeft(maxTickets - bookedTickets)
    setIsFull(maxTickets - bookedTickets <= 0)
  }, [event.attendees, event.maxAttendees])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isFull) {
      // Prevent form submission if the event is full
      alert('Begivenheden er fuld')
      return
    }

    setSubmitting(true) // Disable the form while submitting

    // Encode email domain if it contains special characters
    const emailParts = formData.email.split('@')
    const encodedEmail =
      emailParts.length === 2
        ? `${emailParts[0]}@${punycode.toASCII(emailParts[1])}`
        : formData.email

    try {
      const response = await fetch('/api/event-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          navn: formData.navn,
          email: encodedEmail, // Use encoded email
          telefon: formData.telefon,
          skole: formData.skole,
          event: event._id, // Ensure the event ID is being passed correctly
          numberOfTickets: formData.numberOfTickets,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        alert('Du er nu tilmeldt begivenheden')
        // Reset form
        setFormData({
          navn: '',
          email: '',
          telefon: '',
          skole: '',
          numberOfTickets: 1,
        })
        // Update ticketsLeft
        const newBookedTickets =
          event.attendees?.reduce(
            (sum, attendee) => sum + (attendee.numberOfTickets || 0),
            0,
          ) + formData.numberOfTickets
        setTicketsLeft(event.maxAttendees - newBookedTickets)
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
    <Section
      variant="primary"
      paddingX="none"
      className=" col-span-full"
      tag={'div'}
    >
      <div className="col-start-1 -col-end-1 sm:col-start-2 sm:-col-end-2 lg:col-start-3 lg:-col-end-3 xl:col-start-6 xl:-col-end-6 2xl:col-start-6 2xl:-col-end-6">
        {event.isExternal ? (
          <a
            href={event.externalLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Gå til begivenhed
          </a>
        ) : (
          <div>
            <Heading
              spacing="small"
              type="h3"
              tag="h3"
              className="col-span-full"
            >
              Tilmeld dig nu
            </Heading>

            <Paragraph spacing="small" className="col-span-full">
              Udfyld formularen herunder og sikre dig billetter til eventet
              allerede nu.{' '}
            </Paragraph>

            <Paragraph spacing="small" className="font-bold col-span-full">
              {ticketsLeft} tilgængelige billetter
            </Paragraph>

            <form onSubmit={handleSubmit} className="">
              <div className="text-grå ">
                <label htmlFor="event" className="relative grid text-small">
                  <input
                    type="text"
                    name="event"
                    placeholder={event.title}
                    value={event.title}
                    readOnly
                    onChange={(e) =>
                      setFormData({ ...formData, navn: e.target.value })
                    }
                    required
                    className="p-0 border-t-0 border-b-2 border-grå border-x-0 bg-lys [appearance:textfield] focus:ring-2 focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none h-16 peer "
                  />
                  <span className="absolute transition-all opacity-100 bottom-7 peer-placeholder-shown:opacity-0 peer-placeholder-shown:left-5 text-small peer-placeholder-shown:text-regular peer-placeholder-shown:bottom-5">
                    {' '}
                    Event
                  </span>
                </label>
              </div>
              <div>
                {/* Number of Tickets Input */}
                <label
                  htmlFor="numberOfTickets"
                  className="relative grid text-small"
                >
                  <input
                    type="number"
                    name="numberOfTickets"
                    min="1"
                    max={ticketsLeft}
                    value={formData.numberOfTickets}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        numberOfTickets: Number(e.target.value),
                      })
                    }
                    required
                    className="p-0 pb-1 border-t-0 border-b-2 placeholder-mørk border-grå border-x-0 bg-lys [appearance:textfield] focus:ring-2 focus:ring-primary pt-6 peer"
                  />
                  <span className="absolute text-grå transition-all opacity-100 bottom-7 peer-placeholder-shown:opacity-0 text-small peer-placeholder-shown:text-regular peer-placeholder-shown:bottom-5">
                    Antal billetter *
                  </span>
                </label>
              </div>
              <div>
                <label htmlFor="name" className="relative grid text-small">
                  <input
                    type="text"
                    placeholder="Fuldt navn *"
                    value={formData.navn}
                    onChange={(e) =>
                      setFormData({ ...formData, navn: e.target.value })
                    }
                    required
                    className="p-0 pb-1 border-t-0 border-b-2 placeholder-mørk border-grå border-x-0 bg-lys [appearance:textfield] focus:ring-2 focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none pt-6 peer "
                  />
                  <span className="absolute text-grå transition-all opacity-100 bottom-7 peer-placeholder-shown:opacity-0 text-small peer-placeholder-shown:text-regular peer-placeholder-shown:bottom-5">
                    {' '}
                    Fuldt navn *
                  </span>
                </label>
              </div>
              <div>
                <label htmlFor="telefon" className="relative grid text-small">
                  <input
                    type="tel"
                    name="telefon"
                    placeholder="Telefonnummer *"
                    value={formData.telefon}
                    onChange={(e) =>
                      setFormData({ ...formData, telefon: e.target.value })
                    }
                    className="p-0 pb-1 border-t-0 border-b-2 placeholder-mørk border-grå border-x-0 bg-lys [appearance:textfield] focus:ring-2 focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none pt-6 peer "
                  />
                  <span className="absolute text-grå transition-all opacity-100 bottom-7 peer-placeholder-shown:opacity-0 text-small peer-placeholder-shown:text-regular peer-placeholder-shown:bottom-5">
                    {' '}
                    Telefonnummer *
                  </span>
                </label>

                <label htmlFor="email" className="relative grid text-small">
                  <input
                    type="email"
                    name="email"
                    placeholder="Mailadresse *"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="p-0 pb-1 border-t-0 border-b-2 placeholder-mørk border-grå border-x-0 bg-lys [appearance:textfield] focus:ring-2 focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none pt-6 peer "
                  />
                  <span className="absolute text-grå transition-all opacity-100 bottom-7 peer-placeholder-shown:opacity-0 text-small peer-placeholder-shown:text-regular peer-placeholder-shown:bottom-5">
                    {' '}
                    Mailadresse *
                  </span>
                </label>
              </div>
              <div>
                <label htmlFor="school" className="grid text-small">
                  <select
                    value={formData.skole}
                    onChange={(e) =>
                      setFormData({ ...formData, skole: e.target.value })
                    }
                    required
                    className="p-0 pb-1 border-t-0 border-b-2 placeholder-mørk border-grå border-x-0 bg-lys [appearance:textfield] focus:ring-2 focus:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none pt-6 peer "
                  >
                    <option value="">Uddannelsesinstitution *</option>
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
                  <span className="absolute text-grå transition-all opacity-100 bottom-7 peer-placeholder-shown:opacity-0 text-small peer-placeholder-shown:text-regular peer-placeholder-shown:bottom-5">
                    {' '}
                    Uddannelsesinstitution *
                  </span>
                </label>
              </div>
              {/* Use the correct isFull state and disable the button during submission */}
              <AdvancedButton
                variant="primary"
                type="submit"
                disabled={isFull || submitting} // Disable if the event is full or the form is submitting
              >
                {isFull
                  ? 'Begivenheden er desværre fuld'
                  : submitting
                    ? 'Indsender...'
                    : 'Send tilmelding'}
              </AdvancedButton>
            </form>
          </div>
        )}
      </div>
    </Section>
  )
}

export default EventSignUpForm
