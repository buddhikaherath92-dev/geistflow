import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllItems, getCategories } from '../lib/storage'
import { setPageMeta } from '../lib/meta'
import ItemCard from '../components/ItemCard'

// ─── Text shadow styles ───────────────────────────────────────────────────────

const textShadow = {
  title: `
    0 0   5px rgba(255,249,247,0.50),
    0 0  22px rgba(37,0,47,0.58),
    0 0  58px rgba(37,0,47,0.28),
    0 0 110px rgba(58,0,0,0.18),
    0 2px  6px rgba(0,0,0,0.42)
  `,
  description: `
    0 0  4px rgba(255,249,247,0.28),
    0 0 14px rgba(37,0,47,0.38),
    0 0 34px rgba(37,0,47,0.14),
    0 1px 3px rgba(0,0,0,0.32)
  `,
  featuredTitle: `
    0 0  4px rgba(255,249,247,0.36),
    0 0 18px rgba(37,0,47,0.50),
    0 0 46px rgba(37,0,47,0.20),
    0 0 80px rgba(58,0,0,0.14),
    0 1px 4px rgba(0,0,0,0.38)
  `,
}

// ─── Filter button className ──────────────────────────────────────────────────

const filterBtnClass = (selected: boolean) =>
  `px-4 py-1.5 rounded-full text-xs tracking-wide transition-colors cursor-pointer ${
    selected
      ? 'bg-[#3A0000]/[0.1] text-[#3A0000]'
      : 'bg-[#160F30]/[0.04] text-[#160F30]/40 hover:bg-[#160F30]/[0.08] hover:text-[#160F30]/60'
  }`

// ─── Component ───────────────────────────────────────────────────────────────

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
    <main>

      {/* ── Hero ── */}
      <div className="relative overflow-hidden">

        {/* Hero gradient */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(120deg, #25002F 0%, #160F30 35%, #3A0000 70%, #190000 100%)' }}
        />

        <div className="relative max-w-6xl mx-auto px-6">
          <Link
            to={`/item/${featured.id}`}
            className="group block py-12 md:py-16 border-b border-[#FFF9F7]/[0.12]"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

              {/* Text column */}
              <div className="flex flex-col gap-8 md:gap-0 md:justify-between order-last md:order-first">

                <div>
                  <h1
                    className="text-[#FFF9F7] text-5xl md:text-7xl font-medium tracking-tighter leading-none mb-4"
                    style={{ textShadow: textShadow.title }}
                  >
                    Geistflow
                  </h1>
                  <p
                    className="text-[#FFF9F7]/62 text-base tracking-wide"
                    style={{ textShadow: textShadow.description }}
                  >
                    A studio for considered digital work — brand, identity, and the systems beneath them.
                  </p>
                </div>

                <div>
                  {/* Flow line */}
                  <div
                    className="w-full mb-4"
                    style={{
                      height: '1.5px',
                      background: 'linear-gradient(to right, rgba(255,249,247,0.65) 0%, rgba(255,249,247,0.40) 40%, rgba(255,249,247,0.12) 72%, transparent 100%)',
                    }}
                  />
                  <p className="text-[11px] text-[#FFF9F7]/35 tracking-widest uppercase mb-3">
                    {featured.category} — Featured
                  </p>
                  <p
                    className="text-[#FFF9F7]/80 text-2xl md:text-3xl font-medium tracking-tight leading-snug group-hover:text-[#FFF9F7] transition-colors"
                    style={{ textShadow: textShadow.featuredTitle }}
                  >
                    {featured.title}
                  </p>
                </div>

              </div>

              {/* Palette swatches */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl order-first md:order-last">
                {featured.category === 'Palettes' && featured.colors?.length ? (
                  <div className="flex h-full w-full">
                    {featured.colors.flatMap((color, i) => {
                      const swatch = <div key={color} className="flex-1 h-full" style={{ backgroundColor: color }} />
                      if (i === featured.colors!.length - 1) return [swatch]
                      return [
                        swatch,
                        <div
                          key={`sep-${i}`}
                          className="h-full flex-shrink-0"
                          style={{
                            width: '1px',
                            background: 'linear-gradient(to bottom, transparent, rgba(255,249,247,0.10) 40%, rgba(255,249,247,0.10) 60%, transparent)',
                          }}
                        />,
                      ]
                    })}
                  </div>
                ) : (
                  <img
                    src={`https://picsum.photos/seed/${featured.id}/1200/900`}
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                )}
                {/* Inset shadow — swatches sit inside the gradient */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-2xl"
                  style={{
                    boxShadow: 'inset 0 4px 16px rgba(0,0,0,0.30), inset 0 -2px 10px rgba(0,0,0,0.18), inset 3px 0 12px rgba(0,0,0,0.22), inset -3px 0 12px rgba(0,0,0,0.22)',
                  }}
                />
              </div>

            </div>
          </Link>
        </div>
      </div>

      {/* ── Collection ── */}
      <div className="max-w-6xl mx-auto px-6">
        <section className="py-16">
          <header className="mb-10">
            <p className="text-[#160F30]/30 text-xs tracking-[0.3em] uppercase mb-8">Collection</p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setActive(null)} className={filterBtnClass(active === null)}>
                All
              </button>
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActive(cat)} className={filterBtnClass(active === cat)}>
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
      </div>

    </main>
  )
}
