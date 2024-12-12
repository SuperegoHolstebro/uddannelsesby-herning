import { useClient } from 'sanity'
import { useToast, Dialog, Box, Button, TextInput, Stack } from '@sanity/ui'
import { useState } from 'react'
import bcrypt from 'bcryptjs'

export function CreateCompanyLoginAction(props) {
  const { draft, published, onComplete } = props
  const client = useClient()
  const toast = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleOpenDialog = () => {
    const company = draft || published
    if (company && company.name) {
      const defaultUsername = company.name.toLowerCase().replace(/\s+/g, '')
      setUsername(defaultUsername)
    }
    setIsDialogOpen(true)
  }

  const handleCreateLogin = async () => {
    try {
      const company = draft || published

      if (!company) {
        toast.push({ status: 'error', title: 'No company data found' })
        return
      }

      if (!username || !password) {
        toast.push({
          status: 'error',
          title: 'Username and password are required',
        })
        return
      }

      // Ensure the company document is published
      const companyId = company._id.startsWith('drafts.')
        ? company._id.replace('drafts.', '')
        : company._id

      if (company._id.startsWith('drafts.')) {
        await client.createOrReplace({ ...company, _id: companyId })
      }

      // Hash the password
      const salt = bcrypt.genSaltSync(10)
      const hashedPassword = bcrypt.hashSync(password, salt)

      // Create the companyLogin document with the hashed password
      await client.create({
        _type: 'companyLogin',
        username,
        password: hashedPassword,
        companyRef: { _type: 'reference', _ref: companyId },
      })

      toast.push({
        status: 'success',
        title: 'Company login created successfully!',
        description: `Username: ${username}`,
      })

      setIsDialogOpen(false)
      setUsername('')
      setPassword('')

      onComplete()
    } catch (error) {
      console.error('Error creating company login:', error)
      toast.push({
        status: 'error',
        title: 'Failed to create company login',
        description: error.message,
      })
    }
  }

  return {
    label: 'Create Company Login',
    onHandle: handleOpenDialog,
    dialog: isDialogOpen && {
      type: 'modal',
      onClose: () => setIsDialogOpen(false),
      header: 'Create Company Login',
      content: (
        <Box padding={4}>
          <Stack space={4}>
            <TextInput
              label="Username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
            <TextInput
              label="Password"
              placeholder="Enter password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <Button
              text="Create Login"
              tone="primary"
              onClick={handleCreateLogin}
            />
          </Stack>
        </Box>
      ),
    },
  }
}
