import { Link } from 'react-router-dom'
import type { Item } from '../lib/types'

interface Props {
  item: Item
}

export default function ItemCard({ item }: Props) {
  return (
    <Link
      to={`/item/${item.id}`}
      className="block h-full group -translate-y-0 hover:-translate-y-1 transition-transform duration-300"
    >
      <article className="h-full flex flex-col bg-white/5 rounded-2xl overflow-hidden transition-colors hover:bg-white/[0.08]">
        <div className="aspect-[4/3] overflow-hidden shrink-0">
          {item.category === 'Palettes' && item.colors?.length ? (
            <div className="flex h-full w-full">
              {item.colors.map((color) => (
                <div key={color} className="flex-1 h-full" style={{ backgroundColor: color }} />
              ))}
            </div>
          ) : (
            <img
              src={`https://picsum.photos/seed/${item.id}/800/600`}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>
        <div className="p-5 flex flex-col gap-3 flex-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-white/35 tracking-widest uppercase">
              {item.category}
            </span>
            <span className="text-white/75 text-sm font-medium">
              {item.price === 0 ? 'Free' : `$${item.price}`}
            </span>
          </div>
          <div>
            <h2 className="text-white/85 font-medium text-base leading-snug mb-1 line-clamp-1">
              {item.title}
            </h2>
            <p className="text-white/40 text-sm leading-relaxed line-clamp-2">{item.description}</p>
          </div>
        </div>
      </article>
    </Link>
  )
}
