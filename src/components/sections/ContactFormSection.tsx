'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Heading from '@/components/atoms/Heading'
import Paragraph from '@/components/atoms/Paragraph'
import Section from '@/components/sections/Section'
import { AdvancedButton } from '../atoms/AdvancedButton'
import { clean } from '~/utils/sanitize'

const ContactFormSection = ({ data }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })

  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false) // For handling loading state

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true) // Show loading state when submitting

    try {
      // Send the form data to the API
      const response = await axios.post('/api/send-email', formData)
      setStatus('Din besked er sendt.') // Success message
      setFormData({ firstName: '', lastName: '', email: '', phone: '' }) // Clear the form
    } catch (error) {
      console.error('Error sending email:', error)
      setStatus('Der skete dersværre en fejl.') // Error message
    } finally {
      setLoading(false) // Hide loading state after request completes
    }
  }

  return (
    <Section
      variant={'grøn'}
      id={clean(data?.SectionSettings?.anchor?.current)}
      paddingTop={clean(data?.design?.padding?.spacingTop)}
      paddingBottom={clean(data?.design?.padding?.spacingBottom)}
      className={`relative overflow-hidden`}
    >
      <div className="grid col-span-full md:grid-cols-2">
        <div className="col-span-1 pb-8 pr-20 prose-p:font-extralight">
          <Heading type="h3" className="" spacing="small">
            {data?.heading._type} 
          </Heading>
          <Paragraph className="font-extralight">{data?.description}</Paragraph>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="firstName"
            placeholder="Fornavn*"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full font-sans border-0 border-b font-extralight border-b-lys bg-inherit text-lys placeholder:text-lys"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Efternavn"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full font-sans border-0 border-b font-extralight border-b-lys bg-inherit text-lys placeholder:text-lys"
          />
          <input
            type="email"
            name="email"
            placeholder="Email*"
            value={formData.email}
            onChange={handleChange}
            className="w-full font-sans border-0 border-b font-extralight border-b-lys bg-inherit text-lys placeholder:text-lys"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Telefon*"
            value={formData.phone}
            onChange={handleChange}
            className="w-full font-sans border-0 border-b font-extralight border-b-lys bg-inherit text-lys placeholder:text-lys"
            required
          />

          <AdvancedButton
            type="submit"
            variant="secondary"
            className="font-sans !mt-8"
            disabled={loading} // Disable the button while loading
          >
            {loading ? 'Sender...' : 'Bliv kontaktet'} {/* Show loading text */}
          </AdvancedButton>
        </form>

        {/* Show status message */}
        {status && <Paragraph className="mt-4">{status}</Paragraph>}
      </div>
    </Section>
  )
}

export default ContactFormSection
