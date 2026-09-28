import { useRef } from 'react'
import { StudioComposition } from './art/PackagingArt'
import { gsap, useGSAP } from '../gsap'

export function Hero() {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.hero-copy > *', {
          y: 18,
          duration: 0.75,
          stagger: 0.06,
          ease: 'power2.out',
          clearProps: 'transform',
        })
        gsap.from('.hero-art', {
          y: 22,
          duration: 0.9,
          ease: 'power2.out',
          clearProps: 'transform',
        })
      })
      return () => mm.revert()
    },
    { scope: rootRef },
  )

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Jewellery packaging • Bulk orders • Wholesale supply</p>
          <h1 id="hero-title">
            <span>Beautiful packaging.</span>
            <span>Made for your business.</span>
          </h1>
          <p className="lede">
            Explore jewellery boxes and bags for your store or brand. Share your requirements
            and quantity to request wholesale pricing.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#range">
              Explore Our Range
            </a>
            <a className="btn btn-secondary" href="#contact">
              Get a Bulk Quote
            </a>
          </div>
        </div>
        <div className="hero-art">
          <span className="crop crop-tl" aria-hidden="true" />
          <span className="crop crop-tr" aria-hidden="true" />
          <span className="crop crop-bl" aria-hidden="true" />
          <span className="crop crop-br" aria-hidden="true" />
          <div className="hero-art-frame" role="img" aria-label="Illustrative arrangement of jewellery boxes in three sizes with a matching carry bag">
            <StudioComposition />
          </div>
          <p className="hero-caption">Illustrative composition</p>
        </div>
      </div>
      <p className="watermark" aria-hidden="true">
        Siva
      </p>
    </section>
  )
}
