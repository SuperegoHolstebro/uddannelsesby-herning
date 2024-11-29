import { useClient } from 'sanity'

export const DownloadAttendeesAction = (props) => {
  const client = useClient()

  const handleDownload = async () => {
    // Fetch the event including the array of attendees directly from the event document
    const event = await client.fetch(
      `*[_id == $id] {title, startDate, attendees }[0]`,
      {
        id: props.id,
      },
    )

    if (!event?.attendees?.length) {
      alert('No attendees found')
      return
    }

    // Create CSV content from the attendees array
    const csvContent = [
      ['Navn', 'Email', 'Telefon', 'Skole', 'Antal Billetter'], // CSV headers
      ...event.attendees.map((attendee) => [
        attendee.name || 'N/A',
        attendee.email || 'N/A',
        attendee.phone || 'N/A',
        attendee.school || 'N/A',
        attendee.numberOfTickets || 0, // Include the number of tickets
      ]),
    ]
      .map((row) => row.join(';')) // Use semicolon (;) as the delimiter
      .join('\n')

    const eventDate = event.startDate
      ? new Date(event.startDate).toLocaleDateString('da-DK')
      : 'uden_dato'

    // Use the event title for the filename, falling back to a default if title is not available
    const fileName = event.title
      ? `${event.title}_${eventDate}_deltagerliste.csv`
      : `deltagere_${eventDate}.csv`

    // Create a downloadable file for the CSV
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return {
    label: 'Download liste over deltagere',
    onHandle: () => {
      handleDownload()
      props.onComplete() // Mark action as complete
    },
  }
}
