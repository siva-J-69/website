import { useRef } from 'react'
import { processSteps } from '../data/content'
import { gsap, useGSAP } from '../gsap'

export function Process() {
  const rootRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const line = lineRef.current
      const root = rootRef.current
      if (!line || !root) return

      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.from(line, {
          scaleX: 0,
          transformOrigin: 'left center',
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top 75%',
            end: 'center 60%',
            scrub: true,
          },
        })
      })
      return () => mm.revert()
    },
    { scope: rootRef },
  )

  return (
    <section className="section section-beige" id="process" aria-labelledby="process-title" ref={rootRef}>
      <div className="wrap">
        <header className="section-heading">
          <p className="eyebrow">How to order</p>
          <h2 id="process-title">How a bulk packaging order works.</h2>
          <p className="lede">
            A wholesale order for jewellery boxes or bags starts with a conversation. Delivery
            dates and production times are not listed here — they are discussed when the order
            is agreed.
          </p>
        </header>
        <div className="steps-wrap">
          <div className="steps-line" aria-hidden="true">
            <span ref={lineRef} />
          </div>
          <ol className="steps">
            {processSteps.map((step) => (
              <li key={step.number} className="reveal">
                <span className="step-num">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
