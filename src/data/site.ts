export type SocialLink = {
  label: string
  href: string
}

/**
 * Business details for launch.
 * Leave a value empty until it is real — empty contact fields are not shown.
 * Do not insert sample phone numbers, addresses, or map links.
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
  /** Postal address, shown only when a real address is entered. */
  address: string
  hours: string
  /** HTTPS endpoint that accepts a JSON enquiry. Success is shown only after a 2xx response. */
  enquiryEndpoint: string
  /** Embed URL for a map of the confirmed premises. */
  mapUrl: string
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
  enquiryEndpoint: '',
  mapUrl: '',
  social: [],
}

export const hasWhatsapp = () => /^\d{8,15}$/.test(siteConfig.whatsappNumber)

export const hasEnquiryEndpoint = () =>
  /^https:\/\/\S+$/i.test(siteConfig.enquiryEndpoint.trim())

export const hasPhone = () =>
  siteConfig.phoneDisplay.trim() !== '' &&
  siteConfig.phoneHref.trim().toLowerCase().startsWith('tel:')

export const hasEmail = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(siteConfig.email.trim())

export const hasAddress = () => siteConfig.address.trim() !== ''

export const hasHours = () => siteConfig.hours.trim() !== ''

export const hasMap = () => /^https:\/\/\S+$/i.test(siteConfig.mapUrl.trim())
