import { StructureResolver } from 'sanity/structure'
import pages from '~/sanity/structure/page.structure'
import events from '@/sanity/structure/event.structure'
import articles from './article.structure'
import employees from './employee.structure'
import settings from './settings.structure'
import companies from './company.structure'
import companyLogins from './companyLogin.structure'

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Indhold')
    .items([
      pages(S, context),
      events(S, context),
      articles(S, context),
      employees(S, context),
      S.divider(),
      companies(S, context),
      companyLogins(S, context),
      S.divider(),
      settings(S, context),
    ])
