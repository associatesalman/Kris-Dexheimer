import { Content, Paragraphs } from '../components/ContentBlock'
import { lightInTheDarkness as content } from '../content/site'

/** Wraps each “7.5%” in a coral highlight. */
function highlight(text: string) {
  return text.split(/(7\.5%)/).map((part, i) =>
    part === '7.5%' ? (
      <span key={i} className="accent">
        {part}
      </span>
    ) : (
      part
    ),
  )
}

export function LightInTheDarkness() {
  return (
    <section className="section section--cream light" aria-labelledby="light-heading">
      <div className="wrap">
        <p className="eyebrow">{content.eyebrow}</p>
        <h2 id="light-heading" className="section-title">
          {content.heading}
        </h2>
        <div className="light__grid">
          <p className="light__figure" aria-hidden="true">
            {content.figure}
          </p>
          <div className="light__body">
            <Paragraphs entry={content.explanation} className="prose light__explanation" />
            <Content entry={content.leadIn}>
              {(lines) => (
                <p className="light__lead">
                  {lines.map((l, i) => (
                    <span key={i}>{highlight(l)} </span>
                  ))}
                </p>
              )}
            </Content>
            <Content entry={content.primary}>{(line) => <p className="light__primary">{line}</p>}</Content>
          </div>
        </div>
      </div>
    </section>
  )
}
