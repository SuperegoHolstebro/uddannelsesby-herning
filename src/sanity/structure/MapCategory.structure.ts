import { ListItemBuilder } from 'sanity/structure'
import defineStructure from '@/utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Kort kategorier')
    .child(
      S.documentTypeList('MapCategory')
        .title('Kort kategorier')
        .child((documentId) =>
          S.document().documentId(documentId).schemaType('MapCategory'),
        ),
    ),
)
