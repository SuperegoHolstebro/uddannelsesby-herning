import { useClient } from 'sanity'

export const DownloadAttendeesAction = (props) => {
  const client = useClient()

  const handleDownload = async () => {
    // Fetch the event including the array of attendees directly from the event document
    const event = await client.fetch(`*[_id == $id] {title, attendees }[0]`, {
      id: props.id,
    })

    if (!event?.attendees?.length) {
      alert('No attendees found')
      return
    }

    // Create CSV content from the attendees array
    const csvContent = [
      ['Name', 'Email', 'School'], // CSV headers
      ...event.attendees.map((attendee) => [
        attendee.name,
        attendee.email,
        attendee.school,
      ]),
    ]
      .map((row) => row.join(';')) // Use semicolon (;) as the delimiter
      .join('\n')

    // Use the event title for the filename, falling back to a default if title is not available
    const fileName = event.title
      ? `${event.title}_deltagere.csv`
      : 'deltagere.csv'

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
    label: 'Download liste af deltagere',
    onHandle: () => {
      handleDownload()
      props.onComplete() // Mark action as complete
    },
  }
}
