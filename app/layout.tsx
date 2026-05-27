import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Devika Project - A Living Archive',
  description: 'Safeguarding tangible and intangible heritage through community custodianship and youth engagement.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <nav className="navbar">
          <div className="nav-container">
            <div className="nav-logo">
              <Link href="/" className="nav-logo-link">
                <img src="/logo.png" alt="Devika Logo" className="nav-logo-img" />
                <div className="nav-logo-text">
                  Devika Project <span className="nav-logo-sub">– A Living Archive</span>
                </div>
              </Link>
            </div>
            <div className="nav-links">
              <Link href="/">Home</Link>
              <Link href="/sites">Explore Sites</Link>
              <Link href="/map">Map</Link>
              <Link href="/inventory">Inventory</Link>
              <Link href="/voices">Voices</Link>
              <Link href="/policy">Policy</Link>
              <Link href="/events">Events</Link>
              <Link href="/about">About</Link>
              <Link href="/blog">Blog</Link>
            </div>
            <div className="nav-lang">
              <button className="lang-btn active">EN</button>
              <button className="lang-btn hindi">हिन्दी</button>
            </div>
          </div>
        </nav>
        {children}
        <footer className="footer" style={{ flexDirection: 'column', gap: '1rem', padding: '2rem 2rem 1rem 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
            <div className="footer-links">
              <Link href="/contact">✉ Contact Us</Link>
              <span className="divider">|</span>
              <Link href="/collaborate">🤝 Collaborate</Link>
              <span className="divider">|</span>
              <Link href="/guidelines">🏛 UNESCO Guidelines</Link>
            </div>
            <div className="footer-socials">
              <Link href="#">f</Link>
              <Link href="#">t</Link>
              <Link href="#">✉</Link>
            </div>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', width: '100%' }}>
            © 2026 All rights reserved. | Made with 💖 | By <Link href="https://webitup24.com" target="_blank" rel="noopener noreferrer" className="footer-credit">WebItUp24</Link>
          </div>
        </footer>
      </body>
    </html>
  )
}
