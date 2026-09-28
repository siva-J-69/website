import { siteConfig, hasAddress, hasEmail, hasHours, hasMap, hasPhone, hasWhatsapp } from '../data/site'

const links = [
  { href: '#range', label: 'Our Range' },
  { href: '#customisation', label: 'Customisation' },
  { href: '#about', label: 'About Us' },
  { href: '#process', label: 'How to Order' },
  { href: '#faq', label: 'Questions' },
  { href: '#contact', label: 'Contact' },
]

const copyrightYear = new Date().getFullYear()

export function Footer() {
  const year = copyrightYear
  const social = siteConfig.social.filter((item) => item.href.trim() && item.label.trim())
  const showContacts =
    hasPhone() || hasEmail() || hasAddress() || hasHours() || hasMap() || hasWhatsapp() || social.length > 0

  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <p className="brand-mark">{siteConfig.wordmark}</p>
          <p className="brand-sub">{siteConfig.descriptor}</p>
          <p>
            Manufactures jewellery boxes and bags for businesses ordering in bulk, and supplies
            packaging at wholesale rates.
          </p>
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
          {showContacts ? (
            <ul>
              {hasPhone() ? (
                <li>
                  <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
                </li>
              ) : null}
              {hasWhatsapp() ? (
                <li>
                  <a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noreferrer">
                    WhatsApp
                  </a>
                </li>
              ) : null}
              {hasEmail() ? (
                <li>
                  <a href={`mailto:${siteConfig.email.trim()}`}>{siteConfig.email.trim()}</a>
                </li>
              ) : null}
              {hasAddress() ? <li>{siteConfig.address}</li> : null}
              {hasHours() ? <li>{siteConfig.hours}</li> : null}
              {hasMap() ? (
                <li>
                  <a href={siteConfig.mapUrl} target="_blank" rel="noreferrer">
                    View map
                  </a>
                </li>
              ) : null}
              {social.map((item) => (
                <li key={item.href}>
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>Use the enquiry form to request a quotation.</p>
          )}
        </div>
      </div>
      <div className="wrap legal">
        <p>
          © {year} {siteConfig.name}
        </p>
        <p>Illustrations on this page are concept studies, not photographs of confirmed stock.</p>
      </div>
    </footer>
  )
}
