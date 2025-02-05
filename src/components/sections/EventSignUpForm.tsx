'use client'

import { useState, useEffect } from 'react'
import Section from './Section'
import { AdvancedButton } from '../atoms/AdvancedButton'
import punycode from 'punycode/'
import Heading from '../atoms/Heading'
import Paragraph from '../atoms/Paragraph'
import Link from 'next/link'

function EventSignUpForm({ event, locale }) {
  const isDanish = locale === 'da'

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
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Calculate remaining tickets
  useEffect(() => {
    const bookedTickets =
      event.attendees?.reduce(
        (sum, attendee) => sum + (attendee.numberOfTickets || 0),
        0,
      ) || 0
    const maxTickets = event.maxAttendees ?? 0
    setTicketsLeft(maxTickets - bookedTickets)
    setIsFull(maxTickets - bookedTickets <= 0)
  }, [event.attendees, event.maxAttendees])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isFull) {
      // Prevent form submission if the event is full
      alert(isDanish ? 'Begivenheden er fuld' : 'The event is full')
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
        setIsSubmitted(true) // Set submission state to true
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
        const maxTickets = event.maxAttendees ?? 0
        setTicketsLeft(maxTickets - newBookedTickets)
      } else {
        alert(
          isDanish
            ? 'Der skete en fejl. Prøv igen senere'
            : 'An error occurred. Please try again later',
        )
      }
    } catch (error) {
      alert(
        isDanish
          ? 'Der skete en fejl. Prøv igen senere'
          : 'An error occurred. Please try again later',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Section
      variant="primary"
      paddingX="none"
      paddingTop="none"
      className=" col-span-full"
      tag={'div'}
    >
      <div className="col-start-1 -col-end-1 sm:col-start-2 sm:-col-end-2 lg:col-start-3 lg:-col-end-3 xl:col-start-6 xl:-col-end-6 2xl:col-start-6 2xl:-col-end-6">
        {event.isExternal ? (
          <Link
            href={event?.externalLink || '#'}
            target="_blank"
            rel="noopener noreferrer"
          >
            {isDanish ? 'Gå til begivenhed' : 'Go to event'}
          </Link>
        ) : isSubmitted ? (
          <Paragraph spacing="small" className="font-bold col-span-full">
            {isDanish
              ? 'Du er nu tilmeldt begivenheden'
              : 'You are now signed up for the event'}
          </Paragraph>
        ) : (
          <div>
            <Heading
              spacing="small"
              type="h3"
              tag="h3"
              className="col-span-full"
            >
              {isDanish ? 'Tilmeld dig nu' : 'Sign up now'}
            </Heading>

            <Paragraph spacing="small" className="col-span-full">
              {isDanish
                ? 'Udfyld formularen herunder og sikre dig billetter til eventet allerede nu.'
                : 'Fill out the form below and secure your tickets to the event now.'}
            </Paragraph>

            <Paragraph spacing="small" className="font-bold col-span-full">
              {ticketsLeft}{' '}
              {isDanish ? 'tilgængelige billetter' : 'tickets available'}
            </Paragraph>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                    className="p-0 pb-1 border-t-0 border-b-2 placeholder-mørk border-grå border-x-0 bg-lys  pt-6 peer"
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
                    max={Math.min(
                      ticketsLeft,
                      event.customMaxTickets ?? ticketsLeft,
                    )}
                    value={formData.numberOfTickets}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        numberOfTickets: Number(e.target.value),
                      })
                    }
                    required
                    className="p-0 pb-1 border-t-0 border-b-2 placeholder-mørk border-grå border-x-0 bg-lys pt-6 peer"
                  />

                  <span className="absolute text-grå transition-all opacity-100 bottom-7 peer-placeholder-shown:opacity-0 text-small peer-placeholder-shown:text-regular peer-placeholder-shown:bottom-5">
                    {locale === 'da'
                      ? 'Antal billetter *'
                      : 'Number of tickets *'}
                  </span>
                </label>
              </div>
              <div>
                <label htmlFor="name" className="relative grid text-small">
                  <input
                    type="text"
                    placeholder={isDanish ? 'Fuldt navn *' : 'Full name *'}
                    value={formData.navn}
                    onChange={(e) =>
                      setFormData({ ...formData, navn: e.target.value })
                    }
                    required
                    className=" p-0 pb-1 border-t-0 border-b-2 placeholder-mørk border-grå border-x-0 bg-lys pt-6 peer "
                  />
                  <span className="absolute text-grå transition-all opacity-100 bottom-7 peer-placeholder-shown:opacity-0 text-small peer-placeholder-shown:text-regular peer-placeholder-shown:bottom-5">
                    {isDanish ? 'Fuldt navn *' : 'Full name *'}
                  </span>
                </label>
              </div>
              <div>
                <label htmlFor="telefon" className="relative grid text-small">
                  <input
                    type="tel"
                    name="telefon"
                    placeholder={
                      isDanish ? 'Telefonnummer *' : 'Phone number *'
                    }
                    value={formData.telefon}
                    onChange={(e) =>
                      setFormData({ ...formData, telefon: e.target.value })
                    }
                    className="p-0 pb-1 border-t-0 border-b-2 placeholder-mørk border-grå border-x-0 bg-lys  appearance-none pt-6 peer "
                  />
                  <span className="absolute text-grå transition-all opacity-100 bottom-7 peer-placeholder-shown:opacity-0 text-small peer-placeholder-shown:text-regular peer-placeholder-shown:bottom-5">
                    {' '}
                    {isDanish ? 'Telefonnummer *' : 'Phone number *'}{' '}
                  </span>
                </label>

                <label htmlFor="email" className="relative grid text-small">
                  <input
                    type="email"
                    name="email"
                    placeholder={isDanish ? 'Mailadresse *' : 'Email *'}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="p-0 pb-1 border-t-0 border-b-2 placeholder-mørk border-grå border-x-0 bg-lys  appearance-none pt-6 peer "
                  />
                  <span className="absolute text-grå transition-all opacity-100 bottom-7 peer-placeholder-shown:opacity-0 text-small peer-placeholder-shown:text-regular peer-placeholder-shown:bottom-5">
                    {' '}
                    {isDanish ? 'Mailadresse *' : 'Email *'}{' '}
                  </span>
                </label>
              </div>
              <div className="mb-4">
                <label htmlFor="school" className="relative grid text-small">
                  <select
                    value={formData.skole}
                    onChange={(e) =>
                      setFormData({ ...formData, skole: e.target.value })
                    }
                    required
                    className="p-0 pb-1 border-t-0 border-b-2 placeholder-mørk border-grå border-x-0 bg-lys  appearance-none pt-6 peer "
                  >
                    <option value="">
                      {isDanish
                        ? 'Uddannelsesinstitution *'
                        : 'Educational instituition *'}
                    </option>
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
                    <option value="Herningsholm Erhvervsskole">
                      Herningsholm Erhvervsskole
                    </option>
                    <option value="Andet">Andet</option>
                  </select>
                  <span className="absolute text-grå transition-all opacity-100 bottom-7 peer-placeholder-shown:opacity-0 text-small peer-placeholder-shown:text-regular peer-placeholder-shown:bottom-5">
                    {' '}
                    Uddannelsesinstitution *
                  </span>
                </label>
              </div>
              {/* Use the correct isFull state and disable the button during submission */}
              <AdvancedButton
                variant="default"
                type="submit"
                disabled={isFull || submitting}
              >
                {isFull
                  ? isDanish
                    ? 'Begivenheden er desværre fuld'
                    : 'The event is full'
                  : submitting
                    ? isDanish
                      ? 'Indsender...'
                      : 'Submitting...'
                    : isDanish
                      ? 'Send tilmelding'
                      : 'Submit'}
              </AdvancedButton>
            </form>
          </div>
        )}
      </div>
    </Section>
  )
}

export default EventSignUpForm
