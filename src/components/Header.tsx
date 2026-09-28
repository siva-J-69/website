import { useEffect, useId, useRef, useState } from 'react'
import { siteConfig } from '../data/site'

const links = [
  { href: '#range', id: 'range', label: 'Our Range' },
  { href: '#demo', id: 'demo', label: 'Demos' },
  { href: '#customisation', id: 'customisation', label: 'Customisation' },
  { href: '#about', id: 'about', label: 'About Us' },
  { href: '#process', id: 'process', label: 'How to Order' },
  { href: '#contact', id: 'contact', label: 'Contact' },
]

type HeaderProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function Header({ open, onOpenChange }: HeaderProps) {
  const panelId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [desktopNav, setDesktopNav] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(min-width: 1080px)').matches
      : true,
  )
  const [current, setCurrent] = useState('')

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1080px)')
    const onChange = () => {
      setDesktopNav(media.matches)
      if (media.matches) onOpenChange(false)
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [onOpenChange])

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 8
      setScrolled((previous) => (previous === next ? previous : next))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => Boolean(section))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setCurrent(visible.target.id)
      },
      { rootMargin: '-40% 0px -45% 0px', threshold: [0.1, 0.25, 0.5] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    return () => document.body.classList.remove('menu-open')
  }, [open])

  useEffect(() => {
    if (!open || desktopNav) return
    const panel = panelRef.current
    const toggle = toggleRef.current
    if (!panel || !toggle) return

    const getItems = () =>
      [toggle, ...panel.querySelectorAll<HTMLElement>('a, button')].filter(Boolean)

    getItems()[1]?.focus({ preventScroll: true })

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange(false)
        toggle.focus()
        return
      }
      if (event.key !== 'Tab') return
      const items = getItems()
      const first = items[0]
      const last = items[items.length - 1]
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [desktopNav, onOpenChange, open])

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-menu-open' : ''}`}>
      <div className="wrap header-bar">
        <a className="brand" href="#top">
          <span className="brand-mark">{siteConfig.wordmark}</span>
          <span className="brand-sub">{siteConfig.descriptor}</span>
        </a>

        <button
          ref={toggleRef}
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => onOpenChange(!open)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span className="nav-toggle-bars" aria-hidden="true" />
        </button>

        <nav
          ref={panelRef}
          id={panelId}
          className={`nav-panel${open ? ' is-open' : ''}`}
          aria-label="Primary"
          inert={!desktopNav && !open ? true : undefined}
        >
          <ul className="nav-list">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={current === link.id ? 'true' : undefined}
                  onClick={() => onOpenChange(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="btn btn-primary nav-cta" href="#contact" onClick={() => onOpenChange(false)}>
            Get a Wholesale Quote
          </a>
        </nav>

        <a className="btn btn-primary header-cta" href="#contact">
          Get a Wholesale Quote
        </a>
      </div>
    </header>
  )
}
