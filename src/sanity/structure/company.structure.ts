import { ListItemBuilder } from 'sanity/structure'
import defineStructure from '@/utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Virksomheder')
    .child(
      S.documentTypeList('company')
        .title('Virksomheder')
        .child((documentId) =>
          S.document().documentId(documentId).schemaType('company'),
        ),
    ),
)
