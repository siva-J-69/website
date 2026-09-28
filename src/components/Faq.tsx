import { useId, useState } from 'react'
import { faqs } from '../data/content'

export function Faq() {
  const baseId = useId()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="section section-ivory" id="faq" aria-labelledby="faq-title">
      <div className="wrap faq-layout">
        <header className="section-heading">
          <p className="eyebrow">Questions</p>
          <h2 id="faq-title">Questions about wholesale jewellery packaging.</h2>
          <p className="lede">
            Answers cover bulk orders, custom logo printing, and wholesale pricing. Where a
            detail has not been published, the business will confirm it with you directly.
          </p>
        </header>
        <div className="faq-list">
          {faqs.map((item, index) => {
            const panelId = `${baseId}-panel-${index}`
            const buttonId = `${baseId}-button-${index}`
            const expanded = open === index
            return (
              <div className={`faq-item${expanded ? ' is-open' : ''}`} key={item.question}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpen(expanded ? null : index)}
                  >
                    <span>{item.question}</span>
                    <span className="faq-icon" aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="faq-panel"
                  inert={expanded ? undefined : true}
                >
                  <div className="faq-panel-inner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
