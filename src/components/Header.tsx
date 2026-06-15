import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="border-b border-[#160F30]/[0.07] px-6 h-14 flex items-center">
      <Link
        to="/"
        className="text-[#160F30]/45 text-xs tracking-[0.3em] uppercase hover:text-[#160F30]/70 transition-colors"
      >
        Geistflow
      </Link>
    </header>
  )
}
