import { useEffect } from 'react'
import { setPageMeta } from '../lib/meta'

export default function About() {
  useEffect(() => {
    setPageMeta({
      title: 'About — studio',
      description: 'We make things worth keeping. A small studio built around considered objects and slow craft.',
    })
  }, [])

  return (
    <main className="px-6 py-24 max-w-2xl mx-auto">
      <p className="text-white/25 text-xs tracking-[0.3em] uppercase mb-6">About</p>
      <h1 className="text-white/85 text-4xl md:text-5xl font-medium tracking-tighter leading-tight mb-16">
        We make things worth keeping.
      </h1>

      <div className="flex flex-col gap-8 text-white/50 text-base leading-relaxed">
        <p>
          Studio is a small, independent shop built around a simple idea: that the objects
          around us should be chosen with care. We source pieces from makers and craftspeople
          who work with natural materials, slow processes, and a long view — things that age
          well and earn their place.
        </p>
        <p>
          Every item in the collection is something we'd keep ourselves. There's no seasonal
          turnover, no trend chasing. The collection grows slowly, one considered addition at
          a time, and nothing leaves until we're sure it belongs.
        </p>
        <p>
          We're based in a small studio. Most days it's just us, a workbench, and a lot of
          coffee. If you have a question about anything in the collection, we're easy to reach
          and happy to talk.
        </p>
      </div>
    </main>
  )
}
