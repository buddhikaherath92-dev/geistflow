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
      <p className="text-[#160F30]/30 text-xs tracking-[0.3em] uppercase mb-6">Contact</p>
      <h1 className="text-[#160F30] text-4xl md:text-5xl font-medium tracking-tighter leading-tight mb-6">
        Get in touch.
      </h1>
      <p className="text-[#160F30]/45 text-base mb-16">
        For any enquiry — work, questions, or anything else — reach out by email.
      </p>
      <a
        href="mailto:bpherathwork@gmail.com"
        className="text-[#25002F]/80 text-base hover:text-[#25002F] transition-colors"
      >
        bpherathwork@gmail.com
      </a>
    </main>
  )
}
