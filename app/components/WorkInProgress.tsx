import Link from 'next/link'

interface WorkInProgressProps {
  pageName: string;
  iconType: 'map' | 'book' | 'audio' | 'policy' | 'calendar' | 'about';
}

export default function WorkInProgress({ pageName, iconType }: WorkInProgressProps) {
  // SVG Icon definitions
  const getIcon = () => {
    switch (iconType) {
      case 'map':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="animate-float" style={{ width: '80px', height: '80px', color: 'var(--accent-blue)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
          </svg>
        )
      case 'book':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="animate-float" style={{ width: '80px', height: '80px', color: 'var(--accent-orange)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
        )
      case 'audio':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="animate-float" style={{ width: '80px', height: '80px', color: 'var(--accent-purple)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
          </svg>
        )
      case 'policy':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="animate-float" style={{ width: '80px', height: '80px', color: 'var(--accent-green)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.377 12.408l-4.103-2.052a.6.6 0 01-.335-.536V6.142c0-.3.19-.57.48-.646l4.103-1.026c.214-.054.432.1.488.314l1.026 4.103a.6.6 0 01-.336.682l-4.103 2.051a.6.6 0 01-.682-.335L4.475 7.18" />
          </svg>
        )
      case 'calendar':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="animate-float" style={{ width: '80px', height: '80px', color: 'var(--accent-red)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
          </svg>
        )
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="animate-float" style={{ width: '80px', height: '80px', color: 'var(--text-secondary)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 111.083 1.083l-.041.02a.75.75 0 01-1.082-1.083zM12 21.75a9.75 9.75 0 100-19.5 9.75 9.75 0 000 19.5z" />
          </svg>
        )
    }
  }

  return (
    <div
      className="blog-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '8rem 2rem',
        minHeight: '60vh'
      }}
    >
      {/* Dynamic Visual Curator Icon */}
      <div style={{ marginBottom: '2.5rem' }}>
        {getIcon()}
      </div>

      {/* Main Announcement Headers */}
      <h1 className="animate-fade-up" style={{ fontSize: '2.8rem', marginBottom: '1.5rem', fontFamily: 'var(--font-playfair), serif' }}>
        {pageName} Archive
      </h1>

      <h3 className="animate-fade-up animate-delay-1" style={{ color: 'var(--accent-red)', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: '1.5rem' }}>
        ⚠️ Website work under process
      </h3>

      <p className="animate-fade-up animate-delay-2" style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', lineHeight: '1.7', marginBottom: '3rem' }}>
        Our youth ambassadors and local community curators are gathering cultural artifacts, historical records, 
        and oral histories from districts across Jammu and Kashmir. This section is currently under active curation.
      </p>

      {/* Back to active paths */}
      <div className="animate-fade-up animate-delay-2">
        <Link href="/sites" className="btn btn-blue" style={{ padding: '0.85rem 2.5rem' }}>
          Explore Existing Sites
        </Link>
      </div>
    </div>
  )
}
