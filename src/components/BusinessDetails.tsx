import {
  displayAddress,
  hasDisplayAddress,
  hasEmail,
  hasGoogleBusinessProfile,
  hasHours,
  hasMap,
  hasPhone,
  hasPublicContact,
  hasWhatsapp,
  publicSocial,
  siteConfig,
} from '../data/site'

type BusinessDetailsProps = {
  listClassName?: string
}

export function BusinessDetails({ listClassName }: BusinessDetailsProps) {
  if (!hasPublicContact()) return null
  const social = publicSocial()

  return (
    <address>
      <ul className={listClassName}>
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
        {hasDisplayAddress() ? <li>{displayAddress()}</li> : null}
        {hasHours() ? <li>{siteConfig.hours.trim()}</li> : null}
        {hasMap() ? (
          <li>
            <a href={siteConfig.mapUrl.trim()} target="_blank" rel="noreferrer">
              View map
            </a>
          </li>
        ) : null}
        {hasGoogleBusinessProfile() ? (
          <li>
            <a href={siteConfig.googleBusinessProfileUrl.trim()} target="_blank" rel="noreferrer">
              Google Business Profile
            </a>
          </li>
        ) : null}
        {social.map((item) => (
          <li key={item.href}>
            <a href={item.href.trim()} target="_blank" rel="noreferrer">
              {item.label.trim()}
            </a>
          </li>
        ))}
      </ul>
    </address>
  )
}
