import type { RefObject } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../gsap'

export function useReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const items = gsap.utils.toArray<HTMLElement>('.reveal')
        if (items.length === 0) return
        gsap.set(items, { y: 24 })
        ScrollTrigger.batch('.reveal', {
          start: 'top 88%',
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              y: 0,
              duration: 0.75,
              stagger: 0.06,
              ease: 'power2.out',
              overwrite: true,
              clearProps: 'transform',
            })
          },
        })
      })

      const refresh = () => ScrollTrigger.refresh()
      window.addEventListener('load', refresh)
      void document.fonts?.ready.then(refresh)

      return () => {
        window.removeEventListener('load', refresh)
        mm.revert()
      }
    },
    { scope },
  )
}
