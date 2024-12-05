import { ListItemBuilder } from 'sanity/structure'
import defineStructure from '@/utils/defineStructure'
import companies from './company.structure'
import companyLogins from './companyLogin.structure'
import { Folder } from '@mynaui/icons-react'

export default defineStructure<ListItemBuilder>((S, context) =>
  S.listItem()
    .title('Virksomheder')
    .icon(Folder)
    .child(
      S.list()
        .title('Virksomheder')
        .id('companyInfo')
        .items([companies(S, context), companyLogins(S, context)]),
    ),
)
