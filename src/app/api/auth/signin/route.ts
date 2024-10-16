import { getCompanyLogin } from '@/sanity/lib/sanity.queries'
import bcrypt from 'bcryptjs'

export async function POST(req) {
  try {
    const { username, password } = await req.json()

    // Fetch user from Sanity
    const user = await getCompanyLogin(username)

    if (!user) {
      console.error('Invalid username')
      return new Response(JSON.stringify({ error: 'Invalid username' }), {
        status: 401,
      })
    }

    // Compare the entered password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      console.error('Invalid password')
      return new Response(JSON.stringify({ error: 'Invalid password' }), {
        status: 401,
      })
    }

    // If the password matches, login is successful
    return new Response(
      JSON.stringify({ message: 'Login successful', company: user.company }),
      { status: 200 },
    )
  } catch (error) {
    console.error('Error occurred in API:', error)
    return new Response(
      JSON.stringify({
        error: 'Internal Server Error',
        details: error.message,
      }),
      { status: 500 },
    )
  }
}
