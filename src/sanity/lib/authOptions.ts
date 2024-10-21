import CredentialsProvider from 'next-auth/providers/credentials'
import { getCompanyLogin } from '@/sanity/lib/sanity.queries'
import bcrypt from 'bcryptjs'
import { AuthOptions } from 'next-auth' // Import proper types

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const user = await getCompanyLogin(credentials.username)

          // Check if the user exists
          if (!user) {
            throw new Error('Invalid username')
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password,
          )

          if (!passwordMatch) {
            throw new Error('Invalid password')
          }

          return {
            id: user._id,
            username: user.username,
            company: user.company,
            companyId: user.companyRefId,
          }
        } catch (error) {
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt', // Ensure the value aligns with the NextAuth expected type
    maxAge: 14 * 24 * 60 * 60, // 14 days in seconds
  },
  jwt: {
    maxAge: 14 * 24 * 60 * 60, // JWT also expires in 14 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.company = user.company
        token.companyId = user.companyId
      }

      return token
    },
    async session({ session, token }) {
      session.user.id = token.id as string
      session.user.username = token.username as string
      session.user.company = token.company as string
      session.user.companyId = token.companyId as string

      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
}
