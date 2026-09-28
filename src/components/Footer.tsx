import { BusinessDetails } from './BusinessDetails'
import { businessSummary } from '../data/content'
import { hasPublicContact, siteConfig } from '../data/site'

const links = [
  { href: '#range', label: 'Our Range' },
  { href: '#demo', label: 'Product demo' },
  { href: '#customisation', label: 'Customisation' },
  { href: '#about', label: 'About Us' },
  { href: '#process', label: 'How to Order' },
  { href: '#faq', label: 'Questions' },
  { href: '#contact', label: 'Contact' },
]

const copyrightYear = new Date().getFullYear()

export function Footer() {
  const year = copyrightYear
  const showContacts = hasPublicContact()

  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <p className="brand-mark">{siteConfig.wordmark}</p>
          <p className="brand-sub">{siteConfig.descriptor}</p>
          <p>{businessSummary}</p>
        </div>
        <nav aria-label="Footer">
          <p className="footer-label">On this page</p>
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="footer-label">Contact</p>
          {showContacts ? <BusinessDetails /> : <p>Use the enquiry form to request a wholesale quotation.</p>}
        </div>
      </div>
      <div className="wrap legal">
        <p>
          © {year} {siteConfig.name}
        </p>
        <p>Photographs show packaging styles. Confirm finish, fit, and availability before ordering.</p>
      </div>
    </footer>
  )
}
