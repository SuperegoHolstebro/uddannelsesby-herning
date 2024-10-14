import React from 'react'
import Section from '@/components/sections/Section'
import Heading from '@/components/atoms/Heading'
import EmployeeCard from '@/components/molecules/EmployeeCard'
import { clean } from '~/utils/sanitize'

const EmployeesSection = ({ section }) => {
  return (
    <Section
    id={clean(section?.SectionSettings?.anchor?.current)}
    paddingTop={clean(section?.design?.padding?.spacingTop)}
    paddingBottom={clean(section?.design?.padding?.spacingBottom)}
      variant={clean(section.design.color.color)}
    >
      <div className="col-span-full">
        <Heading>
          {section.heading}
        </Heading>
      </div>
      <EmployeesSection.Department section={section} />
      <EmployeesSection.All section={section} />
      <EmployeesSection.Manual section={section} />
    </Section>
  )
}

export default EmployeesSection
EmployeesSection.Department = Department
EmployeesSection.All = All
EmployeesSection.Manual = Manual

function Department({ section }) {
  return (
    <>
      {clean(section.view) === 'department' && (
        <>
          {section.department.map((department, index) => (
            <Section
              paddingX="none"
              paddingBottom="none"
              paddingTop="none"
              tag={'div'}
              key={index}
              className="col-span-full"
            >
              <div className="col-span-full">
                <Heading>{department.title}</Heading>
              </div>
              {department.employees.map((employee, index) => (
                <EmployeeCard key={index} employee={employee} />
              ))}
            </Section>
          ))}
        </>
      )}
    </>
  )
}
function Manual({ section }) {
  return (
    <>
      {clean(section.view) === 'manual' && (
        <>
          {section.employees.map((employee, index) => (
            <EmployeeCard key={index} employee={employee} />
          ))}
        </>
      )}
    </>
  )
}
function All({ section }) {
  return (
    <>
      {clean(section.view) === 'all' && (
        <>
          {section.employees.map((employee, index) => (
            <EmployeeCard key={index} employee={employee} />
          ))}
        </>
      )}
    </>
  )
}
