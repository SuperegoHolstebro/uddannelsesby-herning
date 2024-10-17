import NextAuth from 'next-auth'
import { authOptions } from '@/sanity/lib/authOptions' // Import authOptions from the new file

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST } // Only export the route handlers
