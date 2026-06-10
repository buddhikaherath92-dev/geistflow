import { useEffect } from 'react'
import { setPageMeta } from '../lib/meta'

export default function About() {
  useEffect(() => {
    setPageMeta({
      title: 'About — Geistflow',
      description: 'Geistflow is a home for digital work made with care — brand, identity, and the systems beneath them.',
    })
  }, [])

  return (
    <main className="px-6 py-24 max-w-2xl mx-auto">
      <p className="text-white/25 text-xs tracking-[0.3em] uppercase mb-6">About</p>
      <h1 className="text-white/85 text-4xl md:text-5xl font-medium tracking-tighter leading-tight mb-16">
        Geistflow
      </h1>

      <div className="flex flex-col gap-8 text-white/50 text-base leading-relaxed">
        <p>
          Geistflow is a home for digital work made with care — brand, identity, and the systems
          beneath them. Every piece here carries a particular spirit: considered, intentional,
          made to arrive whole.
        </p>
        <p>
          Behind it is one person who wanted to do this work fully — without limitation, without
          restriction, on his own terms. Geistflow is that work, as it arrives.
        </p>
      </div>
    </main>
  )
}
