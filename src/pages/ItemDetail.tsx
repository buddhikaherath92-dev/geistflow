import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getItemById } from '../lib/storage'
import { setPageMeta } from '../lib/meta'

// --- colour utilities ---

function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ]
}

function toHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.min(255, Math.max(0, Math.round(v)))
  return '#' + [clamp(r), clamp(g), clamp(b)].map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase()
}

function mixToward(base: [number, number, number], target: [number, number, number], t: number): string {
  return toHex(
    base[0] + (target[0] - base[0]) * t,
    base[1] + (target[1] - base[1]) * t,
    base[2] + (target[2] - base[2]) * t,
  )
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return [0, 0, l * 100]
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  switch (max) {
    case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
    case g: h = ((b - r) / d + 2) / 6; break
    case b: h = ((r - g) / d + 4) / 6; break
  }
  return [h * 360, s * 100, l * 100]
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return toHex(Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255))
}

function generateShades(hex: string): string[] {
  const base = hexToRgb(hex)
  const white: [number, number, number] = [255, 255, 255]
  const black: [number, number, number] = [0, 0, 0]
  return [
    mixToward(base, white, 5 / 6),
    mixToward(base, white, 4 / 6),
    mixToward(base, white, 3 / 6),
    mixToward(base, white, 2 / 6),
    mixToward(base, white, 1 / 6),
    hex.toUpperCase(),
    mixToward(base, black, 1 / 6),
    mixToward(base, black, 2 / 6),
    mixToward(base, black, 3 / 6),
    mixToward(base, black, 4 / 6),
    mixToward(base, black, 5 / 6),
  ]
}

interface GradientDef {
  name: string
  stops: string[]
}

function generateGradients(hex: string): GradientDef[] {
  const [r, g, b] = hexToRgb(hex)
  const [h, s, l] = rgbToHsl(r, g, b)

  const lighter = hslToHex(h, s, Math.min(l + 45, 92))
  const darker  = hslToHex(h, s, Math.max(l - 15, 3))
  const hueUp   = hslToHex((h + 30) % 360, s, l)
  const anchor  = hslToHex((h + 150) % 360, Math.min(s * 0.7, 28), Math.max(l * 0.8, 8))

  return [
    { name: 'Dusk',     stops: [hex.toUpperCase(), lighter] },
    { name: 'Ember',    stops: [darker, hex.toUpperCase()] },
    { name: 'Veil',     stops: [lighter, hueUp, darker] },
    { name: 'Undertow', stops: [hex.toUpperCase(), anchor] },
  ]
}

const SUITABILITY: Record<string, { name: string; description: string }> = {
  '#FFF9F7': { name: 'Honest.',      description: 'Pure and clean, but never claiming to be flawless. No one is. An honest white.' },
  '#190000': { name: 'Still.',       description: 'A red so deep it stops being loud and becomes calm. Weight, not noise.' },
  '#3A0000': { name: 'Regal.',       description: 'Bold, confident, premium. A quiet kind of exciting.' },
  '#25002F': { name: 'Geist.',       description: 'The seductive creative energy — the one that makes beautiful things. Magic, channelled.' },
  '#160F30': { name: 'Disciplined.', description: 'The navy that shows up on time, keeps it minimal, never lets you down. Leadership you don\'t have to ask for.' },
}

const SWATCH_BORDER = 'inset 0 0 0 1px rgba(22,15,48,0.12)'

// --- components ---

function ColorSwatch({ color }: { color: string }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(color).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div
      className="relative flex-1 cursor-pointer group"
      style={{ backgroundColor: color, boxShadow: SWATCH_BORDER }}
      onClick={handleCopy}
    >
      <div className="absolute inset-0 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
        <span className="text-[10px] font-mono tracking-wide text-white bg-black/40 px-1.5 py-0.5 rounded">
          {color}
        </span>
      </div>
      {copied && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/25 pointer-events-none">
          <span className="text-[11px] font-mono tracking-wide text-white">Copied</span>
        </div>
      )}
    </div>
  )
}

