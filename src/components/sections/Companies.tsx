import React from 'react'
import { clean } from '~/utils/sanitize'
import Section from './Section'
import Image from 'next/image'
import { urlFor } from '~/sanity/lib/sanity.image'
import CompanyCard from '../molecules/CompanyCard'
import Heading from '../atoms/Heading'

const Companies = ({ section }) => {
  return (
    <div>
      <AllCompanies section={section} />
    </div>
  )
}

export default Companies

function AllCompanies({ section }) {
  // Count the number of companies
  const companyCount = section.companies.length

  return (
    <>
      <Section paddingBottom="none">
        <div className="flex items-end pb-12 col-span-full">
          <Heading type="h2" tag="h2" spacing="none" className="w-1/2 ">
            {companyCount} virksomheder kan se det for sig
          </Heading>
          <Heading
            type="h3"
            tag="h3"
            spacing="none"
            className="w-1/2 text-right "
          >
            kategorier
          </Heading>
        </div>
      </Section>
      <Section paddingTop="none" tag={'ul'}>
        {clean(section.view) === 'all' && (
          <>
            {section.companies.map((company, index) => (
              <CompanyCard key={index} company={company} />
            ))}
          </>
        )}
      </Section>
    </>
  )
}
