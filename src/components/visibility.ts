import { isReview } from '../config/mode'
import type { Entry } from '../content/status'

/** True when an entry has content that may be shown in the current mode. */
export function visible(entry: Entry<unknown>) {
  if (entry.status === 'approved') return true
  return isReview && entry.status === 'draft'
}
