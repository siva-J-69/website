import { useId, type ReactNode } from 'react'
import type { ArtKind, ColourId } from '../../data/products'
import { palettes, type BoxPalette } from '../../data/palette'

type RigidBoxProps = {
  w: number
  h: number
  d: number
  palette: BoxPalette
  label?: string
  open?: boolean
  lidClassName?: string
  shadow?: string
}

export function RigidBox({
  w,
  h,
  d,
  palette,
  label,
  open = false,
  lidClassName,
  shadow,
}: RigidBoxProps) {
  const uid = useId().replace(/:/g, '')
  const dx = Math.round(d * 0.58)
  const dy = Math.round(d * 0.4)
  const lift = open ? 72 : 0
  const lip = Math.max(12, Math.round(h * 0.14))
  const y0 = dy
  const front = `M0 ${y0} H${w} V${y0 + h} H0 Z`
  const side = `M${w} ${y0} L${w + dx} 0 V${h} L${w} ${y0 + h} Z`
  const lid = `M0 ${y0} L${dx} 0 L${w + dx} 0 L${w} ${y0} Z`
  const lidSheen = `M0 ${y0} L${dx} 0 L${dx + w * 0.42} ${y0 * 0.28} L${w * 0.36} ${y0} Z`
  const seamY = y0 + lip
  const openLid = `M${dx + 6} ${-lift + 8} L${w + dx - 10} ${-lift + 4} L${w + dx - 2} 2 L${dx + 2} 4 Z`
  const interior = `M14 ${y0 + 1} L${dx + 10} 12 L${w + dx - 16} 12 L${w - 14} ${y0 + 1} Z`
  const cushion = `M28 ${y0 - 2} L${dx + 16} 22 L${w + dx - 30} 22 L${w - 26} ${y0 - 2} Z`
  const fontSize = labelSize(label, w)

  return (
    <g transform={lift ? `translate(0 ${lift})` : undefined}>
      <ellipse
        cx={(w + dx) / 2}
        cy={y0 + h + 18}
        rx={(w + dx) * 0.46}
        ry="11"
        fill={shadow ?? palette.shadow}
      />
      {open ? <path d={openLid} fill={palette.lid} /> : null}
      {open ? <path d={openLid} fill={palette.highlight} opacity="0.28" /> : null}
      <path d={side} fill={palette.side} />
      <path d={front} fill={`url(#front-${uid})`} />
      {open ? (
        <g>
          <path d={interior} fill={palette.interior} />
          <path d={cushion} fill={palette.cushion} />
          <ellipse
            cx={w * 0.48 + dx * 0.25}
            cy={y0 * 0.62 + 8}
            rx={Math.min(34, w * 0.16)}
            ry="8"
            fill="none"
            stroke={palette.line}
            strokeWidth="2.25"
          />
          <path
            d={`M${w - 18} ${y0 + 8} L${w + dx - 22} 18`}
            fill="none"
            stroke={palette.line}
            strokeWidth="1"
            opacity="0.7"
          />
        </g>
      ) : (
        <g className={lidClassName}>
          <path d={`M0 ${y0} H${w} V${seamY} H0 Z`} fill={palette.lid} />
          <path d={lid} fill={palette.lid} />
          <path d={lidSheen} fill={palette.highlight} opacity="0.55" />
          <path
            d={`M12 ${y0 + 1} L${dx + 8} 7 L${w + dx - 14} 7`}
            fill="none"
            stroke={palette.line}
            strokeWidth="1.35"
          />
          <rect x={w / 2 - 9} y={y0 - 2} width="18" height="6" rx="1" fill={palette.line} />
        </g>
      )}
      <path
        d={`M16 ${y0 + h - 16} H${w - 16}`}
        fill="none"
        stroke={palette.line}
        strokeWidth="1.15"
        opacity="0.9"
      />
      {label ? (
        <text
          x={w / 2}
          y={y0 + lip + (h - lip) / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={palette.text}
          fontFamily="Cormorant Garamond, Palatino, Georgia, serif"
          fontSize={fontSize}
          letterSpacing={label && label.length > 12 ? '0.08em' : '0.16em'}
        >
          {label}
        </text>
      ) : null}
      <defs>
        <linearGradient id={`front-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={palette.highlight} />
          <stop offset="0.22" stopColor={palette.front} />
          <stop offset="1" stopColor={palette.front} />
        </linearGradient>
      </defs>
    </g>
  )
}

function labelSize(label: string | undefined, w: number) {
  if (!label) return 16
  if (label.length > 14) return Math.min(15, w / 11)
  if (label.length > 9) return Math.min(18, w / 9)
  return Math.min(26, w / 6.2)
}

type BagProps = {
  w?: number
  h?: number
  palette: BoxPalette
  label?: string
  shadow?: string
}

export function CarryBag({ w = 168, h = 210, palette, label, shadow }: BagProps) {
  const top = 46
  const inset = 12
  return (
    <g>
      <ellipse
        cx={w / 2 + 8}
        cy={h + 16}
        rx={w * 0.48}
        ry="10"
        fill={shadow ?? palette.shadow}
      />
      <path
        d={`M${w - 8} ${top + 10} L${w + 28} ${top - 8} L${w + 28} ${h - 28} L${w - 4} ${h - 6} Z`}
        fill={palette.side}
      />
      <path
        d={`M${inset} ${top} L${w - inset} ${top} L${w} ${h} L0 ${h} Z`}
        fill={palette.front}
      />
      <path
        d={`M${inset + 4} ${top} L${w - inset - 4} ${top} L${w - inset - 10} ${top - 16} L${inset + 10} ${top - 16} Z`}
        fill={palette.lid}
      />
      <path
        d={`M${w * 0.3} ${top - 16} C${w * 0.28} 4, ${w * 0.42} 2, ${w * 0.44} ${top - 16}`}
        fill="none"
        stroke={palette.line}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d={`M${w * 0.56} ${top - 16} C${w * 0.58} 4, ${w * 0.72} 2, ${w * 0.74} ${top - 16}`}
        fill="none"
        stroke={palette.line}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d={`M${w * 0.22} ${h - 28} H${w * 0.78}`}
        fill="none"
        stroke={palette.line}
        strokeWidth="1.2"
      />
      {label ? (
        <text
          x={w / 2}
          y={top + (h - top) * 0.48}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={palette.text}
          fontFamily="Cormorant Garamond, Palatino, Georgia, serif"
          fontSize={labelSize(label, w)}
          letterSpacing={label.length > 12 ? '0.06em' : '0.14em'}
        >
          {label}
        </text>
      ) : null}
    </g>
  )
}

export function Pouch({ palette, shadow }: { palette: BoxPalette; shadow?: string }) {
  return (
    <g>
      <ellipse cx="116" cy="214" rx="78" ry="10" fill={shadow ?? palette.shadow} />
      <path
        d="M78 58 C52 64 34 86 40 112 C16 132 18 184 42 206 C70 232 168 230 194 202 C220 176 214 128 190 110 C196 82 176 60 150 56 C128 74 98 74 78 58 Z"
        fill={palette.front}
      />
      <path
        d="M150 56 C168 78 188 96 196 112 C176 100 156 98 136 104 C150 86 156 70 150 56 Z"
        fill={palette.side}
        opacity="0.85"
      />
      <path
        d="M74 62 C96 78 132 78 156 60"
        fill="none"
        stroke={palette.line}
        strokeWidth="2"
      />
      <path
        d="M86 58 C78 28 98 16 108 36"
        fill="none"
        stroke={palette.line}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M142 58 C154 26 136 12 124 34"
        fill="none"
        stroke={palette.line}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="116" cy="40" r="3" fill={palette.line} />
    </g>
  )
}

export function MaterialCorner() {
  return (
    <svg viewBox="0 0 320 320" aria-hidden="true">
      <rect width="320" height="320" fill="#F7F3EB" />
      <polygon points="18,92 236,48 236,268 18,236" fill="#4B2030" />
      <polygon points="236,48 302,78 302,286 236,268" fill="#32151F" />
      <polygon points="18,92 236,48 210,78 36,112" fill="#5C2A3C" />
      <line x1="36" y1="112" x2="214" y2="76" stroke="#C6A36E" strokeWidth="2" />
      <line x1="36" y1="126" x2="214" y2="90" stroke="#E8DED1" strokeWidth="1" />
      <line x1="48" y1="214" x2="214" y2="196" stroke="#C6A36E" strokeWidth="1.25" />
    </svg>
  )
}

type SceneProps = {
  className?: string
  shadow?: string
  brandText?: string
}

export function ClosedStudy({
  className,
  shadow,
  brandText = 'SIVA',
  animateLid = false,
}: SceneProps & { animateLid?: boolean }) {
  const palette = palettes.ivory
  return (
    <svg className={className} viewBox="0 0 520 460" aria-hidden="true">
      <g transform="translate(78 96)">
        <RigidBox
          w={250}
          h={156}
          d={78}
          palette={palette}
          label={brandText}
          lidClassName={animateLid ? 'story-lid' : undefined}
          shadow={shadow}
        />
      </g>
    </svg>
  )
}

export function OpenStudy({ className, shadow }: SceneProps) {
  return (
    <svg className={className} viewBox="0 0 520 460" aria-hidden="true">
      <g transform="translate(78 78)">
        <RigidBox w={250} h={156} d={78} palette={palettes.ivory} open shadow={shadow} />
      </g>
    </svg>
  )
}

export function CollectionStudy({ className, shadow, brandText = 'SIVA' }: SceneProps) {
  return (
    <svg className={className} viewBox="0 0 640 480" aria-hidden="true">
      <g transform="translate(36 150)">
        <RigidBox w={168} h={108} d={52} palette={palettes.burgundy} shadow={shadow} />
      </g>
      <g transform="translate(168 108)">
        <RigidBox
          w={210}
          h={132}
          d={64}
          palette={palettes.ivory}
          label={brandText}
          shadow={shadow}
        />
      </g>
      <g transform="translate(250 196) scale(0.82)">
        <RigidBox w={150} h={86} d={44} palette={palettes.champagne} shadow={shadow} />
      </g>
      <g transform="translate(430 92) scale(0.78)">
        <CarryBag palette={palettes.burgundy} label={brandText} shadow={shadow} />
      </g>
    </svg>
  )
}

export function StudioComposition({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 680 560" aria-hidden="true">
      <g transform="translate(48 168)">
        <RigidBox w={230} h={148} d={70} palette={palettes.burgundy} label="SIVA" />
      </g>
      <g transform="translate(292 118)">
        <RigidBox w={176} h={112} d={54} palette={palettes.ivory} />
      </g>
      <g transform="translate(78 292) scale(0.72)">
        <RigidBox w={160} h={96} d={46} palette={palettes.champagne} />
      </g>
      <g transform="translate(468 132) scale(0.86)">
        <CarryBag palette={palettes.ivory} label="SIVA" />
      </g>
    </svg>
  )
}

const productScenes: Record<ArtKind, (palette: BoxPalette) => ReactNode> = {
  ring: (palette) => (
    <g transform="translate(78 128)">
      <RigidBox w={180} h={112} d={56} palette={palette} />
    </g>
  ),
  earring: (palette) => (
    <g transform="translate(36 156)">
      <RigidBox w={270} h={78} d={48} palette={palette} />
    </g>
  ),
  pendant: (palette) => (
    <g transform="translate(108 72)">
      <RigidBox w={120} h={196} d={52} palette={palette} />
    </g>
  ),
  bangle: (palette) => (
    <g transform="translate(24 168)">
      <RigidBox w={300} h={72} d={46} palette={palette} />
    </g>
  ),
  set: (palette) => (
    <g transform="translate(48 108)">
      <RigidBox w={240} h={140} d={66} palette={palette} open />
    </g>
  ),
  pouch: (palette) => (
    <g transform="translate(62 78)">
      <Pouch palette={palette} />
    </g>
  ),
  bag: (palette) => (
    <g transform="translate(78 48)">
      <CarryBag w={190} h={250} palette={palette} label="SIVA" />
    </g>
  ),
}

const productPalettes: Record<ArtKind, BoxPalette> = {
  ring: palettes.burgundy,
  earring: palettes.ivory,
  pendant: palettes.burgundy,
  bangle: palettes.champagne,
  set: palettes.ivory,
  pouch: palettes.burgundy,
  bag: palettes.ivory,
}

export function ProductArt({ kind }: { kind: ArtKind }) {
  const palette = productPalettes[kind]
  return (
    <svg viewBox="0 0 360 440" aria-hidden="true">
      {productScenes[kind](palette)}
    </svg>
  )
}

type PreviewArtProps = {
  kind: 'box' | 'bag'
  colour: ColourId
  brandText: string
}

export function PreviewArt({ kind, colour, brandText }: PreviewArtProps) {
  const palette = palettes[colour]
  const label = brandText.trim()
  const described = `Illustrative preview of a ${palette.label.toLowerCase()} ${kind} marked ${label || 'with no brand text'}`

  return (
    <svg viewBox="0 0 480 420" role="img" aria-label={described}>
      {kind === 'box' ? (
        <g transform="translate(70 78)">
          <RigidBox w={250} h={150} d={74} palette={palette} label={label} />
        </g>
      ) : (
        <g transform="translate(145 36)">
          <CarryBag w={180} h={250} palette={palette} label={label} />
        </g>
      )}
    </svg>
  )
}
