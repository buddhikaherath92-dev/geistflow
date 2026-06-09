export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-6 h-14 flex items-center justify-between">
      <span className="text-white/20 text-xs">© {new Date().getFullYear()} Studio</span>
      <nav className="flex gap-6">
        <span className="text-white/25 text-xs hover:text-white/50 transition-colors cursor-pointer">
          About
        </span>
        <span className="text-white/25 text-xs hover:text-white/50 transition-colors cursor-pointer">
          Contact
        </span>
      </nav>
    </footer>
  )
}
