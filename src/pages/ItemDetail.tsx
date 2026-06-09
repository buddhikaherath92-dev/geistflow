import { useParams, Link } from 'react-router-dom'
import { getItemById } from '../lib/storage'

export default function ItemDetail() {
  const { id } = useParams<{ id: string }>()
  const item = id ? getItemById(id) : undefined

  if (!item) {
    return (
      <main className="min-h-screen px-6 py-16 max-w-6xl mx-auto">
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
    <main className="min-h-screen px-6 py-16 max-w-6xl mx-auto">
      <Link
        to="/"
        className="text-white/35 text-xs tracking-widest uppercase hover:text-white/60 transition-colors"
      >
        ← Collection
      </Link>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="rounded-2xl overflow-hidden aspect-[4/3]">
          <img
            src={`https://picsum.photos/seed/${item.id}/1200/900`}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-white/35 tracking-widest uppercase">
              {item.category}
            </span>
          </div>

          <div>
            <h1 className="text-white/85 text-3xl font-medium tracking-tight leading-snug mb-4">
              {item.title}
            </h1>
            <p className="text-white/50 text-base leading-relaxed">{item.description}</p>
          </div>

          <p className="text-white/80 text-2xl font-medium">${item.price}</p>
        </div>
      </div>
    </main>
  )
}
