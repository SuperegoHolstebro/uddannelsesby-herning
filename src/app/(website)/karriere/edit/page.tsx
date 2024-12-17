import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/sanity/lib/authOptions'
import { client } from '@/sanity/lib/sanity.client'
import EditCompanyForm from '@/components/EditCompanyForm'
import PageContainer from '~/components/PageContainer'
import { notFound } from 'next/navigation'

export default async function EditPage() {
  // Fetch the session server-side
  const session = await getServerSession(authOptions)
  // Debugging session output to ensure companyId is present
  console.log('Session data:', session)

  if (!session) {
    return notFound()
  }
  const locale = 'da' // Define locale

  const company = await client.fetch(
    `*[_type == "company" && _id == $companyId][0]`,
    {
      companyId: session.user.companyId,
      locale: locale, // Add locale to match the expected parameter
    },
  )

  // Handle case where no company is found
  if (!company) {
    return (
      <PageContainer locale="da">
        <p>Der blev ikke fundet nogen virksomhed tilknyttet denne bruger. </p>
      </PageContainer>
    )
  }

  return (
    <PageContainer locale="da">
      {/* Pass the session and company data to the client-side form */}
      <EditCompanyForm session={session} company={company} />
    </PageContainer>
  )
}
