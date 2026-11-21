import type { ReactNode } from 'react'
import { isReview } from '../config/mode'
import type { Entry } from '../content/status'

/** Review-only note for content that hasn't been supplied. */
export function MissingNote({ note, compact = false }: { note: string | false; compact?: boolean }) {
  if (!isReview || !note) return null
  return (
    <div className={compact ? 'review-note review-note--compact' : 'review-note'}>
      <span className="review-note__tag">Awaiting content</span>
      <p>{note}</p>
    </div>
  )
}

/**
 * Renders an inventory entry:
 *  - approved: its content.
 *  - draft: in review mode, its content marked “Draft for approval”; omitted in production.
 *  - missing: in review mode, a note; omitted in production.
 */
export function Content<T>({ entry, children }: { entry: Entry<T>; children: (value: T) => ReactNode }) {
  if (entry.status === 'approved' && entry.value !== null) return <>{children(entry.value)}</>
  if (!isReview) return null
  if (entry.status === 'draft' && entry.value !== null) {
    return (
      <div className="draft">
        <p className="draft__tag">
          Draft for Kris’s approval <span className="draft__source">{entry.note}</span>
        </p>
        {entry.provenance && (
          <ul className="draft__provenance">
            {entry.provenance.map((src, i) => (
              <li key={i}>
                <strong>{src.kind}</strong> · {src.file}, {src.location}, PDF {src.pages}, printed {src.printedPages}
              </li>
            ))}
          </ul>
        )}
        {children(entry.value)}
      </div>
    )
  }
  return <MissingNote note={entry.note} />
}

/** Paragraph helper for string[] entries. */
export function Paragraphs({ entry, className = 'prose' }: { entry: Entry<string[]>; className?: string }) {
  return (
    <Content entry={entry}>
      {(paras) => (
        <div className={className}>
          {paras.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )}
    </Content>
  )
}
