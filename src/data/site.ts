export type SocialLink = {
  label: string
  href: string
}

export type OpeningHours = {
  /** Schema.org day names, for example Monday. Match the Google Business Profile. */
  days: string[]
  /** 24-hour time, for example 09:30. */
  opens: string
  closes: string
}

/**
 * Business details for launch.
 * Leave a value empty until it is real — empty contact fields are not shown.
 * Do not insert sample phone numbers, addresses, or map links.
 *
 * The name, address, phone, and hours on this page must match the Google
 * Business Profile exactly. Search Console needs the live https origin and
 * the HTML-tag verification token from the property you verify.
 */
export const siteConfig: {
  name: string
  wordmark: string
  descriptor: string
  /** Digits only, with country code, no plus. Example: 919876543210 */
  whatsappNumber: string
  /** Visible phone text. Shown only together with phoneHref. */
  phoneDisplay: string
  /** Example: tel:+919876543210 */
  phoneHref: string
  email: string
  /** Postal address, word for word as on the Google Business Profile. */
  address: string
  /** Visible hours sentence, word for word as on the Google Business Profile. */
  hours: string
  /** HTTPS endpoint that accepts a JSON enquiry. Success is shown only after the service accepts it. */
  enquiryEndpoint: string
  /** HTTPS link to a map of the confirmed premises. */
  mapUrl: string
  /** Live site origin, no path and no trailing slash. Example: https://www.example.com */
  siteUrl: string
  /** Search Console HTML-tag token only, not the full meta element. */
  googleSiteVerification: string
  /** Google Business Profile or Maps URL for this business. */
  googleBusinessProfileUrl: string
  /** Decimal latitude, only when it is the profile pin. */
  latitude: string
  /** Decimal longitude, only when it is the profile pin. */
  longitude: string
  streetAddress: string
  addressLocality: string
  addressRegion: string
  postalCode: string
  /** ISO country code. Use the country on the Google Business Profile. */
  addressCountry: string
  openingHours: OpeningHours[]
  social: SocialLink[]
} = {
  name: 'Siva Jewellery Box & Bag Centre',
  wordmark: 'SIVA',
  descriptor: 'Jewellery Box & Bag Centre',
  whatsappNumber: '',
  phoneDisplay: '',
  phoneHref: '',
  email: '',
  address: '',
  hours: '',
  enquiryEndpoint: 'https://formsubmit.co/ajax/sivasheel97@gmail.com',
  mapUrl: '',
  siteUrl: '',
  googleSiteVerification: '',
  googleBusinessProfileUrl: '',
  latitude: '',
  longitude: '',
  streetAddress: '',
  addressLocality: '',
  addressRegion: '',
  postalCode: '',
  addressCountry: 'IN',
  openingHours: [],
  social: [],
}

export const hasWhatsapp = () => /^\d{8,15}$/.test(siteConfig.whatsappNumber)

export const hasEnquiryEndpoint = () =>
  /^https:\/\/\S+$/i.test(siteConfig.enquiryEndpoint.trim())

export const hasPhone = () =>
  siteConfig.phoneDisplay.trim() !== '' &&
  siteConfig.phoneHref.trim().toLowerCase().startsWith('tel:')

export const hasEmail = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(siteConfig.email.trim())

export const hasHours = () => siteConfig.hours.trim() !== ''

export const hasMap = () => /^https:\/\/\S+$/i.test(siteConfig.mapUrl.trim())

const isHttps = (value: string) => /^https:\/\/\S+$/i.test(value.trim())

/** Origin used for canonical, Open Graph, sitemap, and structured data. */
export const siteOrigin = () => {
  const value = siteConfig.siteUrl.trim().replace(/\/+$/, '')
  return /^https:\/\/[a-z0-9.-]+(?::\d+)?$/i.test(value) ? value : ''
}

export const hasGoogleBusinessProfile = () => isHttps(siteConfig.googleBusinessProfileUrl)

export const hasGeo = () => {
  if (siteConfig.latitude.trim() === '' || siteConfig.longitude.trim() === '') return false
  const latitude = Number(siteConfig.latitude)
  const longitude = Number(siteConfig.longitude)
  return (
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    Math.abs(latitude) <= 90 &&
    Math.abs(longitude) <= 180
  )
}

export const displayAddress = () => {
  const written = siteConfig.address.trim()
  if (written) return written
  const lines = [
    siteConfig.streetAddress,
    siteConfig.addressLocality,
    siteConfig.addressRegion,
    siteConfig.postalCode,
  ]
    .map((part) => part.trim())
    .filter(Boolean)
  if (lines.length === 0) return ''
  const country = siteConfig.addressCountry.trim()
  return country ? [...lines, country].join(', ') : lines.join(', ')
}

export const hasDisplayAddress = () => displayAddress() !== ''

export const publicSocial = () =>
  siteConfig.social.filter((item) => item.label.trim() !== '' && isHttps(item.href))

export const hasPublicContact = () =>
  hasPhone() ||
  hasEmail() ||
  hasDisplayAddress() ||
  hasHours() ||
  hasMap() ||
  hasWhatsapp() ||
  hasGoogleBusinessProfile() ||
  publicSocial().length > 0
