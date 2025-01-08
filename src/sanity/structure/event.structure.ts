import { ListItemBuilder } from 'sanity/structure'
import defineStructure from '@/utils/defineStructure'
import { Calendar, CalendarDown, CalendarUp } from '@mynaui/icons-react'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Begivenheder')
    .icon(Calendar)
    .child(
      S.list()
        .title('Begivenheder')
        .id('events')
        .items([
          // Upcoming Events Folder
          createFolder(
            S,
            'upcomingEvents',
            'Kommende begivenheder',
            CalendarUp,
            `
              _type == "event" && (startDate >= now() || (startDate <= now() && endDate >= now()))
            `,
          ),

          // Past Events Folder
          createFolder(
            S,
            'pastEvents',
            'Tidligere begivenheder',
            CalendarDown,
            `
              _type == "event" && (endDate < now() || (!endDate && startDate < now()))
            `,
          ),

          // All Events Folder
          createFolder(
            S,
            'allEvents',
            'Alle begivenheder',
            Calendar,
            `
              _type == "event"
            `,
          ),

          S.divider(),

          // Event Categories Folder
          S.documentTypeListItem('eventCategory').title(
            'Begivenhedskategorier',
          ),
        ]),
    ),
)

// Helper function to create folders dynamically
function createFolder(
  S,
  id: string,
  title: string,
  icon: React.ComponentType<any>,
  filter: string,
) {
  return S.listItem()
    .id(id)
    .title(title)
    .icon(icon)
    .child(
      S.documentTypeList('event')
        .title(title)
        .filter(filter)
        .apiVersion('2024-05-07') // Keep this to ensure consistent queries
        .child((documentId) =>
          S.document().documentId(documentId).schemaType('event'),
        ),
    )
}
