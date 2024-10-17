import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getCompanyLogin } from '@/sanity/lib/sanity.queries'
import bcrypt from 'bcryptjs'

const handler = NextAuth({
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
    strategy: 'jwt',
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
      session.user.id = token.id
      session.user.company = token.company
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
})

export { handler as GET, handler as POST }
