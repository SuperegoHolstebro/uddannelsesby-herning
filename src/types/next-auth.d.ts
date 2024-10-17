import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    company: string
  }

  interface Session {
    user: {
      id: string
      company: string
    }
  }

  interface JWT {
    id: string
    company: string
  }
}
