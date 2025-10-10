import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { name, email, subject, message } = req.body

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        error: 'All fields are required' 
      })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Invalid email',
        error: 'Please provide a valid email address' 
      })
    }

    // TODO: Implement your email sending logic here
    // Option 1: Using a service like SendGrid, Mailgun, or Resend
    // Option 2: Using nodemailer with SMTP
    // Option 3: Using a form service like Formspree or Getform

    // Example with console log (replace with actual implementation)
    console.log('Contact form submission:', {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    })

    // EXAMPLE: SendGrid implementation (uncomment and configure)
    /*
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
      to: process.env.CONTACT_EMAIL,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: `Portfolio Contact: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    }

    await sgMail.send(msg)
    */

    // EXAMPLE: Nodemailer implementation (uncomment and configure)
    /*
    const nodemailer = require('nodemailer')

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_EMAIL,
      subject: `Portfolio Contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })
    */

    // Success response
    return res.status(200).json({ 
      message: 'Message sent successfully! I will get back to you soon.' 
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return res.status(500).json({ 
      message: 'Failed to send message',
      error: 'Something went wrong. Please try again later.' 
    })
  }
}
