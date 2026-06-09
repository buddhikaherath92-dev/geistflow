import { getAllItems } from '../lib/storage'
import ItemCard from '../components/ItemCard'

export default function Home() {
  const items = getAllItems()

  return (
    <main className="px-6 py-16 max-w-6xl mx-auto">
      <header className="mb-12">
        <p className="text-white/25 text-xs tracking-[0.3em] uppercase mb-3">studio</p>
        <h1 className="text-white/80 text-3xl font-medium tracking-tight">Collection</h1>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  )
}
