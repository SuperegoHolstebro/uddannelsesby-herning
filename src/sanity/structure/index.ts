import { StructureResolver } from 'sanity/structure'
import pages from '~/sanity/structure/page.structure'
import events from '@/sanity/structure/event.structure'
import articles from './article.structure'
import employees from './employee.structure'
import settings from './settings.structure'
import fields from './field.structure'
import school from './school.structure'
import companyInfo from './companyInfo.structure'
import discounts from './discounts.structure'
import company from './company.structure'

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Indhold')
    .items([
      pages(S, context),
      events(S, context),
      articles(S, context),
      school(S, context),
      employees(S, context),
      S.divider(),
      company(S, context),
      fields(S, context),
      S.divider(),
      discounts(S, context),
      S.divider(),
      settings(S, context),
    ])
