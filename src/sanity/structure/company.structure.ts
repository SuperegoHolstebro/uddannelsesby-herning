import { ListItemBuilder } from 'sanity/structure'
import defineStructure from '@/utils/defineStructure'
import { BuildingOne } from '@mynaui/icons-react'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Virksomheder')
    .icon(BuildingOne)
    .child(
      S.documentTypeList('company')
        .title('Virksomheder')
        .child((documentId) =>
          S.document().documentId(documentId).schemaType('company'),
        ),
    ),
)
