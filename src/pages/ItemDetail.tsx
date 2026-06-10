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

// Returns 11 values: 5 tints (lightest → least light), base, 5 shades (least dark → darkest)
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
      style={{ backgroundColor: color }}
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
        isBase ? 'h-14 ring-2 ring-white/40 z-10' : 'h-10'
      }`}
      style={{ backgroundColor: color }}
      onClick={handleCopy}
    >
      {isBase && (
        <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-mono text-white/35 whitespace-nowrap pointer-events-none">
          Base
        </span>
      )}
      <div className="absolute inset-0 flex items-end justify-center pb-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
        <span className="text-[9px] font-mono text-white bg-black/50 px-1 py-0.5 rounded">
          {color}
        </span>
      </div>
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
    <div>
      <span className="text-[10px] font-mono text-white/25 tracking-wide mb-4 block">
        {baseColor.toUpperCase()}
      </span>
      <div className="flex items-center gap-0.5 pt-6">
        {shades.map((shade, i) => (
          <ShadeSwatch key={i} color={shade} isBase={i === 5} />
        ))}
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-[9px] text-white/20 font-mono">← Lighter</span>
        <span className="text-[9px] text-white/20 font-mono">Darker →</span>
      </div>
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
          className="text-white/35 text-xs tracking-widest uppercase hover:text-white/60 transition-colors"
        >
          ← Collection
        </Link>
        <p className="text-white/40 mt-16 text-sm">Item not found.</p>
      </main>
    )
  }

  const isPalette = item.category === 'Palettes' && !!item.colors?.length

  return (
    <main className="px-6 py-16 max-w-6xl mx-auto">
      <Link
        to="/"
        className="text-white/35 text-xs tracking-widest uppercase hover:text-white/60 transition-colors"
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
                <span key={color} className="flex-1 text-center text-[10px] text-white/30 font-mono tracking-wide">
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
          <span className="text-[11px] text-white/35 tracking-widest uppercase">
            {item.category}
          </span>

          <div>
            <h1 className="text-white/85 text-3xl font-medium tracking-tight leading-snug mb-4">
              {item.title}
            </h1>
            <p className="text-white/50 text-base leading-relaxed">{item.description}</p>
          </div>

          <p className="text-white/80 text-2xl font-medium">
            {item.price === 0 ? 'Free' : `$${item.price}`}
          </p>
        </div>
      </div>

      {isPalette && (
        <div className="mt-20">
          <p className="text-white/25 text-xs tracking-[0.3em] uppercase mb-10">Shades</p>
          <div className="flex flex-col gap-12">
            {item.colors!.map((color) => (
              <ShadeRow key={color} baseColor={color} />
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
