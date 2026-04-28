'use client'

import { useState, useTransition } from 'react'
import { submitContact } from '@/app/actions'

const fieldClass =
  'w-full bg-transparent border-b border-zinc-800 py-3 text-[15px] font-light text-zinc-200 placeholder:text-zinc-700 focus:outline-none focus:border-zinc-600 transition-colors duration-300'

export default function ContactForm() {
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError]     = useState('')
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const data = new FormData()
    data.set('name', name)
    data.set('email', email)
    data.set('message', message)
    startTransition(async () => {
      const result = await submitContact(data)
      if (result.success) {
        setSubmitted(true)
      } else {
        setError(result.error ?? 'Something went wrong. Try again.')
      }
    })
  }

  if (submitted) {
    return (
      <p
        className="text-[15px] font-light text-zinc-400 leading-7"
        style={{ animation: 'fadeUp 0.6s ease-out both' }}
      >
        Message received. We&apos;ll be in touch.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm space-y-8">
      <input
        type="text"
        required
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={fieldClass}
      />
      <input
        type="email"
        required
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={fieldClass}
      />
      <textarea
        required
        placeholder="Message"
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={`${fieldClass} resize-none`}
      />

      {error && (
        <p className="text-[12px] font-light text-red-500 -mt-4">{error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="text-[11px] font-light tracking-[0.35em] uppercase text-zinc-400 hover:text-zinc-100 transition-colors duration-300 disabled:opacity-30 pt-1"
      >
        {isPending ? 'Sending…' : 'Send message →'}
      </button>
    </form>
  )
}
