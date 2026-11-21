import type { SubmitStatus } from './useFormSubmit'

type Messages = { success: string; error: string }

/** Announces submission results to screen readers through a polite live region. */
export function FormStatus({ status, messages }: { status: SubmitStatus; messages: Messages }) {
  let content = null
  if (status === 'sending') content = <p className="form-status">Sending…</p>
  if (status === 'success') content = <p className="form-status form-status--success">{messages.success}</p>
  if (status === 'error') content = <p className="form-status form-status--error">{messages.error}</p>
  return (
    <div role="status" aria-live="polite" className="form-status-region">
      {content}
    </div>
  )
}
