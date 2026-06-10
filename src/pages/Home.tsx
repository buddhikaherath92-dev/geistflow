import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllItems, getCategories } from '../lib/storage'
import { setPageMeta } from '../lib/meta'
import ItemCard from '../components/ItemCard'

export default function Home() {
  const items = getAllItems()
  const categories = getCategories()
  const [active, setActive] = useState<string | null>(null)

  const featured = items[0]
  const filtered = active ? items.filter((item) => item.category === active) : items

  useEffect(() => {
    setPageMeta({
      title: 'Geistflow',
      description: 'A home for digital work made with care — brand, identity, and the systems beneath them.',
    })
  }, [])

  return (
    <main className="max-w-6xl mx-auto px-6">

      {/* Featured hero */}
      <Link
        to={`/item/${featured.id}`}
        className="group block py-12 md:py-16 border-b border-white/[0.06]"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

          {/* Text — stacks below image on mobile */}
          <div className="flex flex-col gap-8 md:gap-0 md:justify-between order-last md:order-first">
            <div>
              <h1 className="text-white/85 text-5xl md:text-7xl font-medium tracking-tighter leading-none mb-4">
                Geistflow
              </h1>
              <p className="text-white/35 text-base tracking-wide">
                A studio for considered digital work — brand, identity, and the systems beneath them.
              </p>
            </div>
            <div>
              <p className="text-[11px] text-white/25 tracking-widest uppercase mb-3">
                {featured.category} — Featured
              </p>
              <p className="text-white/65 text-2xl md:text-3xl font-medium tracking-tight leading-snug group-hover:text-white/85 transition-colors">
                {featured.title}
              </p>
            </div>
          </div>

          {/* Image — appears first on mobile */}
          <div className="aspect-[4/3] overflow-hidden rounded-2xl order-first md:order-last">
            <img
              src={`https://picsum.photos/seed/${featured.id}/1200/900`}
              alt={featured.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>

        </div>
      </Link>

      {/* Collection */}
      <section className="py-16">
        <header className="mb-10">
          <p className="text-white/25 text-xs tracking-[0.3em] uppercase mb-8">Collection</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActive(null)}
              className={`px-4 py-1.5 rounded-full text-xs tracking-wide transition-colors cursor-pointer ${
                active === null
                  ? 'bg-white/15 text-white/85'
                  : 'bg-white/5 text-white/35 hover:bg-white/10 hover:text-white/55'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-1.5 rounded-full text-xs tracking-wide transition-colors cursor-pointer ${
                  active === cat
                    ? 'bg-white/15 text-white/85'
                    : 'bg-white/5 text-white/35 hover:bg-white/10 hover:text-white/55'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>

    </main>
  )
}
