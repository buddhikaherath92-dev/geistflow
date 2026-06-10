import { useEffect } from 'react'
import { setPageMeta } from '../lib/meta'

export default function Contact() {
  useEffect(() => {
    setPageMeta({
      title: 'Contact — Geistflow',
      description: 'Get in touch by email.',
    })
  }, [])

  return (
    <main className="px-6 py-24 max-w-2xl mx-auto">
      <p className="text-white/25 text-xs tracking-[0.3em] uppercase mb-6">Contact</p>
      <h1 className="text-white/85 text-4xl md:text-5xl font-medium tracking-tighter leading-tight mb-6">
        Get in touch.
      </h1>
      <p className="text-white/40 text-base mb-16">
        For any enquiry — work, questions, or anything else — reach out by email.
      </p>
      <a
        href="mailto:bpherathwork@gmail.com"
        className="text-white/70 text-base hover:text-white/90 transition-colors"
      >
        bpherathwork@gmail.com
      </a>
    </main>
  )
}
