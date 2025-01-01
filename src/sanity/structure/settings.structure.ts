import { ListItemBuilder } from 'sanity/structure'
import defineStructure from '@/utils/defineStructure'
import { CornerUpRight, PanelBottom, PanelTop, Map } from '@mynaui/icons-react'
import companyLogins from './companyLogin.structure'
import experience from './experience.structure'

import { SettingsIcon } from '~/components/sanity/PageBuilderIcons'

export default defineStructure<ListItemBuilder>((S, context) =>
  S.listItem()
    .title('Indstillinger')
    .icon(SettingsIcon)
    .id('indstillinger')
    .child(
      S.list()
        .title('Indstillinger')
        .items([
          S.listItem()
            .title('Sideindstillinger')
            .icon(SettingsIcon)
            .child(S.document().schemaType('settings').views([S.view.form()])),
          S.listItem()
            .title('Navigation')
            .icon(PanelTop)
            .child(
              S.document().schemaType('navigation').views([S.view.form()]),
            ),
          S.listItem()
            .title('Footer')
            .icon(PanelBottom)
            .child(S.document().schemaType('footer').views([S.view.form()])),
          S.listItem()
            .icon(CornerUpRight)
            .title('Redirect')
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('redirect')
                .views([S.view.form().id('redirectEditor')]),
            ),
          S.divider(),
          S.listItem()
            .title('Kort kategorier')
            .icon(Map)
            .child(
              S.documentTypeList('MapCategory')
                .title('Kort kategorier')
                .child((documentId) =>
                  S.document().documentId(documentId).schemaType('MapCategory'),
                ),
            ),
          companyLogins(S, context),
          experience(S, context),
        ]),
    ),
)
