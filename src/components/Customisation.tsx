import { customisationPoints } from '../data/content'
import { palettes } from '../data/palette'
import { PreviewArt } from './art/PackagingArt'
import type { ColourId, PreviewChoice } from '../data/products'

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
            <p className="eyebrow">Customisation</p>
            <h2 id="custom-title">Tell us how you want your packaging.</h2>
            <p className="lede">
              Buyers usually discuss the points below before a quotation is prepared. Every
              option is subject to confirmation.
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
              <PreviewArt
                kind={preview.kind}
                colour={preview.colour}
                brandText={preview.brandText}
              />
              <p className="hero-caption">Illustrative preview</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-burgundy wholesale" aria-labelledby="wholesale-title">
        <div className="wrap wholesale-grid">
          <div>
            <p className="eyebrow">Wholesale</p>
            <h2 id="wholesale-title">Ordering in quantity? Let’s discuss your requirements.</h2>
          </div>
          <div>
            <p>
              Wholesale quotations depend on the product type, quantity, dimensions, materials,
              and any printing. Orders placed in quantity may qualify for wholesale discounts.
              Rates and discount tiers are not published here — they are confirmed when your
              requirements are clear.
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
