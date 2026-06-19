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
      <article className="h-full flex flex-col bg-[#FFF9F7] rounded-2xl overflow-hidden hover:bg-[#F8F1EF] shadow-[0_8px_36px_rgba(58,0,0,0.10),0_2px_8px_rgba(58,0,0,0.07),inset_0_1px_0_rgba(255,249,247,0.18)] hover:shadow-[0_16px_56px_rgba(58,0,0,0.17),0_4px_14px_rgba(58,0,0,0.10),inset_0_1px_0_rgba(255,249,247,0.18)] [transition:background-color_150ms_ease,box-shadow_280ms_ease]">
        <div className="relative aspect-[4/3] overflow-hidden shrink-0">
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
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: [
                'inset 0 3px 8px -1px rgba(58,0,0,0.34)',    // top
                'inset 3px 0 8px -1px rgba(58,0,0,0.34)',    // left
                'inset -3px 0 8px -1px rgba(58,0,0,0.34)',   // right
                'inset 0 30px 26px -18px rgba(58,0,0,0.10)', // top soft fade
                'inset 30px 0 26px -18px rgba(58,0,0,0.10)', // left soft fade
                'inset -30px 0 26px -18px rgba(58,0,0,0.10)', // right soft fade
              ].join(', '),
            }}
          />
        </div>
        <div className="p-5 flex flex-col gap-3 flex-1 bg-[#3A0000]/[0.08]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#3A0000]/65 tracking-widest uppercase">
              {item.category}
            </span>
            <span className="text-[#3A0000]/80 text-sm font-medium">
              {item.price === 0 ? 'Free' : `$${item.price}`}
            </span>
          </div>
          <div>
            <h2 className="text-[#190000] font-medium text-base leading-snug mb-1 line-clamp-1">
              {item.title}
            </h2>
            <p className="text-[#190000]/70 text-sm leading-relaxed line-clamp-2">{item.description}</p>
          </div>
        </div>
      </article>
    </Link>
  )
}
