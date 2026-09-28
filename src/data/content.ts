export const customisationPoints = [
  {
    number: '01',
    title: 'Box or bag type',
    text: 'Boxes, pouches, carry bags, or a mix of packaging for the same order.',
  },
  {
    number: '02',
    title: 'Dimensions and fit',
    text: 'The piece the packaging should hold, or the internal size you have in mind.',
  },
  {
    number: '03',
    title: 'Preferred colours',
    text: 'Colours you would like considered for the outside or the interior.',
  },
  {
    number: '04',
    title: 'Material or finish',
    text: 'The material or finish you want to discuss. Availability is confirmed with the business.',
  },
  {
    number: '05',
    title: 'Logo or printing requirements',
    text: 'Brand text, a logo, or other printing, if you need it on the packaging.',
  },
  {
    number: '06',
    title: 'Order quantity',
    text: 'How many pieces you are planning to order, even if the number is still approximate.',
  },
] as const

export const processSteps = [
  {
    number: '01',
    title: 'Explore the range',
    text: 'Look through the boxes, pouches, and carry bags, and note what you want to discuss.',
  },
  {
    number: '02',
    title: 'Share the product, quantity, and design requirements',
    text: 'Tell us the packaging, an approximate quantity, and any preferences for size, colour, material, or printing.',
  },
  {
    number: '03',
    title: 'Confirm specifications, availability, and quotation',
    text: 'Specifications, availability, and the wholesale quotation are confirmed with you before an order is agreed.',
  },
  {
    number: '04',
    title: 'Agree on the order and delivery arrangements',
    text: 'Once the details are agreed, the order and the delivery arrangements are confirmed directly with the business.',
  },
] as const

export const faqs = [
  {
    question: 'Can I place a bulk order?',
    answer:
      'Yes. Siva Jewellery Box & Bag Centre manufactures jewellery boxes and bags and accepts bulk orders from businesses. Share the product and quantity through the enquiry form so the order can be discussed.',
  },
  {
    question: 'How is wholesale pricing calculated?',
    answer:
      'A quotation depends on the product type, quantity, dimensions, materials, and printing requirements. Quantity-based wholesale discounts may apply. The rate is confirmed with the business after your requirements are clear. Prices are not listed on this website.',
  },
  {
    question: 'What is the minimum order quantity?',
    answer:
      'A minimum order quantity has not been published here. Include the quantity you need in your enquiry so it can be confirmed with the business.',
  },
  {
    question: 'Can I request my logo or preferred colours?',
    answer:
      'Yes, you can describe logo, printing, and colour preferences in your enquiry. Whether a particular colour, finish, or print method can be offered is subject to confirmation.',
  },
  {
    question: 'How can I confirm sizes and materials?',
    answer:
      'Describe the piece the packaging should fit, and any size or material you prefer. Fit, dimensions, and material are confirmed with the business before an order is agreed. Verified specifications are not listed on this page.',
  },
  {
    question: 'How do I discuss delivery timelines?',
    answer:
      'Add your city or delivery location to the enquiry. Delivery arrangements, including timing, are discussed with the business. Lead times are not published on this website.',
  },
] as const

export const storyChapters = [
  {
    number: '01',
    title: 'The first impression',
    text: 'The outside of a jewellery box is what a customer sees first. Proportion, colour, and finish shape the way a piece is presented, before the box is opened.',
    art: 'closed' as const,
    label: 'Illustrative closed jewellery box',
  },
  {
    number: '02',
    title: 'The details inside',
    text: 'An open box is the moment to consider fit. Think about dimensions, the interior, and the material you would like to discuss for your range.',
    art: 'open' as const,
    label: 'Illustrative open jewellery box',
  },
  {
    number: '03',
    title: 'Ready for your business',
    text: 'Boxes and bags can be planned as a coordinated set. When you are buying for a shop or brand, share the quantity and we can discuss a wholesale quotation.',
    art: 'group' as const,
    label: 'Illustrative group of jewellery boxes and a carry bag',
  },
] as const
