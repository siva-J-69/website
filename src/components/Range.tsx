import { useState } from 'react'
import { products, type ProductCategory } from '../data/products'
import { ProductArt } from './art/PackagingArt'

const filters: { id: 'all' | ProductCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'boxes', label: 'Boxes' },
  { id: 'bags', label: 'Bags & Pouches' },
]

type RangeProps = {
  onEnquire: (productId: string) => void
}

export function Range({ onEnquire }: RangeProps) {
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('all')
  const visible = products.filter((product) => filter === 'all' || product.category === filter)

  return (
    <section className="section section-ivory" id="range" aria-labelledby="range-title">
      <div className="watermark" aria-hidden="true">
        Range
      </div>
      <div className="wrap">
        <header className="section-heading">
          <p className="eyebrow">Our range</p>
          <h2 id="range-title">Find the right packaging for every piece.</h2>
          <p className="lede">
            These studies show the kinds of jewellery boxes and bags the business manufactures
            for bulk orders. They are illustrative until a verified catalogue, with confirmed
            specifications, is supplied.
          </p>
        </header>

        <div className="filters" role="toolbar" aria-label="Filter the range">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              className="filter"
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="filter-count" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? 'study' : 'studies'}
        </p>

        <div className="product-grid" id="product-grid">
          {visible.map((product) => (
            <article className="card" key={product.id}>
              <div className="card-art">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.imageAlt ?? ''}
                    width={800}
                    height={980}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div role="img" aria-label={`Illustrative drawing of ${product.name.toLowerCase()}`}>
                    <ProductArt kind={product.art} />
                  </div>
                )}
                {product.illustrative ? <p className="illus">Illustrative</p> : null}
              </div>
              <p className="card-kicker">{product.categoryLabel}</p>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="card-use">
                <span>Use</span>
                {product.useCase}
              </p>
              <button type="button" className="btn btn-secondary" onClick={() => onEnquire(product.id)}>
                Enquire About This
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
