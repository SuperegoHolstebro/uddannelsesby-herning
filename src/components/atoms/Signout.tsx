'use client'

import { useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'
import { AdvancedButton } from './AdvancedButton'

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

  return (
    <AdvancedButton
      variant="default"
      onClick={handleSignOut}
      disabled={isSigningOut}
    >
      {isSigningOut ? 'Logger ud...' : 'Log ud'}{' '}
      {/* Change text based on state */}
    </AdvancedButton>
  )
}

export default SignOut
