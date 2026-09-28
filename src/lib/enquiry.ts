import { categoryLabel, type PreviewChoice } from '../data/products'
import { siteConfig } from '../data/site'

export type EnquiryValues = {
  fullName: string
  businessName: string
  phone: string
  email: string
  productCategory: string
  quantity: string
  location: string
  customisation: string
  message: string
}

export const emptyEnquiry: EnquiryValues = {
  fullName: '',
  businessName: '',
  phone: '',
  email: '',
  productCategory: '',
  quantity: '',
  location: '',
  customisation: '',
  message: '',
}

export type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>

const phoneDigits = (value: string) => value.replace(/\D/g, '')

export const validateEnquiry = (values: EnquiryValues): EnquiryErrors => {
  const errors: EnquiryErrors = {}

  if (values.fullName.trim().length < 2) {
    errors.fullName = 'Enter your full name.'
  }
  if (values.businessName.trim().length < 2) {
    errors.businessName = 'Enter the business or shop name.'
  }
  const digits = phoneDigits(values.phone)
  if (digits.length < 8 || digits.length > 15) {
    errors.phone = 'Enter a phone or WhatsApp number with the country or area code.'
  }
  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address, or leave this field blank.'
  }
  if (!values.productCategory) {
    errors.productCategory = 'Select a product category.'
  }
  if (values.quantity.trim().length < 1) {
    errors.quantity = 'Enter an approximate quantity.'
  }
  if (values.location.trim().length < 2) {
    errors.location = 'Enter the city or delivery location.'
  }

  return errors
}

const colourNames: Record<PreviewChoice['colour'], string> = {
  burgundy: 'Deep burgundy',
  ivory: 'Warm ivory',
  champagne: 'Champagne',
}

export const previewSummary = (preview: PreviewChoice) => {
  const kind = preview.kind === 'box' ? 'Box' : 'Bag'
  const brand = preview.brandText.trim() || 'None'
  return `${kind}, ${colourNames[preview.colour]}, sample brand text “${brand}”`
}

export const buildEnquirySummary = (values: EnquiryValues, preview: PreviewChoice) => {
  const lines = [
    `Enquiry for ${siteConfig.name}`,
    '',
    `Full name: ${values.fullName.trim()}`,
    `Business or shop: ${values.businessName.trim()}`,
    `Phone / WhatsApp: ${values.phone.trim()}`,
  ]

  if (values.email.trim()) lines.push(`Email: ${values.email.trim()}`)

  lines.push(
    `Product category: ${categoryLabel(values.productCategory)}`,
    `Approximate quantity: ${values.quantity.trim()}`,
    `City or delivery location: ${values.location.trim()}`,
  )

  if (values.customisation.trim()) {
    lines.push(`Customisation requirements: ${values.customisation.trim()}`)
  }
  if (values.message.trim()) {
    lines.push(`Additional message: ${values.message.trim()}`)
  }

  lines.push(
    '',
    'Illustrative preview preferences (not a confirmed specification):',
    previewSummary(preview),
  )

  return lines.join('\n')
}

export const enquiryPayload = (values: EnquiryValues, preview: PreviewChoice) => ({
  fullName: values.fullName.trim(),
  businessName: values.businessName.trim(),
  phone: values.phone.trim(),
  email: values.email.trim(),
  productCategory: values.productCategory,
  productLabel: categoryLabel(values.productCategory),
  quantity: values.quantity.trim(),
  location: values.location.trim(),
  customisation: values.customisation.trim(),
  message: values.message.trim(),
  preview: {
    kind: preview.kind,
    colour: colourNames[preview.colour],
    brandText: preview.brandText.trim(),
    note: 'Illustrative preference, not a confirmed specification',
  },
  summary: buildEnquirySummary(values, preview),
})
