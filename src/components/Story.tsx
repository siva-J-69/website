import { useRef } from 'react'
import { storyChapters } from '../data/content'
import {
  ClosedStudy,
  CollectionStudy,
  OpenStudy,
} from './art/PackagingArt'
import { gsap, ScrollTrigger, useGSAP } from '../gsap'

const frames = {
  closed: ClosedStudy,
  open: OpenStudy,
  group: CollectionStudy,
}

export function Story() {
  const rootRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = rootRef.current
      const pin = pinRef.current
      if (!root || !pin) return

      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        root.classList.add('is-ready')
        const chapters = gsap.utils.toArray<HTMLElement>('.story-chapter', root)
        const scenes = gsap.utils.toArray<HTMLElement>('.story-frame', root)
        const dots = gsap.utils.toArray<HTMLElement>('.story-dot', root)
        const lid = root.querySelector('.story-lid')
        let current = 0

        const setChapter = (index: number) => {
          if (index === current) return
          current = index
          chapters.forEach((chapter, chapterIndex) => {
            chapter.classList.toggle('is-active', chapterIndex === index)
          })
          dots.forEach((dot, dotIndex) => {
            dot.classList.toggle('is-active', dotIndex === index)
          })
        }

        gsap.set(chapters.slice(1), { opacity: 0 })
        gsap.set([scenes[1], scenes[2]], { opacity: 0 })
        setChapter(0)
        chapters[0]?.classList.add('is-active')

        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: '+=200%',
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const index = self.progress < 0.36 ? 0 : self.progress < 0.68 ? 1 : 2
              setChapter(index)
            },
          },
        })

        if (lid) {
          timeline.to(lid, { y: -28, duration: 0.2, force3D: false }, 0.14)
        }
        timeline.to(scenes[0], { opacity: 0, duration: 0.16 }, 0.24)
        timeline.to(scenes[1], { opacity: 1, duration: 0.16 }, 0.24)
        timeline.to(chapters[0], { opacity: 0, duration: 0.12 }, 0.22)
        timeline.to(chapters[1], { opacity: 1, duration: 0.12 }, 0.28)

        timeline.to(scenes[1], { opacity: 0, duration: 0.16 }, 0.56)
        timeline.fromTo(
          scenes[2],
          { opacity: 0, scale: 0.94 },
          { opacity: 1, scale: 1, duration: 0.2, force3D: false },
          0.56,
        )
        timeline.to(chapters[1], { opacity: 0, duration: 0.12 }, 0.54)
        timeline.to(chapters[2], { opacity: 1, duration: 0.12 }, 0.6)

        const refresh = () => ScrollTrigger.refresh()
        window.addEventListener('load', refresh)
        void document.fonts?.ready.then(refresh)

        return () => {
          window.removeEventListener('load', refresh)
          root.classList.remove('is-ready')
        }
      })

      mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('.story-chapter', root).forEach((chapter) => {
          gsap.from(chapter, {
            y: 22,
            duration: 0.7,
            ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: chapter,
              start: 'top 88%',
              once: true,
            },
          })
        })
      })

      return () => mm.revert()
    },
    { scope: rootRef },
  )

  return (
    <section className="story section" id="presentation" aria-labelledby="story-title" ref={rootRef}>
      <div className="story-pin" ref={pinRef}>
        <div className="watermark" aria-hidden="true">
          Present
        </div>
        <div className="story-layout wrap">
        <div className="story-stage" aria-hidden="true">
          {storyChapters.map((chapter) => {
            const Frame = frames[chapter.art]
            return (
              <div className={`story-frame story-frame-${chapter.art}`} key={chapter.number}>
                {chapter.art === 'closed' ? <ClosedStudy animateLid /> : <Frame />}
              </div>
            )
          })}
        </div>
        <div className="story-copy">
          <p className="eyebrow">The presentation</p>
          <h2 id="story-title">A beautiful presentation begins with the packaging.</h2>
          <div className="story-chapters">
            {storyChapters.map((chapter, index) => {
              const Frame = frames[chapter.art]
              return (
                <article
                  className={`story-chapter${index === 0 ? ' is-active' : ''}`}
                  key={chapter.number}
                >
                  <figure className="chapter-figure">
                    <Frame />
                    <figcaption className="sr-only">{chapter.label}</figcaption>
                  </figure>
                  <div className="chapter-copy">
                    <p className="chapter-no">{chapter.number}</p>
                    <h3>{chapter.title}</h3>
                    <p>{chapter.text}</p>
                  </div>
                </article>
              )
            })}
          </div>
          <ol className="story-progress" aria-hidden="true">
            {storyChapters.map((chapter, index) => (
              <li
                className={`story-dot${index === 0 ? ' is-active' : ''}`}
                key={chapter.number}
              >
                <span>{chapter.number}</span>
              </li>
            ))}
          </ol>
        </div>
        </div>
      </div>
    </section>
  )
}
