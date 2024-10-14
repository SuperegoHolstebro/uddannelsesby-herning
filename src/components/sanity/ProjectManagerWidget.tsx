import React, { useState, useEffect } from 'react'
import Heading from '@/components/atoms/Heading'
import Paragraph from '../atoms/Paragraph'
import Image from 'next/image'
import { Spinner } from '@sanity/ui'

const ProjectManagerWidget = () => {
  const [contactData, setContactData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fetch the contact data from the proxy API route
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/proxyContact?url=${process.env.NEXT_PUBLIC_BASE_URL}`,
        )

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()

        if (data.length > 0) {
          setContactData(data[0].contactInfo)
        } else {
          setError('No contact information found for this project')
        }
      } catch (error) {
        setError(`Failed to fetch contact data: ${error.message}`)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading)
    return (
      <div className="flex flex-col items-center gap-4">
        <Spinner />
        <Paragraph>Indlæser data...</Paragraph>
      </div>
    )
  if (error) return <Paragraph>{error}</Paragraph>

  return (
    contactData && (
      <section className="flex h-full gap-8 p-6 pb-0 rounded-lg bg-light-0">
        <div className="pb-6">
          <Heading type="h3" tag="h3" className="font-light">
            Har du brug for hjælp?
          </Heading>
          <Paragraph className="pb-6 text-base max-w-prose">
            {contactData.description}
          </Paragraph>
          <Paragraph spacing="none" className="pb-12">
            Tlf:{' '}
            <a
              href={`tel:${contactData.phone}`}
              className="underline text-green"
            >
              {contactData.phone}
            </a>
            <br /> Mail:{' '}
            <a
              href={`mailto:${contactData.email}`}
              className="underline text-green"
            >
              {contactData.email}
            </a>
          </Paragraph>
        </div>

        <div>
          <Image
            className="object-cover h-full rounded-t-full aspect-w-16"
            src={contactData.imgSrc}
            alt={contactData.name}
            width={768}
            height={512}
          />
        </div>
      </section>
    )
  )
}

export default ProjectManagerWidget
