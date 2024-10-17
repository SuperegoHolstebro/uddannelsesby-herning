import { ListItemBuilder } from 'sanity/structure'
import defineStructure from '@/utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Fagområder')
    .child(
      S.documentTypeList('field')
        .title('Fagområder')
        .child((documentId) =>
          S.document().documentId(documentId).schemaType('field'),
        ),
    ),
)
