import { Content, Paragraphs } from '../components/ContentBlock'
import { visible } from '../components/visibility'
import { isReview } from '../config/mode'
import { sections } from '../config/sections'
import { bookClub, spirited } from '../content/site'

/**
 * Book Club Kit and Spirited. Each renders only while its switch in src/config/sections.ts is
 * active, in every build. Both are deferred for now, so nothing (not even an empty band) renders;
 * the markup and content are kept for when either is reactivated.
 */
export function BookClubSpirited() {
  const showKit =
    sections.bookClub.active && (isReview || visible(bookClub.intro) || visible(bookClub.resources) || visible(bookClub.download))
  const showSpirited = sections.spirited.active
  if (!showKit && !showSpirited) return null
  return (
    <section
      id={sections.bookClub.active ? 'book-club' : 'spirited'}
      className="section pair"
      aria-label={[showKit && 'Book Club Kit', showSpirited && 'Spirited'].filter(Boolean).join(' and ')}
    >
      <div className={showKit && showSpirited ? 'wrap pair__grid' : 'wrap pair__grid pair__grid--single'}>
        {showKit && (
          <div className="pair__col">
            <h2 className="pair__title">{bookClub.heading}</h2>
            <Paragraphs entry={bookClub.intro} />
            <Paragraphs entry={bookClub.resources} />
            <Content entry={bookClub.download}>
              {(file) => (
                <a className="btn btn--outline" href={file.href} download>
                  {file.label}
                </a>
              )}
            </Content>
          </div>
        )}

        {showSpirited && (
          <div className="pair__col">
            <p className="eyebrow">{spirited.eyebrow}</p>
            <h2 className="pair__title">
              <cite>{spirited.heading}</cite>
            </h2>
            <Content entry={spirited.timing}>{(t) => <p className="pair__timing">{t}</p>}</Content>
            <Paragraphs entry={spirited.description} />
            {/* Points at the newsletter, so it appears only while that section is shown. */}
            {sections.newsletter.active && (
              <a className="text-link" href={spirited.updatesLink.href}>
                {spirited.updatesLink.label}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
