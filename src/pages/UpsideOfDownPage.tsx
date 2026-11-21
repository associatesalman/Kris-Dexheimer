import { Content, Paragraphs } from '../components/ContentBlock'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { ReviewBanner } from '../components/ReviewBanner'
import { isReview } from '../config/mode'
import { upsideOfDown as content } from '../content/site'

/**
 * Quiet secondary page for Kris's earlier book.
 * Excluded from production builds until `upsideOfDown.published` is true (see vite.config.ts).
 * No manuscript download is offered.
 */
export function UpsideOfDownPage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ReviewBanner />
      <Header base="/" />
      <main id="main" tabIndex={-1} className="secondary">
        <section className="section secondary__section" aria-labelledby="upside-heading">
          <div className="wrap secondary__grid">
            <div className="secondary__cover">
              <Content entry={content.cover}>
                {(img) => <img src={img.src} width={img.width} height={img.height} alt={img.alt} />}
              </Content>
            </div>
            <div className="secondary__body">
              <p className="eyebrow">Also by Kris</p>
              <h1 id="upside-heading" className="section-title">
                <cite>{content.title}</cite>
              </h1>
              <p className="secondary__author">by {content.author}</p>
              <Paragraphs entry={content.description} />
              <Content entry={content.details}>
                {(rows) => (
                  <dl className="details">
                    {rows.map((d) => (
                      <div className="details__row" key={d.label}>
                        <dt>{d.label}</dt>
                        <dd>{d.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </Content>
              <Content entry={content.retailers}>
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
              {isReview && (
                <div className="secondary__held">
                  <h2 className="subheading">{content.heldMaterialLabel}</h2>
                  <Paragraphs entry={content.heldMaterial} />
                </div>
              )}
              <p className="secondary__back">
                <a className="text-link" href="/">
                  Back to Distilled
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
