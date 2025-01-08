import { useClient } from 'sanity'
import { useToast, Button, Dialog, Stack, Text } from '@sanity/ui'
import { useState } from 'react'

export function GoToCompanyLoginAction({ documentId }) {
  const client = useClient({ apiVersion: '2024-05-07' })
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleOpenDialog = () => {
    setIsDialogOpen(true)
  }

  const handleLoginRedirect = async () => {
    setLoading(true)
    try {
      if (!documentId) {
        throw new Error('Document ID is missing.')
      }

      console.log('Current document ID:', documentId)

      // Fetch the companyLogin document referencing the current company
      const companyLogin = await client.fetch(
        `*[_type == "companyLogin" && companyRef._ref == $companyId][0]`,
        { companyId: documentId },
      )

      console.log('Fetched companyLogin document:', companyLogin)

      if (companyLogin) {
        const companyLoginUrl = `http://localhost:3333/super-login/structure/indstillinger;virksomhederLogin;${companyLogin._id}`
        window.open(companyLoginUrl, '_blank')

        toast.push({
          status: 'success',
          title: 'Redirecting to company login',
          description: 'A new window should open with the company login page.',
        })
      } else {
        toast.push({
          status: 'error',
          title: 'Company Login not found',
          description: 'No company login found for this company.',
        })
      }
    } catch (error) {
      console.error('Error during login redirect:', error)

      toast.push({
        status: 'error',
        title: 'Error',
        description: `An error occurred: ${error.message}`,
      })
    } finally {
      setLoading(false)
      setIsDialogOpen(false)
    }
  }

  return {
    label: 'Gå til virksomhedslogin',
    onHandle: handleOpenDialog,
    dialog: isDialogOpen && {
      type: 'modal',
      onClose: () => setIsDialogOpen(false),
      header: 'Gå til virksomhedslogin',
      content: (
        <Stack space={4} padding={4}>
          <Text>Vil du åbne virksomhedsloginet for denne virksomhed?</Text>
          <Button
            text={loading ? 'Åbner...' : 'Åben virksomhedslogin'}
            tone="primary"
            onClick={handleLoginRedirect}
            disabled={loading}
          />
          <Button
            text="Annullér"
            tone="default"
            onClick={() => setIsDialogOpen(false)}
          />
        </Stack>
      ),
    },
  }
}
