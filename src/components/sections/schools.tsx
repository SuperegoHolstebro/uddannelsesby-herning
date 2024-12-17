import React from 'react'
import Section from './Section'
import SchoolCard from '../atoms/SchoolCard'

const Schools = ({ data }) => {
  return (
    <Section data={data}>
      {data.schools.map((school, index) => (
        <SchoolCard data={school} key={index} />
      ))}
    </Section>
  )
}

export default Schools
