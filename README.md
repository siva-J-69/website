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

The endpoint must be an `https://` URL that accepts `POST` JSON and returns a success status. The page shows “enquiry sent” only after that response. Until a number or endpoint is set, the form offers **Copy Enquiry** and states that the message has not been sent.

If WhatsApp is set, **Continue on WhatsApp** opens a draft. The visitor still has to send it.

Replace the illustrative catalogue in `src/data/products.ts` when verified products are available. You can set `image` to a file in `public/products/` and `illustrative` to `false`. Do not add prices, stock, dimensions, or minimum quantities unless the business has confirmed them.

Add a real wordmark in `src/components/Header.tsx` if a logo is supplied. The current “SIVA” wordmark is provisional.

An Open Graph image is not included. Add one from the business’s own photography before sharing the page on social platforms, and point the meta tags in `index.html` at it.

## Imagery

There were no supplied product photographs. The boxes, pouches, bags, and material details are original SVG illustrations made for this page. They are labelled “Illustrative” and are not photographs of confirmed Siva stock. No third-party product photos are used.

## Still needed from the business

- Confirmed phone, WhatsApp, email, address, hours, and map
- Where enquiries should be delivered
- Verified product names, descriptions, and photographs
- Any specifications, minimum order quantity, or delivery information that should be published
- Logo and a social preview image
# website
