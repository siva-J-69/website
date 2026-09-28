import { useRef } from 'react'
import { hero } from '../data/content'
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
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 id="hero-title">
            <span>{hero.title[0]}</span>
            <span>{hero.title[1]}</span>
          </h1>
          <p className="lede">{hero.lede}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#range">
              Explore Our Range
            </a>
            <a className="btn btn-secondary" href="#contact">
              Get a Wholesale Quote
            </a>
          </div>
        </div>
        <div className="hero-art">
          <span className="crop crop-tl" aria-hidden="true" />
          <span className="crop crop-tr" aria-hidden="true" />
          <span className="crop crop-bl" aria-hidden="true" />
          <span className="crop crop-br" aria-hidden="true" />
          <picture>
            <source media="(min-width: 800px)" srcSet="/assets/siva/hero-desktop.webp" />
            <img
              src="/assets/siva/hero-mobile.webp"
              alt={hero.imageAlt}
              width={1122}
              height={1402}
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <p className="hero-caption">{hero.caption}</p>
        </div>
      </div>
      <p className="watermark" aria-hidden="true">
        Siva
      </p>
    </section>
  )
}
