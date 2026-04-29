'use server'

import { Resend } from 'resend'

export async function submitContact(
  formData: FormData,
): Promise<{ success: boolean; error?: string }> {
  const name    = (formData.get('name')    as string | null)?.trim()
  const email   = (formData.get('email')   as string | null)?.trim()
  const message = (formData.get('message') as string | null)?.trim()

  if (!name || !email || !message) {
    return { success: false, error: 'All fields are required.' }
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRe.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' }
  }

  if (!process.env.RESEND_API_KEY) {
    // Graceful fallback during local dev / before key is configured
    console.log('[contact submission — no RESEND_API_KEY]', { name, email, message })
    return { success: true }
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'dprplx <onboarding@resend.dev>',
      to: 'dprplx.labs@gmail.com',
      replyTo: email,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    })

    return { success: true }
  } catch (err) {
    console.error('[contact submission error]', err)
    return { success: false, error: 'Something went wrong. Please try again.' }
  }
}
