import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-6 h-14 flex items-center justify-between">
      <span className="text-white/20 text-xs">© {new Date().getFullYear()} Geistflow</span>
      <nav className="flex gap-6">
        <Link
          to="/about"
          className="text-white/25 text-xs hover:text-white/50 transition-colors"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="text-white/25 text-xs hover:text-white/50 transition-colors"
        >
          Contact
        </Link>
      </nav>
    </footer>
  )
}
