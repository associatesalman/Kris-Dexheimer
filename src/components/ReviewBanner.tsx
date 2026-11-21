import { isReview } from '../config/mode'
import { isDeferred, sections } from '../config/sections'
import { inventory } from '../content/status'

/** Shown only in review mode. Never part of the production build. */
export function ReviewBanner() {
  if (!isReview) return null
  const items = inventory().filter((e) => !isDeferred(e.id))
  const drafts = items.filter((e) => e.status === 'draft').length
  const missingCount = items.filter((e) => e.status === 'missing').length
  const names = { bookClub: 'Book Club Kit', spirited: 'Spirited', newsletter: 'Newsletter' }
  const hidden = (Object.keys(sections) as (keyof typeof sections)[]).filter((k) => !sections[k].active).map((k) => names[k]).join(', ')
  return (
    <p className="review-banner">
      Review copy, not the live site. {drafts} drafts need approval · {missingCount} items still to be supplied. Hidden for now: {hidden}.
    </p>
  )
}
