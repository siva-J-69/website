import { customisationPoints } from '../data/content'
import { palettes } from '../data/palette'
import type { ColourId, PreviewChoice } from '../data/products'

const previewPhotos: Record<PreviewChoice['kind'], Record<ColourId, { src: string; alt: string }>> = {
  box: {
    burgundy: {
      src: '/assets/siva/bangle-box.webp',
      alt: 'Open burgundy bangle box with two cream circular holders.',
    },
    ivory: {
      src: '/assets/siva/striped-long-box.webp',
      alt: 'Slim royal blue jewellery case with a broad ivory stripe.',
    },
    champagne: {
      src: '/assets/siva/burgundy-gold-long-box.webp',
      alt: 'Slim burgundy jewellery case with gold sides and a pale metallic centre stripe.',
    },
  },
  bag: {
    burgundy: {
      src: '/assets/siva/gold-leaf-carry-bag.webp',
      alt: 'Ivory carry bag with a gold leaf pattern, brown handles and a brown top patch.',
    },
    ivory: {
      src: '/assets/siva/gold-branch-zip-pouch.webp',
      alt: 'Rounded ivory zip pouch with a gold branch pattern and a brown zipper.',
    },
    champagne: {
      src: '/assets/siva/gold-leaf-carry-bag.webp',
      alt: 'Ivory carry bag with a gold leaf pattern, brown handles and a brown top patch.',
    },
  },
}

const colours: ColourId[] = ['burgundy', 'ivory', 'champagne']

type CustomisationProps = {
  preview: PreviewChoice
  onChange: (preview: PreviewChoice) => void
}

export function Customisation({ preview, onChange }: CustomisationProps) {
  return (
    <>
      <section className="section section-beige" id="customisation" aria-labelledby="custom-title">
        <div className="wrap custom-grid">
          <header className="section-heading">
            <p className="eyebrow">Custom jewellery packaging</p>
            <h2 id="custom-title">Logo, colour, size, and material.</h2>
            <p className="lede">
              Custom jewellery boxes and bags usually start with the points below. Logo
              printing, colours, and finishes are discussed in the enquiry and confirmed before
              a wholesale quotation.
            </p>
          </header>
          <ol className="option-list">
            {customisationPoints.map((point) => (
              <li key={point.number} className="reveal">
                <span>{point.number}</span>
                <h3>{point.title}</h3>
                <p>{point.text}</p>
              </li>
            ))}
          </ol>

          <div className="preview">
            <div className="preview-copy">
              <p className="eyebrow">Illustrative preview</p>
              <h3>A preference, not a confirmed specification.</h3>
              <p>
                Switch the packaging type and a coordinated colour, and add sample brand text.
                These controls record a design preference for your enquiry. They are not
                confirmed manufacturing options.
              </p>
              <div className="kind-toggle" role="group" aria-label="Packaging type">
                {(['box', 'bag'] as const).map((kind) => (
                  <button
                    key={kind}
                    type="button"
                    aria-pressed={preview.kind === kind}
                    onClick={() => onChange({ ...preview, kind })}
                  >
                    {kind === 'box' ? 'Box' : 'Bag'}
                  </button>
                ))}
              </div>
              <div className="swatches" role="radiogroup" aria-label="Colour preference">
                {colours.map((colour) => (
                  <button
                    key={colour}
                    type="button"
                    role="radio"
                    aria-checked={preview.colour === colour}
                    className={`swatch swatch-${colour}`}
                    onClick={() => onChange({ ...preview, colour })}
                  >
                    <span className="sr-only">{palettes[colour].label}</span>
                  </button>
                ))}
              </div>
              <label className="field">
                <span>Sample brand text</span>
                <input
                  value={preview.brandText}
                  maxLength={18}
                  onChange={(event) => onChange({ ...preview, brandText: event.target.value })}
                />
              </label>
              <p className="field-hint">
                Shown on the preview only. Add your real wording in the enquiry if it should be
                discussed.
              </p>
            </div>
            <div className="preview-stage">
              <img
                src={previewPhotos[preview.kind][preview.colour].src}
                alt={previewPhotos[preview.kind][preview.colour].alt}
                width={1254}
                height={1254}
              />
              {preview.brandText.trim() ? (
                <p className="preview-brand">{preview.brandText}</p>
              ) : null}
              <p className="hero-caption">Related style, not a confirmed colour</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-burgundy wholesale" aria-labelledby="wholesale-title">
        <div className="wrap wholesale-grid">
          <div>
            <p className="eyebrow">Wholesale</p>
            <h2 id="wholesale-title">Wholesale pricing for quantity orders.</h2>
          </div>
          <div>
            <p>
              A wholesale quotation for jewellery boxes, pouches, or carry bags depends on the
              product type, quantity, dimensions, materials, and any logo printing. Orders
              placed in quantity may qualify for wholesale discounts. Rates and discount tiers
              are not published here — they are confirmed when your requirements are clear.
            </p>
            <a className="btn btn-light" href="#contact">
              Request Wholesale Pricing
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
