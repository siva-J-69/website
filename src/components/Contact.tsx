import { useId, useRef, useState, type FormEvent } from 'react'
import { enquiryCategories, type PreviewChoice } from '../data/products'
import { hasEnquiryEndpoint, hasPublicContact, hasWhatsapp, siteConfig } from '../data/site'
import { BusinessDetails } from './BusinessDetails'
import {
  buildEnquirySummary,
  emptyEnquiry,
  enquiryPayload,
  previewSummary,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryValues,
} from '../lib/enquiry'

type ContactProps = {
  category: string
  onCategoryChange: (category: string) => void
  preview: PreviewChoice
}

type Status =
  | { type: 'idle' }
  | { type: 'submitting' }
  | { type: 'success' }
  | { type: 'endpoint-error' }
  | { type: 'copied' }
  | { type: 'copy-failed'; summary: string }
  | { type: 'whatsapp' }

const fields: { name: keyof EnquiryValues; label: string; required?: boolean }[] = [
  { name: 'fullName', label: 'Full name', required: true },
  { name: 'businessName', label: 'Business or shop name', required: true },
  { name: 'phone', label: 'Phone / WhatsApp number', required: true },
  { name: 'email', label: 'Email' },
  { name: 'quantity', label: 'Approximate quantity', required: true },
  { name: 'location', label: 'City or delivery location', required: true },
]

