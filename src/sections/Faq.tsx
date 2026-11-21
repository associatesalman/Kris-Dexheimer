import { Accordion } from '../components/Accordion'
import { Paragraphs } from '../components/ContentBlock'
import { visible } from '../components/visibility'
import { isReview } from '../config/mode'
import { faq } from '../content/site'

export function Faq() {
  // Production shows only answered questions; review mode shows all of them with their status.
  const items = faq.items.filter((item) => visible(item.a) || isReview)
  return (
    <section id="faq" className="section faq" aria-labelledby="faq-heading">
      <div className="wrap">
        <h2 id="faq-heading" className="section-title">
          {faq.heading}
        </h2>
        {items.length > 0 && (
          <Accordion
            items={items.map((item, i) => ({
              id: `q${i + 1}`,
              title: item.q,
              content: <Paragraphs entry={item.a} />,
            }))}
          />
        )}
      </div>
    </section>
  )
}
