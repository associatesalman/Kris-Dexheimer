import { visible } from '../components/visibility'
import { ConceptBar } from '../components/ConceptBar'
import { isReview } from '../config/mode'
import { book, hero, retailers } from '../content/site'

export function Hero() {
  // A “Buy the Book” button that leads nowhere would mislead, so it appears only
  // when purchase links exist (or, in review mode, so the layout can be reviewed).
  const showBuy = visible(retailers) || isReview
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="wrap hero__grid">
        <div className="hero__lead">
          <p className="kicker">{hero.kicker}</p>
          <h1 id="hero-heading" className="hero__title">
            {hero.heading}
          </h1>
          <p className="hero__standup">
            <span className="accent">{hero.standUp.figure}</span> {hero.standUp.rest}
          </p>
        </div>

        <div className="hero__cover">
          <img
            src={book.cover.src}
            srcSet={book.cover.srcSet}
            sizes="(max-width: 760px) min(78vw, 340px), 460px"
            width={book.cover.width}
            height={book.cover.height}
            alt={book.cover.alt}
            fetchPriority="high"
            decoding="async"
          />
        </div>

        <div className="hero__body">
          <p className="hero__supporting">{hero.supporting}</p>
          {showBuy && (
            <a className="btn btn--primary" href="#buy">
              {hero.cta}
            </a>
          )}
          <div className="hero__concept">
            <ConceptBar label={hero.barLabel} />
            <p className="hero__caption">{hero.barCaption}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
