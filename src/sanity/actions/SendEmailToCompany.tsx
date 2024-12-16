import { useClient } from 'sanity'
import { useToast, Button, Dialog, Stack, Text } from '@sanity/ui'
import { useState } from 'react'
import axios from 'axios'
import bcrypt from 'bcryptjs'

export const SendEmailToCompanyAction = (props) => {
  const { id: documentId } = props
  const client = useClient({ apiVersion: '2024-05-07' })
  const toast = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [message, setMessage] = useState('')

  const handleOpenDialog = () => {
    setIsDialogOpen(true)
  }

  const handleSendEmail = async () => {
    setIsSending(true)
    setMessage('')

    try {
      // Fetch the company document to get the email and password
      const query = `
        *[_type == "companyLogin" && companyRef._ref == $id][0]{
            _id,
            username,
            password,
            email,
            companyRef->{
                _id,
                name
            }
        }
      `

      const params = { id: documentId }
      const company = await client.fetch(query, params)

      console.log('Fetched company data:', company) // Debug log

      if (!company) {
        throw new Error('Ingen virksomhed fundet for dette ID.')
      }

      let email = company?.email
      let password = company.password
      let username = company.username

      // If the password is hashed, generate a new plain-text password
      if (password && password.startsWith('$2a$')) {
        console.log(
          'Detekteret hashet adgangskode. Genererer en ny adgangskode i klartekst...',
        )
        password = Math.random().toString(36).slice(-10)

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Update the hashed password in the database
        await client
          .patch(company._id) // Specify the document ID to update
          .set({ password: hashedPassword }) // Set the new hashed password
          .commit() // Commit the update

        console.log('Ny adgangskode genereret og opdateret succesfuldt!')
      }

      if (!email) {
        throw new Error('Ingen email fundet for denne virksomhed.')
      }

      // Make the API call to send the email
      console.log('Sending request to /api/send-company-email...')
      const response = await axios.post('/api/send-company-email', {
        email,
        password,
        username,
      })

      console.log('API Response:', response.data)

      toast.push({
        status: 'success',
        title: 'Emailen blev sendt',
        description: 'Emailen blev sendt til virksomheden.',
      })

      setMessage('Email sent successfully!')
    } catch (error) {
      console.error('Error sending email:', error)
      toast.push({
        status: 'error',
        title: 'Der opstod en fejl',
        description: `Der opstod en fejl: ${error.message}`,
      })
      setMessage(`Fejl ved afsendelse af email: ${error.message}`)
    } finally {
      setIsSending(false)
      setIsDialogOpen(false)
    }
  }

  return {
    label: 'Send email med adgangskode',
    onHandle: handleOpenDialog,
    dialog: isDialogOpen && {
      onClose: () => setIsDialogOpen(false),
      header: 'Send email med adgangskode',
      content: (
        <Stack space={4} padding={4}>
          <Text>
            Er du sikker på, at du vil sende en email med loginadgangskoden til
            dette firma?
          </Text>
          <Button
            text={isSending ? 'Sender...' : 'Send email'}
            tone="primary"
            onClick={handleSendEmail}
            disabled={isSending}
          />
          <Button
            text="Annuller"
            tone="critical"
            onClick={() => setIsDialogOpen(false)}
          />
          {message && <Text>{message}</Text>}
        </Stack>
      ),
    },
  }
}
