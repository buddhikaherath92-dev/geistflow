import { useEffect, useState } from 'react'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  useEffect(() => {
    document.title = 'Contact — studio'
  }, [])

  function handleSend() {
    if (!name.trim() || !email.trim() || !message.trim()) return
    setSent(true)
  }

  const inputClass =
    'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/75 text-sm placeholder:text-white/20 focus:outline-none focus:border-white/25 transition-colors'

  return (
    <main className="px-6 py-24 max-w-2xl mx-auto">
      <p className="text-white/25 text-xs tracking-[0.3em] uppercase mb-6">Contact</p>
      <h1 className="text-white/85 text-4xl md:text-5xl font-medium tracking-tighter leading-tight mb-6">
        Get in touch.
      </h1>
      <p className="text-white/40 text-base mb-16">
        A question about an item, a wholesale inquiry, or just to say hello — we read everything.
      </p>

      {sent ? (
        <p className="text-white/50 text-base">Thanks, we'll be in touch.</p>
      ) : (
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className={`${inputClass} resize-none`}
          />
          <button
            onClick={handleSend}
            className="self-start mt-2 px-6 py-2.5 bg-white/10 text-white/70 text-sm rounded-xl hover:bg-white/15 hover:text-white/85 transition-colors cursor-pointer"
          >
            Send
          </button>
        </div>
      )}
    </main>
  )
}
