'use client'

import { signIn, useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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

    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    })

    if (result?.error) {
      console.error(result.error)
    } else {
      router.push('/karriere/edit') // Redirect after successful sign-in
    }
  }

  // If the user is already authenticated, don't show the sign-in form
  if (status === 'loading') {
    return <div>Loading...</div> // Show a loading state while checking the session
  }

  if (status === 'authenticated') {
    return null // Return null since the user is redirected in the useEffect
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}
