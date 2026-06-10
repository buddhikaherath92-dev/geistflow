import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getItemById } from '../lib/storage'
import { setPageMeta } from '../lib/meta'

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
      {/* hex label on hover */}
      <div className="absolute inset-0 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
        <span className="text-[10px] font-mono tracking-wide text-white bg-black/40 px-1.5 py-0.5 rounded">
          {color}
        </span>
      </div>
      {/* copied feedback */}
      {copied && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/25 pointer-events-none">
          <span className="text-[11px] font-mono tracking-wide text-white">Copied</span>
        </div>
      )}
    </div>
  )
}

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

  return (
    <main className="px-6 py-16 max-w-6xl mx-auto">
      <Link
        to="/"
        className="text-white/35 text-xs tracking-widest uppercase hover:text-white/60 transition-colors"
      >
        ← Collection
      </Link>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {item.category === 'Palettes' && item.colors?.length ? (
          <div>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] flex">
              {item.colors.map((color) => (
                <ColorSwatch key={color} color={color} />
              ))}
            </div>
            <div className="flex mt-3">
              {item.colors.map((color) => (
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
    </main>
  )
}
