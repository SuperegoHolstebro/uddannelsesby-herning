import { StructureResolver } from 'sanity/structure'
import pages from '~/sanity/structure/page.structure'
import events from '@/sanity/structure/event.structure'
import settings from './settings.structure'
import fields from './field.structure'
import school from './school.structure'
import experience from './experience.structure'
import discounts from './discounts.structure'
import company from './company.structure'

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
      S.divider(),
      settings(S, context),
    ])
