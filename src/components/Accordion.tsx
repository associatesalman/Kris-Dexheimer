import { useId, useState, type ReactNode } from 'react'

export type AccordionItem = { id: string; title: string; content: ReactNode }

/** Independent expand/collapse rows. Each row is a heading containing a real button. */
export function Accordion({ items }: { items: AccordionItem[] }) {
  const baseId = useId()
  const [open, setOpen] = useState<Set<string>>(new Set())

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <div className="accordion">
      {items.map((item) => {
        const isOpen = open.has(item.id)
        const buttonId = `${baseId}-${item.id}-button`
        const panelId = `${baseId}-${item.id}-panel`
        return (
          <div className="accordion__item" key={item.id}>
            <h3 className="accordion__heading">
              <button
                id={buttonId}
                type="button"
                className="accordion__button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
              >
                <span>{item.title}</span>
                <span className="accordion__icon" aria-hidden="true" />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} className="accordion__panel" hidden={!isOpen}>
              {item.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}
