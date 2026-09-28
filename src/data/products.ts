export type ProductCategory = 'boxes' | 'bags'

export type ArtKind =
  | 'ring'
  | 'earring'
  | 'pendant'
  | 'bangle'
  | 'set'
  | 'pouch'
  | 'bag'

/**
 * Illustrative catalogue.
 * Replace names, copy, and `image` paths when the business supplies verified products.
 * Do not add prices, stock levels, dimensions, or minimum order quantities here
 * unless they have been confirmed by the business.
 */
export type Product = {
  id: string
  name: string
  category: ProductCategory
  categoryLabel: string
  description: string
  useCase: string
  illustrative: boolean
  art: ArtKind
  /** Public path to a verified photograph, for example "/products/ring-box.jpg". */
  image?: string
  imageAlt?: string
}

export const products: Product[] = [
  {
    id: 'ring-boxes',
    name: 'Ring boxes',
    category: 'boxes',
    categoryLabel: 'Boxes',
    description: 'A compact box for presenting a single ring.',
    useCase: 'For shops packing individual rings.',
    illustrative: true,
    art: 'ring',
  },
  {
    id: 'earring-boxes',
    name: 'Earring boxes',
    category: 'boxes',
    categoryLabel: 'Boxes',
    description: 'A low box suited to a pair of earrings.',
    useCase: 'For counters where earrings are packed as a pair.',
    illustrative: true,
    art: 'earring',
  },
  {
    id: 'pendant-boxes',
    name: 'Pendant boxes',
    category: 'boxes',
    categoryLabel: 'Boxes',
    description: 'A taller box for a pendant and its chain.',
    useCase: 'For pendant orders that need a little more height.',
    illustrative: true,
    art: 'pendant',
  },
  {
    id: 'bangle-boxes',
    name: 'Bangle boxes',
    category: 'boxes',
    categoryLabel: 'Boxes',
    description: 'A wider box for bangles and similar circular pieces.',
    useCase: 'For retailers packing pieces that need a broader fit.',
    illustrative: true,
    art: 'bangle',
  },
  {
    id: 'set-boxes',
    name: 'Necklace and jewellery set boxes',
    category: 'boxes',
    categoryLabel: 'Boxes',
    description: 'A larger box for a necklace or a small set of pieces.',
    useCase: 'For bridal sets, gifting, and multi-piece presentations.',
    illustrative: true,
    art: 'set',
  },
  {
    id: 'pouches',
    name: 'Jewellery pouches',
    category: 'bags',
    categoryLabel: 'Bags & Pouches',
    description: 'A soft pouch for jewellery that does not need a rigid box.',
    useCase: 'For lightweight packing and a simpler presentation.',
    illustrative: true,
    art: 'pouch',
  },
  {
    id: 'carry-bags',
    name: 'Jewellery carry bags',
    category: 'bags',
    categoryLabel: 'Bags & Pouches',
    description: 'A carry bag that can be coordinated with the boxes.',
    useCase: 'For handing a purchase to a customer at the counter.',
    illustrative: true,
    art: 'bag',
  },
]

export const enquiryCategories = [
  ...products.map((product) => ({ value: product.id, label: product.name })),
  { value: 'unsure', label: 'Not sure yet' },
]

export const categoryLabel = (id: string) =>
  enquiryCategories.find((item) => item.value === id)?.label ?? ''

export type ColourId = 'burgundy' | 'ivory' | 'champagne'

export type PreviewChoice = {
  kind: 'box' | 'bag'
  colour: ColourId
  brandText: string
}

export const defaultPreview: PreviewChoice = {
  kind: 'box',
  colour: 'burgundy',
  brandText: 'Your Brand',
}
