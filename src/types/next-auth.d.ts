import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    username: string
    company: string
    companyId: string
  }

  interface Session {
    user: {
      id: string
      username: string
      company: string
      companyId: string
    }
  }

  interface JWT {
    id: string
    username: string
    company: string
    companyId: string
  }
}
