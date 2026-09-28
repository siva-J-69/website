import { MaterialCorner, OpenStudy } from './art/PackagingArt'

export function About() {
  return (
    <section className="section section-ivory" id="about" aria-labelledby="about-title">
      <div className="watermark" aria-hidden="true">
        Craft
      </div>
      <div className="wrap about-grid">
        <div className="about-copy">
          <p className="eyebrow">About us</p>
          <h2 id="about-title">Packaging, prepared for bulk orders.</h2>
          <p className="lede about-lead">
            Siva Jewellery Box & Bag Centre manufactures jewellery boxes and bags for businesses
            ordering in bulk. We supply packaging at wholesale rates and help buyers discuss the
            products and quantities they need.
          </p>
          <p>
            The box, pouch, or bag is part of the way a piece of jewellery is handed to a
            customer. Shops, jewellery brands, boutiques, and wholesalers use packaging that
            suits the piece and the quantity they need to buy.
          </p>
          <p>
            Use this page to look through illustrative packaging and to request a conversation.
            Share the product, the quantity, and the design points you want to discuss.
            Specifications, availability, and pricing are confirmed with the business. They are
            not fixed on this website.
          </p>
        </div>
        <div className="about-collage">
          <figure className="about-frame about-frame-main">
            <OpenStudy />
            <figcaption>Illustrative packaging study</figcaption>
          </figure>
          <figure className="about-frame about-frame-detail">
            <MaterialCorner />
            <figcaption>Illustrative material detail</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
