/**
 * Content inventory.
 *
 * Every piece of client content is registered with a status:
 *  - approved: supplied or confirmed by the client. Shown everywhere.
 *  - draft:    written or selected by the team. Shown only in review mode, labelled for Kris's approval.
 *  - missing:  not supplied yet. A labelled note in review mode; omitted in the production build.
 *
 * Call sites pass draft values, notes and source records as `__REVIEW__ && …`. Production builds
 * replace `__REVIEW__` with `false`, so unapproved text and internal notes never reach the shipped JavaScript.
 *
 * `npm run check:launch` lists every draft and missing item, and fails while any required item is unresolved.
 * This module must stay free of Vite-only APIs so the Node check script can import it.
 */

export type Status = 'approved' | 'draft' | 'missing'

/** How a draft relates to its source text. */
export type DraftKind = 'exact excerpt' | 'edited selection' | 'newly written summary'

/** Where a draft came from. */
export type Provenance = {
  /** Supplied filename. */
  file: string
  /** Chapter or heading in the source. */
  location: string
  /** PDF page numbers. */
  pages: string
  /** Printed page numbers, or a note that the source has none. */
  printedPages: string
  kind: DraftKind
}

export type Entry<T> = {
  id: string
  status: Status
  value: T | null
  /** What is needed, or review guidance. Empty in production builds. */
  note: string
  required: boolean
  provenance: Provenance[] | null
}

const registry: Entry<unknown>[] = []

function register<T>(entry: Entry<T>): Entry<T> {
  registry.push(entry as Entry<unknown>)
  return entry
}

export function approved<T>(id: string, value: T, source: string): Entry<T> {
  return register({ id, status: 'approved', value, note: source, required: true, provenance: null })
}

export function draft<T>(
  id: string,
  value: T | false,
  note: string | false,
  provenance: Provenance[] | false,
  required = true,
): Entry<T> {
  return register<T>({
    id,
    status: 'draft',
    value: value === false ? null : value,
    note: note || '',
    required,
    provenance: provenance || null,
  })
}

export function missing<T>(id: string, note: string | false, required = true): Entry<T> {
  return register<T>({ id, status: 'missing', value: null, note: note || '', required, provenance: null })
}

export const inventory = (): readonly Entry<unknown>[] => registry
