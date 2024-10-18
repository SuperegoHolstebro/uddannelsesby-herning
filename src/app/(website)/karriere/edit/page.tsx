import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/sanity/lib/authOptions'
import { client } from '@/sanity/lib/sanity.client'
import EditCompanyForm from '@/components/EditCompanyForm'

export default async function EditPage() {
  // Fetch the session server-side
  const session = await getServerSession(authOptions)

  // Debugging session output to ensure companyId is present
  console.log('Session data:', session)

  if (!session) {
    return <p>You must be logged in to view this page</p>
  }

  // Fetch the company data server-side using companyId from session
  const company = await client.fetch(
    `*[_type == "company" && _id == $companyId][0]`,
    { companyId: '****' }, // Use companyId from session
  )

  // Handle case where no company is found
  if (!company) {
    return <p>No company found for this user.</p>
  }

  return (
    <div>
      {/* Pass the session and company data to the client-side form */}
      <EditCompanyForm session={session} company={company} />
    </div>
  )
}
