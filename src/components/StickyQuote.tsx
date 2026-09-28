import { useEffect, useState } from 'react'

type StickyQuoteProps = {
  menuOpen: boolean
}

export function StickyQuote({ menuOpen }: StickyQuoteProps) {
  const [mobile, setMobile] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)')
    const onChange = () => setMobile(media.matches)
    onChange()
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const contact = document.getElementById('contact')
    if (!contact) return

    const onScroll = () => {
      const top = contact.getBoundingClientRect().top
      const next = top < window.innerHeight * 0.75
      setHidden((previous) => (previous === next ? previous : next))
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const visible = mobile && !hidden && !menuOpen

  useEffect(() => {
    document.body.classList.toggle('has-quote-bar', visible)
    return () => document.body.classList.remove('has-quote-bar')
  }, [visible])

  if (!visible) return null

  return (
    <a className="btn btn-primary sticky-quote" href="#contact">
      Get a Wholesale Quote
    </a>
  )
}
