import { useState } from 'react'
import { getAllItems, getCategories } from '../lib/storage'
import ItemCard from '../components/ItemCard'

export default function Home() {
  const items = getAllItems()
  const categories = getCategories()
  const [active, setActive] = useState<string | null>(null)

  const filtered = active ? items.filter((item) => item.category === active) : items

  return (
    <main className="px-6 py-16 max-w-6xl mx-auto">
      <header className="mb-10">
        <p className="text-white/25 text-xs tracking-[0.3em] uppercase mb-3">studio</p>
        <h1 className="text-white/80 text-3xl font-medium tracking-tight">Collection</h1>
      </header>

      <div className="flex flex-wrap gap-2 mb-10">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  )
}
