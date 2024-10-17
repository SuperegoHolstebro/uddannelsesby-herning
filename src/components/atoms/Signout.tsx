'use client'

import { useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'

interface SignOutComponentProps {
  callbackUrl?: string
}

const SignOut: React.FC<SignOutComponentProps> = ({
  callbackUrl = '/signin',
}) => {
  const [isSigningOut, setIsSigningOut] = useState(false)

  useEffect(() => {
    if (isSigningOut) {
      // Trigger the sign-out process once the button is clicked
      signOut({ callbackUrl })
    }
  }, [isSigningOut, callbackUrl])

  const handleSignOut = () => {
    setIsSigningOut(true)
  }

  return <button onClick={handleSignOut}>Sign Out</button>
}

export default SignOut
