import { useState } from 'react'
import { products, type ProductCategory } from '../data/products'

const filters: { id: 'all' | ProductCategory; label: string }[] = [
  { id: 'all', label: 'All packaging' },
  { id: 'boxes', label: 'Jewellery boxes' },
  { id: 'bags', label: 'Bags & pouches' },
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
          <p className="eyebrow">Jewellery packaging range</p>
          <h2 id="range-title">Jewellery boxes, pouches, and carry bags.</h2>
          <p className="lede">
            These photographs show jewellery boxes, zip pouches, and carry bags you can discuss
            for a bulk order. Finish, fit, and availability are confirmed with the business
            before an order.
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
          Showing {visible.length} {visible.length === 1 ? 'piece' : 'pieces'}
        </p>

        <div className="product-grid" id="product-grid">
          {visible.map((product) => (
            <article className="card" key={product.id}>
              <div className="card-art">
                <img
                  src={product.image}
                  srcSet={product.srcSet}
                  sizes="(min-width: 1024px) 360px, (min-width: 700px) 45vw, 90vw"
                  alt={product.imageAlt}
                  width={product.width}
                  height={product.height}
                  loading="lazy"
                  decoding="async"
                />
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
