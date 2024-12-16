import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req) {
  try {
    const { email, password, username } = await req.json()

    const transporter = nodemailer.createTransport({
      host: 'smtp.fastmail.com',
      port: 587,
      secure: false, // false for TLS
      auth: {
        user: process.env.FASTMAIL_USER,
        pass: process.env.FASTMAIL_PASS,
      },
    })

    const mailOptions = {
      from: '"Uddannelsesby Herning - Virksomhedslogin" <no-reply@superego.website>',
      to: email,
      subject: 'Uddannelsesby Herning - Login',
      text: `Her er dine loginoplysninger til virksomheder på uddannelsesbyherning.dk:\n\nBrugernavn: ${username}\nAdgangskode: ${password}`,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Email sendt:', info)

    return NextResponse.json({
      success: true,
      message: 'Email sendt',
      info,
    })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    )
  }
}
