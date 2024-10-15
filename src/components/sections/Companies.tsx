import React from 'react'
import { clean } from '~/utils/sanitize'
import Section from './Section'
import Image from 'next/image'
import { urlFor } from '~/sanity/lib/sanity.image'
import CompanyCard from '../molecules/CompanyCard'

const Companies = ({ section }) => {
  return (
    <div>
      <AllCompanies section={section} />
    </div>
  )
}

export default Companies

function AllCompanies({ section }) {
  return (
    <>
      <Section tag={'ul'}>
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
