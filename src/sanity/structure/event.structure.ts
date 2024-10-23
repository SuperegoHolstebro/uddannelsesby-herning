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
          // Upcoming events include events that haven't started or are ongoing
          S.listItem()
            .id('upcomingEvents')
            .title('Kommende begivenheder')
            .icon(CalendarUp)
            .child(
              S.documentTypeList('event')
                .title('Kommende begivenheder')
                .filter(
                  '_type == "event" && (startDate >= now() || (startDate <= now() && endDate >= now()))',
                )
                .child((documentId) =>
                  S.document().documentId(documentId).schemaType('event'),
                ),
            ),
          // Past events include events that have already ended or single-day events that have already started
          S.listItem()
            .id('pastEvents')
            .title('Tidligere begivenheder')
            .icon(CalendarDown)
            .child(
              S.documentTypeList('event')
                .title('Tidligere begivenheder')
                .filter(
                  '_type == "event" && (endDate < now() || (!endDate && startDate < now()))',
                )
                .child((documentId) =>
                  S.document().documentId(documentId).schemaType('event'),
                ),
            ),
        ]),
    ),
)
