import Link from 'next/link'
import { getAllCompanies } from '@/sanity/lib/sanity.queries'
import Heading from '~/components/atoms/Heading'
import PageContainer from '~/components/PageContainer'
import Section from '~/components/sections/Section'

export default async function CompaniesPage() {
  const companies = await getAllCompanies()

  return (
    <PageContainer>
      <Section>
        <div className="col-span-full">
          <Heading>Virksomheder</Heading>
          <ul>
            {companies.map((company) => (
              <li className="py-4" key={company._id}>
                <Link href={`/karriere/${company.slug.current}`}>
                  {company.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </PageContainer>
  )
}