export function Contact({ category, onCategoryChange, preview }: ContactProps) {
  const formId = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const [values, setValues] = useState<EnquiryValues>(emptyEnquiry)
  const [errors, setErrors] = useState<EnquiryErrors>({})
  const [status, setStatus] = useState<Status>({ type: 'idle' })
  const current: EnquiryValues = { ...values, productCategory: category }
  const endpoint = hasEnquiryEndpoint()
  const whatsapp = hasWhatsapp()

  const update = (name: keyof EnquiryValues, value: string) => {
    setValues((currentValues) => ({ ...currentValues, [name]: value }))
    if (name === 'productCategory') onCategoryChange(value)
    setErrors((currentErrors) => ({ ...currentErrors, [name]: undefined }))
    if (status.type !== 'idle' && status.type !== 'submitting') setStatus({ type: 'idle' })
  }

  const reportErrors = (nextErrors: EnquiryErrors) => {
    setErrors(nextErrors)
    const first = Object.keys(nextErrors)[0]
    if (!first) return
    const field = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)
    field?.focus()
  }

  const submitToEndpoint = async () => {
    setStatus({ type: 'submitting' })
    try {
      const payload = enquiryPayload(current, preview)
      const response = await fetch(siteConfig.enquiryEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...payload,
          preview: `${payload.preview.kind}, ${payload.preview.colour}, sample brand text “${payload.preview.brandText || 'None'}”`,
          _subject: `New enquiry — ${payload.businessName}`,
          _template: 'table',
          _captcha: 'false',
          ...(payload.email ? { _replyto: payload.email } : {}),
        }),
        signal: AbortSignal.timeout(15000),
      })
      const data = (await response.json().catch(() => null)) as { success?: string | boolean } | null
      const accepted = response.ok && data?.success !== 'false' && data?.success !== false
      setStatus({ type: accepted ? 'success' : 'endpoint-error' })
    } catch {
      setStatus({ type: 'endpoint-error' })
    }
  }

  const openWhatsapp = () => {
    const summary = buildEnquirySummary(current, preview)
    const href = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(summary)}`
    window.open(href, '_blank', 'noopener,noreferrer')
    setStatus({ type: 'whatsapp' })
  }

  const copyEnquiry = async () => {
    const summary = buildEnquirySummary(current, preview)
    try {
      await navigator.clipboard.writeText(summary)
      setStatus({ type: 'copied' })
    } catch {
      setStatus({ type: 'copy-failed', summary })
    }
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validateEnquiry(current)
    if (Object.keys(nextErrors).length > 0) {
      reportErrors(nextErrors)
      return
    }
    if (endpoint) {
      void submitToEndpoint()
      return
    }
    if (whatsapp) {
      openWhatsapp()
      return
    }
    void copyEnquiry()
  }

  const errorEntries = Object.entries(errors).filter((entry): entry is [string, string] =>
    Boolean(entry[1]),
  )

  return (
    <section className="section section-burgundy contact" id="contact" aria-labelledby="contact-title">
      <div className="watermark" aria-hidden="true">
        Enquire
      </div>
      <div className="wrap contact-grid">
        <header className="contact-intro">
          <div>
            <p className="eyebrow">Contact</p>
            <h2 id="contact-title">Request a wholesale quotation.</h2>
            <p className="lede">
              Tell Siva Jewellery Box & Bag Centre which jewellery boxes, pouches, or bags you
              need, and the quantity you have in mind. Wholesale pricing is confirmed from those
              details. It is not listed on this page.
            </p>
            {hasPublicContact() ? <BusinessDetails listClassName="contact-details" /> : null}
          </div>
          <ol className="contact-points">
            <li>
              <span>01</span>
              The product and an approximate quantity
            </li>
            <li>
              <span>02</span>
              Your city or delivery location
            </li>
            <li>
              <span>03</span>
              Colour, material, or printing, if you need them
            </li>
          </ol>
        </header>

        <form ref={formRef} className="form-card" onSubmit={onSubmit} noValidate>
          <p className="form-required">
            Required fields are marked with an asterisk (<abbr title="required">*</abbr>).
          </p>

          {errorEntries.length > 0 ? (
            <div className="form-summary" role="alert">
              <p>Please correct the following before continuing.</p>
              <ul>
                {errorEntries.map(([name, message]) => (
                  <li key={name}>
                    <a href={`#${formId}-${name}`}>{message}</a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="form-grid">
            {fields.slice(0, 4).map((field) => (
              <Field
                key={field.name}
                id={`${formId}-${field.name}`}
                name={field.name}
                label={field.label}
                required={field.required}
                value={current[field.name]}
                error={errors[field.name]}
                type={field.name === 'email' ? 'email' : field.name === 'phone' ? 'tel' : 'text'}
                autoComplete={autoCompleteFor(field.name)}
                onChange={update}
              />
            ))}

            <label className="field" htmlFor={`${formId}-productCategory`}>
              <span>
                Product category <abbr title="required">*</abbr>
              </span>
              <select
                id={`${formId}-productCategory`}
                name="productCategory"
                value={category}
                aria-invalid={errors.productCategory ? true : undefined}
                aria-describedby={errors.productCategory ? `${formId}-productCategory-error` : undefined}
                onChange={(event) => update('productCategory', event.target.value)}
              >
                <option value="">Select a category</option>
                {enquiryCategories.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
              <span id={`${formId}-productCategory-error`} className="error">
                {errors.productCategory ?? ''}
              </span>
            </label>

            {fields.slice(4).map((field) => (
              <Field
                key={field.name}
                id={`${formId}-${field.name}`}
                name={field.name}
                label={field.label}
                required={field.required}
                value={current[field.name]}
                error={errors[field.name]}
                type="text"
                autoComplete={autoCompleteFor(field.name)}
                onChange={update}
              />
            ))}

            <label className="field" htmlFor={`${formId}-customisation`}>
              <span>Customisation requirements</span>
              <textarea
                id={`${formId}-customisation`}
                name="customisation"
                value={current.customisation}
                rows={4}
                onChange={(event) => update('customisation', event.target.value)}
              />
              <span className="error" />
            </label>

            <label className="field" htmlFor={`${formId}-message`}>
              <span>Additional message</span>
              <textarea
                id={`${formId}-message`}
                name="message"
                value={current.message}
                rows={4}
                onChange={(event) => update('message', event.target.value)}
              />
              <span className="error" />
            </label>
          </div>

          <div className="preview-note">
            <p>Preferences from the illustrative preview</p>
            <p>{previewSummary(preview)}</p>
            <p className="field-hint">
              Included with the enquiry as a design preference, not a confirmed specification.
            </p>
          </div>

          <div className="form-actions">
            {endpoint ? (
              <button className="btn btn-primary" type="submit" disabled={status.type === 'submitting'}>
                {status.type === 'submitting' ? 'Sending…' : 'Send Enquiry'}
              </button>
            ) : null}
            {whatsapp ? (
              <button
                className={`btn ${endpoint ? 'btn-secondary' : 'btn-primary'}`}
                type={endpoint ? 'button' : 'submit'}
                onClick={
                  endpoint
                    ? () => {
                        const nextErrors = validateEnquiry(current)
                        if (Object.keys(nextErrors).length > 0) {
                          reportErrors(nextErrors)
                          return
                        }
                        openWhatsapp()
                      }
                    : undefined
                }
              >
                Continue on WhatsApp
              </button>
            ) : null}
            {!endpoint && !whatsapp ? (
              <button className="btn btn-primary" type="submit">
                Copy Enquiry
              </button>
            ) : null}
          </div>

          <p className="form-note">{submissionNote(endpoint, whatsapp)}</p>
          <StatusMessage status={status} />
        </form>
      </div>
    </section>
  )
}

