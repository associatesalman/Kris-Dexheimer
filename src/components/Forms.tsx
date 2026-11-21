import { useState, type FormEvent, type ReactNode } from 'react'
import { isReview } from '../config/mode'
import { FormStatus } from './FormStatus'
import { MissingNote } from './ContentBlock'
import { useFormSubmit } from './useFormSubmit'

export type Field = { name: string; label: string; type: 'text' | 'email' | 'textarea'; autoComplete?: string }
export type Validate = (form: HTMLFormElement) => Record<string, string>

type Props = {
  endpoint: string | null
  /** Review-only explanation shown when the form isn't connected. */
  unconfiguredNote: string | false
  validate: Validate
  messages: { success: string; error: string }
  className: string
  children: (errors: Record<string, string>, clear: (name: string) => void) => ReactNode
}

/**
 * Wraps validation and submission.
 * - Endpoint configured: validates, posts, and reports the real result.
 * - Not configured, review mode: validates, then says plainly that nothing was sent.
 * - Not configured, production: renders nothing (the launch check flags it).
 */
export function ManagedForm({ endpoint, unconfiguredNote, validate, messages, className, children }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [attemptedOffline, setAttemptedOffline] = useState(false)

  if (!endpoint && !isReview) return null

  function onSubmit(e: FormEvent<HTMLFormElement>, submit?: (f: HTMLFormElement) => Promise<void>) {
    e.preventDefault()
    const form = e.currentTarget
    const found = validate(form)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      ;(form.elements.namedItem(first) as HTMLElement | null)?.focus()
      return
    }
    if (submit) void submit(form)
    else setAttemptedOffline(true)
  }

  const clear = (name: string) => {
    if (errors[name]) setErrors((prev) => Object.fromEntries(Object.entries(prev).filter(([k]) => k !== name)))
  }

  if (!endpoint) {
    if (!isReview) return null
    return (
      <form className={className} noValidate onSubmit={(e) => onSubmit(e)}>
        {children(errors, clear)}
        <MissingNote compact note={unconfiguredNote} />
        <div role="status" aria-live="polite" className="form-status-region">
          {attemptedOffline && (
            <p className="form-status form-status--error">Not connected yet: nothing was sent or saved.</p>
          )}
        </div>
      </form>
    )
  }
  return <ConnectedForm endpoint={endpoint} className={className} messages={messages} onSubmit={onSubmit}>{children(errors, clear)}</ConnectedForm>
}

function ConnectedForm({
  endpoint,
  className,
  messages,
  onSubmit,
  children,
}: {
  endpoint: string
  className: string
  messages: { success: string; error: string }
  onSubmit: (e: FormEvent<HTMLFormElement>, submit: (f: HTMLFormElement) => Promise<void>) => void
  children: ReactNode
}) {
  const { status, submit } = useFormSubmit(endpoint)
  return (
    <form className={className} noValidate onSubmit={(e) => onSubmit(e, submit)} aria-busy={status === 'sending'}>
      {children}
      <FormStatus status={status} messages={messages} />
    </form>
  )
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={`${id}-error`} className="field-error">
      {message}
    </p>
  )
}
