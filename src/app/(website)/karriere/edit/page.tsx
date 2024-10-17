import { getServerSession } from 'next-auth/next'
// Import the correct path for the module
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import SignOut from '~/components/atoms/Signout'

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return <p>You must be logged in to view this page</p>
  }

  return (
    <div>
      <h1> Welcome, {session.user.company}</h1>
      <SignOut />
    </div>
  )
}
