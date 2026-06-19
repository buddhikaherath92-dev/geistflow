import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: '#160F30' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Geistflow Radio */}
        <div className="mb-12">
          <p className="text-[#FFF9F7]/30 text-[10px] tracking-[0.3em] uppercase mb-4">
            Geistflow Radio
          </p>
          <iframe
            style={{ borderRadius: '12px', display: 'block' }}
            src="https://open.spotify.com/embed/playlist/5DKhvXP1ZvWpH8VbNq1OSx?utm_source=generator"
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>

        {/* Divider */}
        <div
          className="mb-8"
          style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(255,249,247,0.10) 30%, rgba(255,249,247,0.10) 70%, transparent)',
          }}
        />

        {/* Nav + Copyright */}
        <div className="flex items-center justify-between mb-8">
          <nav className="flex gap-6">
            <Link
              to="/about"
              className="text-[#FFF9F7]/40 text-xs tracking-wide hover:text-[#FFF9F7]/65 transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-[#FFF9F7]/40 text-xs tracking-wide hover:text-[#FFF9F7]/65 transition-colors"
            >
              Contact
            </Link>
          </nav>
          <span className="text-[#FFF9F7]/25 text-xs">© 2026 Geistflow</span>
        </div>

        {/* Signature */}
        <p className="text-[#FFF9F7]/20 text-[10px] tracking-wide">
          by{' '}
          <a
            href="https://github.com/buddhikaherath92-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FFF9F7]/40 transition-colors underline underline-offset-2 decoration-[#FFF9F7]/20"
          >
            B.P. Herath
          </a>
          {', '}built in partnership with{' '}
          <a
            href="https://claude.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FFF9F7]/40 transition-colors underline underline-offset-2 decoration-[#FFF9F7]/20"
          >
            Claude
          </a>
        </p>

      </div>
    </footer>
  )
}
