import { businessSummary } from '../data/content'

export function About() {
  return (
    <section className="section section-ivory" id="about" aria-labelledby="about-title">
      <div className="watermark" aria-hidden="true">
        Craft
      </div>
      <div className="wrap about-grid">
        <div className="about-copy">
          <p className="eyebrow">About us</p>
          <h2 id="about-title">A manufacturer of jewellery boxes and bags.</h2>
          <p className="lede about-lead">{businessSummary}</p>
          <p>
            The box, pouch, or carry bag is part of how a piece of jewellery is handed to a
            customer. Ring boxes, bangle boxes, necklace set boxes, zip pouches, and carry bags
            can be planned together for a shop, brand, boutique, or wholesaler.
          </p>
          <p>
            Share the product, the quantity, and any logo, colour, or material you want
            considered. Specifications, availability, and wholesale pricing are confirmed with
            the business. They are not fixed on this website.
          </p>
        </div>
        <div className="about-collage">
          <figure className="about-frame about-frame-main">
            <img
              src="/assets/siva/necklace-set-box.webp"
              srcSet="/assets/siva/necklace-set-box-640.webp 640w, /assets/siva/necklace-set-box.webp 1254w"
              sizes="(min-width: 900px) 42vw, 90vw"
              alt="Open wine-coloured jewellery set box with cream necklace and earring inserts."
              width={1254}
              height={1254}
              loading="lazy"
              decoding="async"
            />
            <figcaption>Necklace set box</figcaption>
          </figure>
          <figure className="about-frame about-frame-detail">
            <img
              src="/assets/siva/navy-peacock-small-box.webp"
              srcSet="/assets/siva/navy-peacock-small-box-640.webp 640w, /assets/siva/navy-peacock-small-box.webp 1254w"
              sizes="(min-width: 480px) 28vw, 70vw"
              alt="Small textured navy jewellery box with a gold peacock feather and corner accents."
              width={1254}
              height={1254}
              loading="lazy"
              decoding="async"
            />
            <figcaption>Navy peacock small box</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