function ShadeSwatch({ color, isBase = false }: { color: string; isBase?: boolean }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(color).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div
      className={`relative flex-1 cursor-pointer group rounded transition-all ${
        isBase ? 'h-14 z-10' : 'h-10'
      }`}
      style={{
        backgroundColor: color,
        boxShadow: isBase
          ? `0 0 0 2px rgba(22,15,48,0.22), ${SWATCH_BORDER}`
          : SWATCH_BORDER,
      }}
      onClick={handleCopy}
    >
      {isBase && (
        <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-mono text-[#160F30]/35 whitespace-nowrap pointer-events-none">
          Base
        </span>
      )}
      {isBase && (
        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-mono text-[#160F30]/25 whitespace-nowrap pointer-events-none">
          {color}
        </span>
      )}
      {!copied && (
        <div className="absolute inset-0 flex items-end justify-center pb-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
          <span className="text-[9px] font-mono text-white bg-black/50 px-1 py-0.5 rounded">
            {color}
          </span>
        </div>
      )}
      {copied && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded pointer-events-none">
          <span className="text-[9px] font-mono text-white">Copied</span>
        </div>
      )}
    </div>
  )
}

function ShadeRow({ baseColor }: { baseColor: string }) {
  const shades = generateShades(baseColor)
  return (
    <div className="flex items-center gap-0.5 pt-6 pb-6">
      {shades.map((shade, i) => (
        <ShadeSwatch key={i} color={shade} isBase={i === 5} />
      ))}
    </div>
  )
}

function GradientCard({ gradient }: { gradient: GradientDef }) {
  const [angle, setAngle] = useState(0)
  const [copied, setCopied] = useState(false)

  const cssGradient = `linear-gradient(${angle}deg, ${gradient.stops.join(', ')})`

  function handleRotate(e: React.MouseEvent) {
    e.stopPropagation()
    setAngle(a => (a + 90) % 360)
  }

  function handleCopy() {
    navigator.clipboard.writeText(cssGradient).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div
      className="relative aspect-[4/3] rounded-xl cursor-pointer group overflow-hidden"
      style={{ background: cssGradient }}
      onClick={handleCopy}
    >
      {/* gradient name on hover */}
      <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
        <span className="text-[11px] font-mono text-white/80 tracking-wide bg-black/30 px-2 py-1 rounded">
          {gradient.name}
        </span>
      </div>

      {/* rotate button */}
      <button
        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/30 flex items-center justify-center text-white/60 hover:text-white/90 hover:bg-black/50 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer text-base leading-none"
        onClick={handleRotate}
        title="Rotate gradient"
      >
        ↻
      </button>

      {/* copied feedback */}
      {copied && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
          <span className="text-[11px] font-mono text-white tracking-wide">Copied</span>
        </div>
      )}
    </div>
  )
}

function GradientSection({ colors }: { colors: string[] }) {
  const [activeColor, setActiveColor] = useState(colors[0])
  const gradients = generateGradients(activeColor)

  return (
    <div>
      {/* colour tabs */}
      <div className="flex gap-2 mb-8">
        {colors.map(color => (
          <button
            key={color}
            className={`w-8 h-8 rounded-lg cursor-pointer transition-all ${
              activeColor === color ? 'scale-110' : ''
            }`}
            style={{
              backgroundColor: color,
              boxShadow: activeColor === color
                ? `0 0 0 2px rgba(22,15,48,0.3), ${SWATCH_BORDER}`
                : SWATCH_BORDER,
            }}
            onClick={() => setActiveColor(color)}
            title={color}
          />
        ))}
      </div>

      {/* gradient grid — key on activeColor so angle state resets on tab switch */}
      <div key={activeColor} className="grid grid-cols-2 gap-4">
        {gradients.map(gradient => (
          <GradientCard
            key={`${activeColor}-${gradient.name}`}
            gradient={gradient}
          />
        ))}
      </div>
    </div>
  )
}

function SuitabilitySwatch({ color }: { color: string }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(color).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div
      className="relative w-8 h-8 rounded-lg flex-shrink-0 cursor-pointer"
      style={{ backgroundColor: color, boxShadow: SWATCH_BORDER }}
      onClick={handleCopy}
      title={`Copy ${color}`}
    >
      {copied && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg pointer-events-none">
          <span className="text-[11px] text-white">✓</span>
        </div>
      )}
    </div>
  )
}

