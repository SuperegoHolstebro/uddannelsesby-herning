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
        const user = await getCompanyLogin(credentials.username)

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
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt', // Ensure the value aligns with the NextAuth expected type
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.company = user.company
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id as string
      session.user.company = token.company as string
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
}
