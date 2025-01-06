import { ListItemBuilder } from 'sanity/structure'
import defineStructure from '@/utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Oplevelser')
    .child(
      S.documentTypeList('experience')
        .title('Oplevelser')
        .child((documentId) =>
          S.document().documentId(documentId).schemaType('experience'),
        ),
    ),
)
