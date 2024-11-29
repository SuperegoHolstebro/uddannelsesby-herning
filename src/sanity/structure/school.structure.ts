import { ListItemBuilder } from 'sanity/structure'
import defineStructure from '@/utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Uddannelsessteder')
    .child(
      S.documentTypeList('school')
        .title('Uddannelsessteder')
        .child((documentId) =>
          S.document().documentId(documentId).schemaType('school'),
        ),
    ),
)
