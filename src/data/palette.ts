import type { ColourId } from './products'

export type BoxPalette = {
  id: ColourId
  label: string
  front: string
  side: string
  lid: string
  highlight: string
  line: string
  text: string
  interior: string
  cushion: string
  shadow: string
}

export const palettes: Record<ColourId, BoxPalette> = {
  burgundy: {
    id: 'burgundy',
    label: 'Deep burgundy',
    front: '#4B2030',
    side: '#32151F',
    lid: '#5A2838',
    highlight: '#734055',
    line: '#C6A36E',
    text: '#F7F3EB',
    interior: '#F4E7D6',
    cushion: '#E7D3C0',
    shadow: 'rgba(37, 33, 30, 0.18)',
  },
  ivory: {
    id: 'ivory',
    label: 'Warm ivory',
    front: '#F7F3EB',
    side: '#DDD0C0',
    lid: '#FFFCF7',
    highlight: '#FFFFFF',
    line: '#B8935B',
    text: '#4B2030',
    interior: '#F7F1E6',
    cushion: '#EADCCB',
    shadow: 'rgba(37, 33, 30, 0.16)',
  },
  champagne: {
    id: 'champagne',
    label: 'Champagne',
    front: '#C6A36E',
    side: '#8F6A3E',
    lid: '#D7B784',
    highlight: '#E7CD9E',
    line: '#4B2030',
    text: '#3A1826',
    interior: '#F7F3EB',
    cushion: '#EAD9C4',
    shadow: 'rgba(37, 33, 30, 0.16)',
  },
}