function SuitabilitySection({ colors }: { colors: string[] }) {
  const entries = colors
    .map(color => ({ color, ...SUITABILITY[color.toUpperCase()] }))
    .filter(e => e.name)

  return (
    <div>
      <p className="text-[#160F30]/50 text-sm leading-relaxed mb-10">
        Every colour here carries a temperament.
      </p>
      <div className="flex flex-col gap-7">
        {entries.map(({ color, name, description }) => (
          <div key={color} className="flex items-start gap-4">
            <SuitabilitySwatch color={color} />
            <div className="flex flex-col gap-1 pt-0.5">
              <div className="flex items-baseline gap-2.5">
                <span className="text-[11px] font-mono text-[#160F30]/30 tracking-wide">{color.toUpperCase()}</span>
                <span className="text-sm text-[#160F30]/70 font-medium">{name}</span>
              </div>
              <p className="text-sm text-[#160F30]/45 leading-relaxed">{description}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-12 text-[#160F30]/45 text-sm leading-relaxed max-w-xl">
        Oxblood is made for a creative studio known by its work — quiet, deeply creative, but with that fire kept disciplined. Transparent, honest, considered. Not for everyone. For those with a premium eye.
      </p>
    </div>
  )
}

// --- page ---

export default function ItemDetail() {
  const { id } = useParams<{ id: string }>()
  const item = id ? getItemById(id) : undefined

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setPageMeta({
      title: item ? `${item.title} — Geistflow` : 'Geistflow',
      description: item ? item.description : 'A home for digital work made with care — brand, identity, and the systems beneath them.',
    })
  }, [id, item])

  if (!item) {
    return (
      <main className="px-6 py-16 max-w-6xl mx-auto">
        <Link
          to="/"
          className="text-[#160F30]/40 text-xs tracking-widest uppercase hover:text-[#25002F] transition-colors"
        >
          ← Collection
        </Link>
        <p className="text-[#160F30]/45 mt-16 text-sm">Item not found.</p>
      </main>
    )
  }

  const isPalette = item.category === 'Palettes' && !!item.colors?.length

  return (
    <main className="px-6 py-16 max-w-6xl mx-auto">
      <Link
        to="/"
        className="text-[#160F30]/40 text-xs tracking-widest uppercase hover:text-[#25002F] transition-colors"
      >
        ← Collection
      </Link>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {isPalette ? (
          <div>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] flex">
              {item.colors!.map((color) => (
                <ColorSwatch key={color} color={color} />
              ))}
            </div>
            <div className="flex mt-3">
              {item.colors!.map((color) => (
                <span key={color} className="flex-1 text-center text-[10px] text-[#160F30]/30 font-mono tracking-wide">
                  {color}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden aspect-[4/3]">
            <img
              src={`https://picsum.photos/seed/${item.id}/1200/900`}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex flex-col gap-6">
          <span className="text-[11px] text-[#160F30]/35 tracking-widest uppercase">
            {item.category}
          </span>
          <div>
            <h1 className="text-[#160F30] text-3xl font-medium tracking-tight leading-snug mb-4">
              {item.title}
            </h1>
            <p className="text-[#160F30]/55 text-base leading-relaxed">{item.description}</p>
          </div>
          <p className="text-[#160F30]/75 text-2xl font-medium">
            {item.price === 0 ? 'Free' : `$${item.price}`}
          </p>
        </div>
      </div>

      {isPalette && (
        <>
          <div className="mt-20">
            <p className="text-[#160F30]/30 text-xs tracking-[0.3em] uppercase mb-4">Shades</p>
            <div className="flex flex-col gap-8">
              {item.colors!.map((color) => (
                <ShadeRow key={color} baseColor={color} />
              ))}
            </div>
          </div>

          <div className="mt-20">
            <p className="text-[#160F30]/30 text-xs tracking-[0.3em] uppercase mb-8">Gradients</p>
            <GradientSection colors={item.colors!} />
          </div>

          <div className="mt-20">
            <p className="text-[#160F30]/30 text-xs tracking-[0.3em] uppercase mb-8">Suitability</p>
            <SuitabilitySection colors={item.colors!} />
          </div>
        </>
      )}
    </main>
  )
}
