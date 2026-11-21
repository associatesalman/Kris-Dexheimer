import { useState } from 'react'

export type SubmitStatus = 'idle' | 'sending' | 'success' | 'error'

/**
 * Posts form data to a configured endpoint and reports the real result.
 * Forms are only rendered with a submit button when an endpoint is configured,
 * so a submission is never faked.
 */
export function useFormSubmit(endpoint: string) {
  const [status, setStatus] = useState<SubmitStatus>('idle')

  async function submit(form: HTMLFormElement) {
    setStatus('sending')
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return { status, setStatus, submit }
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Props that connect an input to its error message. */
export function errorProps(errors: Record<string, string>, id: string, name: string) {
  return errors[name] ? { 'aria-invalid': true as const, 'aria-describedby': `${id}-error` } : {}
}
