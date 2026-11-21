import { useState } from 'react'
import { Content, MissingNote, Paragraphs } from '../components/ContentBlock'
import { visible } from '../components/visibility'
import { isReview } from '../config/mode'
import { aboutBook as content, goodreads, retailers } from '../content/site'

function Excerpt() {
  const { paragraphs, previewCount, heading, from } = content.excerpt
  const [expanded, setExpanded] = useState(false)
  if (!visible(paragraphs) && !isReview) return null

  return (
    <div className="excerpt">
      <h3 className="subheading">{heading}</h3>
      <Content entry={paragraphs}>
        {(paras) => {
          const preview = paras.slice(0, previewCount)
          const rest = paras.slice(previewCount)
          return (
            <>
              <p className="excerpt__from">{from}</p>
              <div className="excerpt__text">
                {preview.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {rest.length > 0 && (
                  <div id="excerpt-more" hidden={!expanded}>
                    {rest.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                )}
              </div>
              {rest.length > 0 && (
                <button
                  type="button"
                  className="text-button"
                  aria-expanded={expanded}
                  aria-controls="excerpt-more"
                  onClick={() => setExpanded((e) => !e)}
                >
                  {expanded ? 'Show less' : 'Continue reading'}
                </button>
              )}
            </>
          )
        }}
      </Content>
    </div>
  )
}

function Buy() {
  const hasLinks = visible(retailers) || visible(goodreads)
  if (!hasLinks && !isReview) return null
  return (
    <div id="buy" className="buy">
      <h3 className="subheading">{content.buyHeading}</h3>
      <Content entry={retailers}>
        {(list) => (
          <ul className="buy__links">
            {list.map((r) => (
              <li key={r.href}>
                <a className="btn btn--outline" href={r.href} target="_blank" rel="noopener">
                  {r.label}
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </Content>
      <Content entry={goodreads}>
        {(href) => (
          <a className="text-link buy__goodreads" href={href} target="_blank" rel="noopener">
            Add to Goodreads<span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        )}
      </Content>
    </div>
  )
}

export function AboutBook() {
  return (
    <section id="book" className="section book" aria-labelledby="book-heading">
      <div className="wrap">
        <h2 id="book-heading" className="section-title">
          {content.heading}
        </h2>
        <div className="book__grid">
          <div className="book__main">
            <Paragraphs entry={content.synopsis} />
            <Buy />
          </div>

          <div>
            <dl className="details">
              {content.details.map((d) => (
                <div className="details__row" key={d.label}>
                  <dt>{d.label}</dt>
                  <dd>{d.value}</dd>
                </div>
              ))}
            </dl>
            <MissingNote compact note={content.missingDetailsSummary} />
          </div>
        </div>

        <Excerpt />
      </div>
    </section>
  )
}
