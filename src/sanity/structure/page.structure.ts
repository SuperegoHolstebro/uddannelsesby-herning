import { ListItemBuilder } from 'sanity/structure'
import defineStructure from '@/utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Sider')
    .child(
      S.documentTypeList('page')
        .title('Sider')
        .child((documentId) =>
          S.document().documentId(documentId).schemaType('page'),
        ),
    ),
)
