# Siva Jewellery Box & Bag Centre

A single-page website for wholesale jewellery packaging. It introduces boxes and bags, explains how to request a quotation, and does not take payment or publish prices.

## Run the site

```bash
npm install
npm run dev
```

Other checks:

```bash
npm run lint
npm run build
npm run preview
```

## Before launch

Edit `src/data/site.ts` only when the detail is real. Empty fields stay hidden.

- Phone display and `tel:` link
- WhatsApp number, digits only, with country code
- Email, postal address, and business hours
- Map link
- Social links
- Enquiry endpoint, if the form should submit to a service
- `siteUrl`: the live `https://` origin, with no path and no trailing slash. Canonical, Open Graph, and `sitemap.xml` use it. Set this before submitting the sitemap in Google Search Console.
- `googleSiteVerification`: the Search Console HTML-tag token only
- `googleBusinessProfileUrl`, street address parts, latitude, longitude, and `openingHours`: the same details as the Google Business Profile. The visible name, address, phone, and hours must match that profile word for word.

The endpoint must be an `https://` URL that accepts `POST` JSON and returns a success status. The page shows “enquiry sent” only after that response. Until a number or endpoint is set, the form offers **Copy Enquiry** and states that the message has not been sent.

If WhatsApp is set, **Continue on WhatsApp** opens a draft. The visitor still has to send it.

The current catalogue is in `src/data/products.ts` and the photographs are in `public/assets/siva/`. Replace a product’s image only with a verified photograph. Do not add prices, stock, dimensions, or minimum quantities unless the business has confirmed them.

Add a real wordmark in `src/components/Header.tsx` if a logo is supplied. The current “SIVA” wordmark is provisional.

The social preview uses the hero photograph. Replace it only with a verified photograph, then keep the image path in `src/seo/meta.ts` in step with that file.

## Imagery

Product and hero photographs live in `public/assets/siva/`. They were prepared from photographs supplied for the site and should be compared with the physical products before specifications are published. The page does not list prices, measurements, or stock.

## Still needed from the business

- Confirmed phone, WhatsApp, email, address, hours, and map, matching the Google Business Profile
- The live site URL and the Search Console verification token
- Where enquiries should be delivered
- Confirmation that each photograph matches the product that will be supplied
- Any specifications, minimum order quantity, or delivery information that should be published
- Logo
