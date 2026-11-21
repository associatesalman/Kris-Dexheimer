import { Content, Paragraphs } from '../components/ContentBlock'
import { visible } from '../components/visibility'
import { isReview } from '../config/mode'
import { aboutKris as content } from '../content/site'

export function AboutKris() {
  const { portrait, note, thoughts } = content
  return (
    <section id="about" className="section about" aria-labelledby="about-heading">
      <div className="wrap about__grid">
        <figure className="about__portrait">
          <img
            src={encodeURI(portrait.src)}
            width={portrait.width}
            height={portrait.height}
            alt={portrait.alt}
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className="about__body">
          <h2 id="about-heading" className="section-title">
            {content.heading}
          </h2>
          <Paragraphs entry={content.bio} />

          {(visible(note.text) || isReview) && (
            <div className="note">
              <h3 className="label">{note.label}</h3>
              <Content entry={note.text}>
                {(paras) => (
                  <div className="note__text">
                    {paras.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                )}
              </Content>
            </div>
          )}

          {(visible(thoughts.items) || isReview) && (
            <div className="thoughts">
              <h3 className="label">{thoughts.label}</h3>
              <Content entry={thoughts.items}>
                {(items) => (
                  <ul className="thoughts__list">
                    {items.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}
              </Content>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
