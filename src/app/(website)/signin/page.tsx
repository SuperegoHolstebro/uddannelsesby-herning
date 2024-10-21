'use client'

import { signIn, useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Heading from '~/components/atoms/Heading'
import PageContainer from '~/components/PageContainer'
import Section from '~/components/sections/Section'
import Paragraph from '~/components/atoms/Paragraph'
import { AdvancedButton } from '~/components/atoms/AdvancedButton'

export default function SignIn() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false) // Add loading state for button

  const { data: session, status } = useSession() // Get the session and status
  const router = useRouter()

  // Redirect to /karriere/edit if the user is already logged in
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/karriere/edit')
    }
  }, [status, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true) // Set loading state when the form is submitted

    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    })

    if (result?.error) {
      console.error(result.error)
      setLoading(false) // Reset loading state on error
    } else {
      router.push('/karriere/edit') // Redirect after successful sign-in
    }
  }

  if (status === 'authenticated') {
    return null // Return null since the user is redirected in the useEffect
  }

  return (
    <PageContainer>
      <Section variant="lys">
        <div className="flex items-center justify-center h-screen/1.5 col-span-full text-center">
          <div className="w-1/3">
            <Heading type="h2" tag="h2" fontFamily="outfit">
              Log ind som virksomhed
            </Heading>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <AdvancedButton
                variant="default"
                type="submit"
                className="w-full px-4 py-2 rounded"
                disabled={loading} // Disable the button while loading
              >
                {loading ? 'Indlæser...' : 'Log ind'}{' '}
                {/* Change the text based on loading state */}
              </AdvancedButton>
            </form>
            <Paragraph className="pt-2 " size="regular" spacing="none">
              Har du ikke en virksomhedskonto?{' '}
              <a href="/signup">Opret en her</a>
            </Paragraph>
          </div>
        </div>
      </Section>
    </PageContainer>
  )
}
