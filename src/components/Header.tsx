import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="relative bg-[#25002F] px-6 h-14 flex items-center">
      <Link
        to="/"
        className="text-[#FFF9F7]/55 text-xs tracking-[0.3em] uppercase hover:text-[#FFF9F7]/80 transition-colors"
      >
        Geistflow
      </Link>
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent 0%, rgba(255,249,247,0.38) 25%, rgba(255,249,247,0.55) 50%, rgba(255,249,247,0.38) 75%, transparent 100%)',
        }}
      />
    </header>
  )
}
