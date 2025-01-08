import { ListItemBuilder } from 'sanity/structure'
import defineStructure from '@/utils/defineStructure'
import { AddQueue } from '@mynaui/icons-react'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Popup')
    .child(
      S.documentTypeList('popup')
        .title('Popup')
        .child((documentId) =>
          S.document().documentId(documentId).schemaType('popup'),
        ),
    ),
)
