import { businessSummary, faqs, hero } from '../data/content.ts'
import { products } from '../data/products.ts'
import {
  hasDisplayAddress,
  hasEmail,
  hasGeo,
  hasGoogleBusinessProfile,
  hasPhone,
  publicSocial,
  siteConfig,
  siteOrigin,
} from '../data/site.ts'

export const pageTitle = 'Siva Jewellery Box & Bag Centre | Wholesale Jewellery Packaging'

export const pageDescription =
  'Manufacturer of jewellery boxes, pouches, and carry bags for bulk orders. Custom logo, colour, and size are confirmed on enquiry. Request wholesale pricing.'

export const pageKeywords = [
  'wholesale jewellery boxes',
  'jewellery bags',
  'jewellery pouches',
  'jewellery carry bags',
  'bulk jewellery packaging',
  'custom jewellery boxes',
  'jewellery box manufacturer',
  'jewellery packaging wholesale',
  'bangle boxes',
  'necklace boxes',
  'ring boxes',
  'Siva Jewellery Box & Bag Centre',
].join(', ')

const heroImage = '/assets/siva/hero-desktop.webp'
const seoUpdated = '2026-09-29'

const attr = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

const text = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const xml = (value: string) => text(value).replace(/"/g, '&quot;')

const absolute = (path: string) => {
  const origin = siteOrigin()
  return origin ? `${origin}${path}` : path
}

const pageHref = () => {
  const origin = siteOrigin()
  return origin ? `${origin}/` : '/'
}

const nodeId = (fragment: string) => {
  const origin = siteOrigin()
  return origin ? `${origin}/${fragment}` : fragment
}

const compact = (value: Record<string, unknown>) =>
  Object.fromEntries(
    Object.entries(value).filter(([, entry]) => {
      if (entry === undefined || entry === '') return false
      if (Array.isArray(entry) && entry.length === 0) return false
      return true
    }),
  )

const postalAddress = () => {
  if (!hasDisplayAddress()) return undefined
  const street = siteConfig.streetAddress.trim()
  const locality = siteConfig.addressLocality.trim()
  const region = siteConfig.addressRegion.trim()
  const postal = siteConfig.postalCode.trim()
  const country = siteConfig.addressCountry.trim()
  if (street || locality || region || postal) {
    return compact({
      '@type': 'PostalAddress',
      streetAddress: street,
      addressLocality: locality,
      addressRegion: region,
      postalCode: postal,
      addressCountry: country,
    })
  }
  return compact({
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.trim(),
    addressCountry: country,
  })
}

const openingHours = () =>
  siteConfig.openingHours
    .filter(
      (slot) =>
        slot.days.some((day) => day.trim() !== '') &&
        /^\d{2}:\d{2}$/.test(slot.opens) &&
        /^\d{2}:\d{2}$/.test(slot.closes),
    )
    .map((slot) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: slot.days.map((day) => day.trim()).filter(Boolean),
      opens: slot.opens,
      closes: slot.closes,
    }))

const sameAs = () => [
  ...publicSocial().map((item) => item.href.trim()),
  ...(hasGoogleBusinessProfile() ? [siteConfig.googleBusinessProfileUrl.trim()] : []),
]

const telephone = () => (hasPhone() ? siteConfig.phoneHref.trim().replace(/^tel:/i, '') : '')

const structuredData = () => {
  const url = pageHref()
  const businessId = nodeId('#business')
  const websiteId = nodeId('#website')
  const webpageId = nodeId('#webpage')
  const address = postalAddress()
  const hours = openingHours()
  const profiles = sameAs()
  const phone = telephone()
  const email = hasEmail() ? siteConfig.email.trim() : ''
  const country =
    siteConfig.addressCountry.trim().toUpperCase() === 'IN' || siteConfig.addressCountry.trim() === ''
      ? 'India'
      : siteConfig.addressCountry.trim()

  return {
    '@context': 'https://schema.org',
    '@graph': [
      compact({
        '@type': 'WebSite',
        '@id': websiteId,
        url,
        name: siteConfig.name,
        description: pageDescription,
        inLanguage: 'en-IN',
        publisher: { '@id': businessId },
      }),
      compact({
        '@type': ['WebPage', 'FAQPage'],
        '@id': webpageId,
        url,
        name: pageTitle,
        description: pageDescription,
        inLanguage: 'en-IN',
        isPartOf: { '@id': websiteId },
        about: { '@id': businessId },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: absolute(heroImage),
          width: 1672,
          height: 941,
        },
        mainEntity: faqs.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }),
      compact({
        '@type': ['Manufacturer', 'WholesaleStore'],
        '@id': businessId,
        name: siteConfig.name,
        alternateName: siteConfig.wordmark,
        description: businessSummary,
        url,
        image: [
          absolute(heroImage),
          absolute('/assets/siva/navy-peacock-small-box.webp'),
          absolute('/assets/siva/gold-leaf-carry-bag.webp'),
        ],
        logo: {
          '@type': 'ImageObject',
          url: absolute('/favicon.svg'),
        },
        telephone: phone,
        email,
        address,
        geo: hasGeo()
          ? {
              '@type': 'GeoCoordinates',
              latitude: siteConfig.latitude.trim(),
              longitude: siteConfig.longitude.trim(),
            }
          : undefined,
        hasMap: hasGoogleBusinessProfile()
          ? siteConfig.googleBusinessProfileUrl.trim()
          : /^https:\/\/\S+$/i.test(siteConfig.mapUrl.trim())
            ? siteConfig.mapUrl.trim()
            : undefined,
        openingHoursSpecification: hours,
        areaServed: {
          '@type': 'Country',
          name: country,
        },
        slogan: 'Jewellery packaging, made for bulk orders.',
        knowsAbout: [
          'Wholesale jewellery boxes',
          'Jewellery pouches',
          'Jewellery carry bags',
          'Custom jewellery packaging',
          'Bulk jewellery packaging',
          'Ring boxes',
          'Bangle boxes',
          'Necklace set boxes',
        ],
        sameAs: profiles,
        contactPoint:
          phone || email
            ? compact({
                '@type': 'ContactPoint',
                contactType: 'sales',
                telephone: phone,
                email,
                areaServed: country,
                availableLanguage: 'English',
              })
            : undefined,
        mainEntityOfPage: { '@id': webpageId },
      }),
      {
        '@type': 'ItemList',
        '@id': nodeId('#range'),
        name: 'Jewellery boxes, pouches, and carry bags',
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        numberOfItems: products.length,
        itemListElement: products.map((product, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: product.name,
          description: `${product.description} ${product.useCase}`,
          image: absolute(product.image),
          url: `${url}#range`,
        })),
      },
    ],
  }
}

