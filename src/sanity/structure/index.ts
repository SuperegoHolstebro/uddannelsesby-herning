import { StructureResolver } from 'sanity/structure'
import pages from '~/sanity/structure/page.structure'
import events from '@/sanity/structure/event.structure'
import settings from './settings.structure'
import fields from './field.structure'
import school from './school.structure'
import experience from './experience.structure'
import discounts from './discounts.structure'
import company from './company.structure'
import popup from './popup.structure'
import { CornerUpRight, PanelBottom, PanelTop, Map } from '@mynaui/icons-react'

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Indhold')
    .items([
      pages(S, context),
      events(S, context),
      school(S, context),
      S.divider(),
      company(S, context),
      fields(S, context),
      S.divider(),
      discounts(S, context),
      experience(S, context),
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
      popup(S, context),
      S.divider(),
      settings(S, context),
    ])
