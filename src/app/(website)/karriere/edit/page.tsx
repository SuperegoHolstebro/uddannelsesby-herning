import { getServerSession } from 'next-auth/next'
import { authOptions } from '~/app/api/auth/[...nextauth]/route'
import SignOut from '~/components/atoms/Signout'
import PageContainer from '~/components/PageContainer'
import Section from '~/components/sections/Section'
import Heading from '~/components/atoms/Heading'

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return <p>You must be logged in to view this page</p>
  }

  return (
    <PageContainer>
      <Section>
        <div className="col-span-full">
          <Heading type="h2" tag="h2">
            {' '}
            Welcome, {session.user.company}
          </Heading>
          <SignOut />
        </div>
      </Section>
    </PageContainer>
  )
}