export const headHtml = () => {
  const href = pageHref()
  const image = absolute(heroImage)
  const imageAlt = hero.imageAlt
  const origin = siteOrigin()
  const verification = siteConfig.googleSiteVerification.trim()
  const lines = [
    `<title>${text(pageTitle)}</title>`,
    `<meta name="description" content="${attr(pageDescription)}" />`,
    `<meta name="keywords" content="${attr(pageKeywords)}" />`,
    `<meta name="author" content="${attr(siteConfig.name)}" />`,
    `<meta name="application-name" content="${attr(siteConfig.name)}" />`,
    `<meta name="apple-mobile-web-app-title" content="${attr(siteConfig.wordmark)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
    `<meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
    `<meta name="referrer" content="strict-origin-when-cross-origin" />`,
    `<link rel="canonical" href="${attr(href)}" />`,
    `<link rel="alternate" hreflang="en-IN" href="${attr(href)}" />`,
    `<link rel="alternate" hreflang="x-default" href="${attr(href)}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${attr(siteConfig.name)}" />`,
    `<meta property="og:title" content="${attr(pageTitle)}" />`,
    `<meta property="og:description" content="${attr(pageDescription)}" />`,
    `<meta property="og:image" content="${attr(image)}" />`,
    `<meta property="og:image:type" content="image/webp" />`,
    `<meta property="og:image:width" content="1672" />`,
    `<meta property="og:image:height" content="941" />`,
    `<meta property="og:image:alt" content="${attr(imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${attr(pageTitle)}" />`,
    `<meta name="twitter:description" content="${attr(pageDescription)}" />`,
    `<meta name="twitter:image" content="${attr(image)}" />`,
    `<meta name="twitter:image:alt" content="${attr(imageAlt)}" />`,
    `<link rel="manifest" href="/site.webmanifest" />`,
    `<link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />`,
  ]
  if (origin) lines.push(`<meta property="og:url" content="${attr(href)}" />`)
  if (verification && !/["<>]/.test(verification)) {
    lines.push(`<meta name="google-site-verification" content="${attr(verification)}" />`)
  }
  lines.push(
    `<script type="application/ld+json">${JSON.stringify(structuredData()).replace(/</g, '\\u003c')}</script>`,
  )
  return lines.join('\n    ')
}

export const noscriptHtml = () => {
  const productsHtml = products
    .map(
      (product) =>
        `<li><strong>${text(product.name)}</strong> — ${text(product.description)} ${text(product.useCase)}</li>`,
    )
    .join('')
  const faqHtml = faqs
    .map((item) => `<h3>${text(item.question)}</h3><p>${text(item.answer)}</p>`)
    .join('')
  return `<noscript><article class="seo-fallback wrap"><h1>${text(hero.title.join(' '))}</h1><p>${text(hero.lede)}</p><p>${text(businessSummary)}</p><h2>Jewellery boxes, pouches, and carry bags</h2><ul>${productsHtml}</ul><h2>Questions about wholesale jewellery packaging</h2>${faqHtml}</article></noscript>`
}

export const robotsTxt = () => {
  const origin = siteOrigin()
  const lines = [
    'User-agent: *',
    'Allow: /',
    '',
    'User-agent: Googlebot',
    'Allow: /',
    '',
    'User-agent: Googlebot-Image',
    'Allow: /',
    '',
  ]
  if (origin) lines.push(`Sitemap: ${origin}/sitemap.xml`, '')
  return lines.join('\n')
}

export const sitemapXml = () => {
  const origin = siteOrigin()
  const images = [
    { path: heroImage, title: 'Wholesale jewellery boxes, pouches, and carry bags', caption: hero.imageAlt },
    ...products.map((product) => ({
      path: product.image,
      title: product.name,
      caption: product.imageAlt,
    })),
  ]
  const imageXml = origin
    ? images
        .map(
          (image) =>
            `    <image:image><image:loc>${xml(absolute(image.path))}</image:loc><image:title>${xml(image.title)}</image:title><image:caption>${xml(image.caption)}</image:caption></image:image>`,
        )
        .join('\n')
    : ''
  const url = origin
    ? `  <url>
    <loc>${xml(`${origin}/`)}</loc>
    <lastmod>${seoUpdated}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
${imageXml}
  </url>`
    : ''
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${url}
</urlset>
`
}
