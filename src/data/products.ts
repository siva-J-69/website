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
 * Catalogue photographs from the supplied asset pack.
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
  image: string
  srcSet: string
  imageAlt: string
  width: number
  height: number
}

const srcSetFor = (file: string) =>
  `/assets/siva/${file}-320.webp 320w, /assets/siva/${file}-640.webp 640w, /assets/siva/${file}.webp 1254w`

const photo = (
  file: string,
  product: Omit<Product, 'image' | 'srcSet' | 'width' | 'height'>,
): Product => ({
  ...product,
  image: `/assets/siva/${file}.webp`,
  srcSet: srcSetFor(file),
  width: 1254,
  height: 1254,
})

export const products: Product[] = [
  photo('navy-peacock-small-box', {
    id: 'navy-peacock-small-box',
    name: 'Navy Peacock Small Box',
    category: 'boxes',
    categoryLabel: 'Jewellery boxes',
    description: 'A small navy jewellery box with a gold peacock feather and corner accents.',
    useCase: 'For a ring or another small piece.',
    imageAlt: 'Small textured navy jewellery box with a gold peacock feather and corner accents.',
  }),
  photo('peacock-box-rose', {
    id: 'peacock-box-rose',
    name: 'Peacock Box — Rose',
    category: 'boxes',
    categoryLabel: 'Jewellery boxes',
    description: 'A rose jewellery box with a gold peacock-feather motif and corner brackets.',
    useCase: 'For a compact presentation in a lighter colour.',
    imageAlt: 'Rose pink jewellery packaging with a gold peacock-feather motif and four corner brackets.',
  }),
  photo('peacock-box-charcoal', {
    id: 'peacock-box-charcoal',
    name: 'Peacock Box — Charcoal',
    category: 'boxes',
    categoryLabel: 'Jewellery boxes',
    description: 'A charcoal jewellery box with a gold peacock-feather motif and corner brackets.',
    useCase: 'For a compact, darker presentation.',
    imageAlt: 'Charcoal jewellery packaging with a gold peacock-feather motif and four corner brackets.',
  }),
  photo('bangle-box', {
    id: 'bangle-box',
    name: 'Bangle Box',
    category: 'boxes',
    categoryLabel: 'Jewellery boxes',
    description: 'An open burgundy jewellery box with two cream circular holders for bangles.',
    useCase: 'For a pair of bangles or similar circular pieces.',
    imageAlt: 'Open burgundy bangle box with two cream circular holders.',
  }),
  photo('burgundy-gold-long-box', {
    id: 'burgundy-gold-long-box',
    name: 'Burgundy and Gold Long Box',
    category: 'boxes',
    categoryLabel: 'Jewellery boxes',
    description: 'A slim burgundy jewellery case with gold sides and a pale centre stripe.',
    useCase: 'For a bracelet, chain, or another slim piece.',
    imageAlt: 'Slim burgundy jewellery case with gold sides and a pale metallic centre stripe.',
  }),
  photo('striped-long-box', {
    id: 'striped-long-box',
    name: 'Blue and Ivory Long Box',
    category: 'boxes',
    categoryLabel: 'Jewellery boxes',
    description: 'A slim royal blue jewellery case with a broad ivory stripe.',
    useCase: 'For a bracelet, chain, or another slim piece.',
    imageAlt: 'Slim royal blue jewellery case with a broad ivory stripe.',
  }),
  photo('necklace-set-box', {
    id: 'necklace-set-box',
    name: 'Necklace Set Box',
    category: 'boxes',
    categoryLabel: 'Jewellery boxes',
    description: 'An open wine-coloured jewellery box with a necklace pad and earring places.',
    useCase: 'For a necklace presented with earrings.',
    imageAlt: 'Open wine-coloured jewellery set box with cream necklace and earring inserts.',
  }),
  photo('gold-branch-zip-pouch', {
    id: 'gold-branch-zip-pouch',
    name: 'Gold Branch Zip Pouch',
    category: 'bags',
    categoryLabel: 'Jewellery bags & pouches',
    description: 'A rounded ivory jewellery pouch with a gold branch pattern and a brown zipper.',
    useCase: 'For jewellery that does not need a rigid box.',
    imageAlt: 'Rounded ivory zip pouch with a gold branch pattern and a brown zipper.',
  }),
  photo('gold-leaf-carry-bag', {
    id: 'gold-leaf-carry-bag',
    name: 'Gold Leaf Carry Bag',
    category: 'bags',
    categoryLabel: 'Jewellery bags & pouches',
    description: 'An ivory jewellery carry bag with a gold leaf pattern, brown handles, and a brown patch.',
    useCase: 'For handing a purchase to a customer at the counter.',
    imageAlt: 'Ivory carry bag with a gold leaf pattern, brown handles and a brown top patch.',
  }),
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