function Field({
  id,
  name,
  label,
  required,
  value,
  error,
  type,
  autoComplete,
  onChange,
}: {
  id: string
  name: keyof EnquiryValues
  label: string
  required?: boolean
  value: string
  error?: string
  type: string
  autoComplete?: string
  onChange: (name: keyof EnquiryValues, value: string) => void
}) {
  return (
    <label className={`field${name === 'location' ? ' field-wide' : ''}`} htmlFor={id}>
      <span>
        {label} {required ? <abbr title="required">*</abbr> : null}
      </span>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        required={required}
        onChange={(event) => onChange(name, event.target.value)}
      />
      <span id={`${id}-error`} className="error">
        {error ?? ''}
      </span>
    </label>
  )
}

function StatusMessage({ status }: { status: Status }) {
  if (status.type === 'idle' || status.type === 'submitting') return null

  if (status.type === 'success') {
    return (
      <p className="status" role="status">
        Your enquiry was sent. The business can follow up using the details you provided.
      </p>
    )
  }

  if (status.type === 'endpoint-error') {
    return (
      <p className="status status-error" role="alert">
        The enquiry was not sent. Please try again in a moment.
      </p>
    )
  }

  if (status.type === 'copied') {
    return (
      <p className="status" role="status">
        Enquiry copied. It has not been sent — share it with the business yourself.
      </p>
    )
  }

  if (status.type === 'copy-failed') {
    return (
      <div className="status" role="status">
        <p>The enquiry could not be copied automatically, and it has not been sent. Select the text below and copy it.</p>
        <textarea readOnly rows={8} value={status.summary} aria-label="Enquiry text to copy" />
      </div>
    )
  }

  return (
    <p className="status" role="status">
      WhatsApp should open with your enquiry ready to review. Nothing is sent until you send the message yourself.
    </p>
  )
}

function submissionNote(endpoint: boolean, whatsapp: boolean) {
  if (endpoint && whatsapp) {
    return 'Send Enquiry delivers the form to the configured address. Continue on WhatsApp opens a message for you to review and send. A success note appears only after the form is accepted.'
  }
  if (endpoint) {
    return 'The enquiry is sent only when you submit this form, and only a successful response is treated as sent.'
  }
  if (whatsapp) {
    return 'Continue on WhatsApp opens a draft for you to review. The enquiry is not sent until you send that message.'
  }
  return 'Copy Enquiry places the message on your clipboard. This website does not send it.'
}

function autoCompleteFor(name: keyof EnquiryValues) {
  switch (name) {
    case 'fullName':
      return 'name'
    case 'businessName':
      return 'organization'
    case 'phone':
      return 'tel'
    case 'email':
      return 'email'
    case 'location':
      return 'address-level2'
    default:
      return undefined
  }
}
