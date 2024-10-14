import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req) {
  const body = await req.json()
  const { firstName, lastName, email, phone } = body

  if (!firstName || !email || !phone) {
    return NextResponse.json(
      { message: 'Missing required fields' },
      { status: 400 },
    )
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.fastmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.FASTMAIL_USER,
      pass: process.env.FASTMAIL_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: '"Kontaktformular" <no-reply@superego.website>',
      to: 'praktikant-holstebro@superego.nu',
      subject: 'Ny kontaktfomular besked',
      text: `Ny besked fra kontaktfomularen:
             Navn: ${firstName} ${lastName}
             Email: ${email}
             Tlf: ${phone}`,
    })

    return NextResponse.json(
      { message: 'Email sent successfully!' },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { message: 'Error sending email.' },
      { status: 500 },
    )
  }
}
