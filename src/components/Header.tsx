import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="border-b border-white/[0.06] px-6 h-14 flex items-center">
      <Link
        to="/"
        className="text-white/50 text-xs tracking-[0.3em] uppercase hover:text-white/75 transition-colors"
      >
        Geistflow
      </Link>
    </header>
  )
}
