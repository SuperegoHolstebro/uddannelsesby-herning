import { ListItemBuilder } from 'sanity/structure'
import defineStructure from '@/utils/defineStructure'
import { Calendar, CalendarDown, CalendarUp } from '@mynaui/icons-react'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Rabatter')
    .icon(Calendar)
    .child(
      S.list()
        .title('Rabatter')
        .id('discounts')
        .items([
          // All events
          S.listItem()
            .title('Alle rabatter')
            .icon(Calendar)
            .child(
              S.documentTypeList('discounts').child((documentId) =>
                S.document().documentId(documentId).schemaType('discounts'),
              ),
            ),
          S.divider(),
          S.documentTypeListItem('discountsTag').title('Rabat kategorier'),
        ]),
    ),
)
