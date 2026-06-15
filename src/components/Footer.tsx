import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-[#160F30]/[0.07] px-6 h-14 flex items-center justify-between">
      <span className="text-[#160F30]/25 text-xs">© {new Date().getFullYear()} Geistflow</span>
      <nav className="flex gap-6">
        <Link
          to="/about"
          className="text-[#160F30]/35 text-xs hover:text-[#160F30]/55 transition-colors"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="text-[#160F30]/35 text-xs hover:text-[#160F30]/55 transition-colors"
        >
          Contact
        </Link>
      </nav>
    </footer>
  )
}
