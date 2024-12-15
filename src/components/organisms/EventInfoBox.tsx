import React from 'react'
import { eventDateRange, formatTime } from '~/utils/date'
import Section from '../sections/Section'
import Box from '../atoms/box'
import Icon from '../atoms/Icons'
import Heading from '../atoms/Heading'
import Paragraph from '../atoms/Paragraph'

const EventInfoBox = ({ page }) => {
  // Calculate remaining tickets based on the number of tickets booked
  const maxAttendees = page.maxAttendees || 0
  const bookedTickets =
    page.attendees?.reduce(
      (
        sum,
        attendee: {
          name: string
          email: string
          phone: string
          school: string
          numberOfTickets: number
        },
      ) => sum + (attendee.numberOfTickets || 0),
      0,
    ) || 0
  const ticketsLeft = maxAttendees - bookedTickets

  return (
    <Section
      paddingBottom="none"
      paddingTop="none"
      className="py-16 sm:py-20 md:py-0 lg:py-0 xl:pt-0 2xl:pt-0"
    >
      {' '}
      <div
        className={`grid grid-cols-1 gap-4 text-center col-span-full sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 md:p-12 md:flex-row divide-x border-grå`}
      >
        {page.startDate && (
          <Box>
            <Icon type="calendar" className="w-8 h-8" />
            <Heading type="h5" tag="h5" spacing="default">
              {/* Use eventDateRange and pass the correct properties */}
              {eventDateRange(page.startDate, page.endDate, page.isMultiDay)}
            </Heading>
            <Paragraph spacing="none">Dato</Paragraph>
          </Box>
        )}

        {page.startDate && (
          <Box>
            <Icon type="clock" className="w-8 h-8" />
            <Heading type="h5" tag="h5" spacing="default">
              {formatTime(page.startDate)}
              {page?.endDate && (
                <span>
                  <span className="hidden md:inline-block">-</span>
                  <span className="md:hidden">
                    <br />
                  </span>
                </span>
              )}
              {formatTime(page?.endDate)}
            </Heading>
            <Paragraph spacing="none">Tidspunkt</Paragraph>
          </Box>
        )}

        {page.location && (
          <Box>
            <Icon type="streetSign" className="w-8 h-8" />
            <Heading type="h5" tag="h5" spacing="default">
              {page.location}
            </Heading>
            <Paragraph spacing="none">Lokation</Paragraph>
          </Box>
        )}

        <Box>
          <Icon type="tickets" className="w-8 h-8" />
          <Heading type="h5" tag="h5" spacing="default">
            {page.isFull
              ? 'Ingen'
              : page.isExternal
                ? 'Stadig'
                : ticketsLeft > 0
                  ? `${ticketsLeft}`
                  : 'Ingen'}
          </Heading>
          <Paragraph spacing="none"> Billetter tilgængelige</Paragraph>
        </Box>
      </div>
    </Section>
  )
}

export default EventInfoBox
