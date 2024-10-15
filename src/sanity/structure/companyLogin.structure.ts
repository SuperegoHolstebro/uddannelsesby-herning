import { ListItemBuilder } from 'sanity/structure'
import defineStructure from '@/utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Virksomheder Login')
    .child(
      S.documentTypeList('companyLogin')
        .title('Virksomheder Login')
        .child((documentId) =>
          S.document().documentId(documentId).schemaType('companyLogin'),
        ),
    ),
)
