'use client'

import { useState } from 'react'
import { AdvancedButton } from './atoms/AdvancedButton'
import Section from '~/components/sections/Section'
import Heading from '~/components/atoms/Heading'
import SignOut from './atoms/Signout'

export default function EditCompanyForm({ session, company }) {
  const [companyName, setCompanyName] = useState(company?.name || '')
  const [companyDescription, setCompanyDescription] = useState(
    company?.description || '',
  )
  const [email, setEmail] = useState(company?.email || '')
  const [address, setAddress] = useState(company?.address || '')
  const [phone, setPhone] = useState(company?.phone || '')
  const [documentId] = useState(company?._id || '')
  const [loading, setLoading] = useState(false) // Add loading state

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true) // Set loading to true when form is submitted

    // Submit the updated company data to the API route
    const res = await fetch('/api/updateCompany', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        documentId,
        companyName,
        companyDescription,
        email,
        address,
        phone,
      }),
    })

    const result = await res.json()
    if (result.success) {
      alert('Virksomhedens information er blevet opdateret')
      setLoading(false) // Reset loading state after submission
    } else {
      alert('Error updating company information')
      setLoading(false) // Reset loading state after submission
    }
  }

  return (
    <Section variant="lys">
      <div className="flex items-center justify-center min-h-screen/1.5 col-span-full text-center">
        <div className="md:w-1/2">
          <Heading type="h2" tag="h2">
            Velkommen tilbage, {companyName}!
          </Heading>
          <p className="mb-4">Her kan du redigere virksomhedens information.</p>

          {/* Display company image if available */}
          {/*               {company?.image && (
              <div className="mb-4">
                <Image
                  src={`/api/sanity/image/${company.image.asset._ref}`} 
                  alt={`${companyName} Logo`}
                  width={200}
                  height={200}
                  className="mx-auto rounded"
                />
              </div>
            )}  */}

          <form onSubmit={handleSubmit}>
            {/* Company Name */}
            <div className="mb-4">
              <label
                htmlFor="companyName"
                className="block mb-2 font-medium text-left"
              >
                Virksomhedens navn:
              </label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Virksomhedens navn"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            {/* Company Description */}
            <div className="mb-4">
              <label
                htmlFor="companyDescription"
                className="block mb-2 font-medium text-left"
              >
                Virksomhedens beskrivelse:
              </label>
              <textarea
                id="companyDescription"
                name="companyDescription"
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
                placeholder="Virksomhedens beskrivelse"
                className="w-full p-2 border border-gray-300 rounded"
                rows={6}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 font-medium text-left"
              >
                Email:
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Virksomhedens email"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Address */}
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block mb-2 font-medium text-left"
              >
                Adresse:
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Virksomhedens adresse"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block mb-2 font-medium text-left"
              >
                Telefon:
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Virksomhedens telefonnummer"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <AdvancedButton
              variant="default"
              type="submit"
              className="w-full px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? 'Opdaterer...' : 'Opdater'}{' '}
              {/* Change text based on loading state */}
            </AdvancedButton>
          </form>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 pb-8 pr-8 col-span-full">
        <SignOut />
      </div>
    </Section>
  )
}
