'use server'

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

  // TODO: plug in your email service here, e.g.:
  // await resend.emails.send({
  //   from: 'no-reply@dprplx.com',
  //   to: 'dprplx.labs@gmail.com',
  //   subject: `New message from ${name}`,
  //   text: `From: ${name} <${email}>\n\n${message}`,
  // })

  console.log('[contact submission]', { name, email, message })

  return { success: true }
}
