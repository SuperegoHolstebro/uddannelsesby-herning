'use client'

import { SessionProvider } from 'next-auth/react'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Wrap the app with SessionProvider */}
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
