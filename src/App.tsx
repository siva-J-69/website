import { useEffect, useRef, useState } from 'react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Customisation } from './components/Customisation'
import { Demo } from './components/Demo'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Process } from './components/Process'
import { Range } from './components/Range'
import { StickyQuote } from './components/StickyQuote'
import { Story } from './components/Story'
import { defaultPreview, type PreviewChoice } from './data/products'
import { useReveal } from './hooks/useReveal'

export default function App() {
  const mainRef = useRef<HTMLElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [category, setCategory] = useState('')
  const [preview, setPreview] = useState<PreviewChoice>(defaultPreview)

  useReveal(mainRef)

  useEffect(() => {
    if (window.location.hash !== '#top') return
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
  }, [])

  const enquire = (productId: string) => {
    setCategory(productId)
    setMenuOpen(false)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById('contact')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
    window.setTimeout(() => {
      document.getElementById('contact')?.querySelector<HTMLElement>('[name="productCategory"]')?.focus({
        preventScroll: true,
      })
    }, reduce ? 0 : 450)
  }

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header open={menuOpen} onOpenChange={setMenuOpen} />
      <main id="main" ref={mainRef}>
        <Hero />
        <Story />
        <Range onEnquire={enquire} />
        <Demo />
        <Customisation preview={preview} onChange={setPreview} />
        <About />
        <Process />
        <Faq />
        <Contact category={category} onCategoryChange={setCategory} preview={preview} />
      </main>
      <Footer />
      <StickyQuote menuOpen={menuOpen} />
    </>
  )
}
