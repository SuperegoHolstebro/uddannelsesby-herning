'use client'
import React, { useState } from 'react'
import { clean } from '~/utils/sanitize'
import Section from './Section'
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
  const [selectedField, setSelectedField] = useState('all')

  const handleFilterChange = (event) => {
    setSelectedField(event.target.value)
  }

  // Get a unique list of all fields
  const allFields = [
    ...new Set(
      section.companies.flatMap((company) =>
        company.fields ? company.fields.map((field) => field.title) : [],
      ),
    ),
  ]

  // Filter companies based on the selected field
  const filteredCompanies =
    selectedField === 'all'
      ? section.companies
      : section.companies.filter((company) =>
          company.fields?.some((field) => field.title === selectedField),
        )

  // Count the number of companies
  const companyCount = section.companies.length

  return (
    <>
      <Section paddingBottom="none">
        <div className="grid items-end pb-12 col-span-full grid-cols-subgrid">
          <Heading
            type="h2"
            tag="h2"
            spacing="none"
            className="col-span-full sm:col-span-6 max-w-prose md:col-span-9 xl:col-span-18"
          >
            {companyCount} virksomheder kan se det for sig
          </Heading>

          {clean(section.view) === 'all' && (
            <select
              className="mt-4 col-span-full sm:col-span-2 md:col-span-3 xl:col-span-6"
              value={selectedField}
              onChange={handleFilterChange}
            >
              <option value="all">Alle</option>
              {allFields.map((field: string, index) => (
                <option key={index} value={field}>
                  {field}
                </option>
              ))}
            </select>
          )}
        </div>
      </Section>
      <Section paddingTop="none" tag="ul">
        {clean(section.view) === 'all' && (
          <>
            {filteredCompanies.map((company, index) => (
              <CompanyCard key={index} company={company} />
            ))}
          </>
        )}
      </Section>
    </>
  )
}
