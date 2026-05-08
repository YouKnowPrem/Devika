import { client } from '../sanity/lib/client'
import { urlForImage } from '../sanity/lib/image'
import Link from 'next/link'

export const revalidate = 60

async function getPosts() {
  try {
    const query = `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      "excerpt": array::join(string::split((pt::text(body)), "")[0..100], "") + "..."
    }`
    return await client.fetch(query)
  } catch (e) {
    return []
  }
}

export default async function Home() {
  const posts = await getPosts()

  return (
    <main>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="animate-fade-up">
            Safeguarding <span>tangible</span> and <span>intangible</span> heritage through community <span>custodianship</span> and <span>youth</span> engagement.
          </h1>
          <div className="hero-buttons animate-fade-up animate-delay-1">
            <Link href="/map" className="btn btn-blue">Explore Map</Link>
            <Link href="/alerts" className="btn btn-red">Heritage Alerts</Link>
            <Link href="/story" className="btn btn-orange">Contribute Your Story</Link>
          </div>
        </div>
      </section>

      {/* MARQUEE SECTION */}
      <div className="marquee-container">
        <div className="marquee-content">
          {/* Duplicate content twice for smooth infinite scroll */}
          <span>✦ Upcoming Heritage Walk on 15th May</span>
          <span>✦ New Oral Histories Added</span>
          <span>✦ Report Heritage Threats Anonymously</span>
          <span>✦ Join the Youth Ambassador Program</span>
          <span>✦ Preserve Our Living Archive</span>
          <span>✦ Upcoming Heritage Walk on 15th May</span>
          <span>✦ New Oral Histories Added</span>
          <span>✦ Report Heritage Threats Anonymously</span>
          <span>✦ Join the Youth Ambassador Program</span>
          <span>✦ Preserve Our Living Archive</span>
        </div>
      </div>

      <div style={{ backgroundColor: '#DFD9C8', width: '100%' }}>
        {/* HIGHLIGHTS SECTION */}
        <section className="section" style={{ paddingBottom: '2rem' }}>
          <div className="section-header">
            <h2 className="section-title">Highlights from the Region</h2>
          </div>
          
          <div className="highlights-grid">
            <button className="arrow-btn">‹</button>
            
            <div className="highlight-card">
              <img src="https://images.unsplash.com/photo-1590302306716-e5c9f535d4ff?w=600&h=400&fit=crop" alt="Temple" className="highlight-img" />
              <div className="highlight-title">Old Temple Restoration</div>
            </div>
            
            <div className="highlight-card">
              <img src="https://images.unsplash.com/photo-1520698851897-4228965f3a09?w=600&h=400&fit=crop" alt="Sufi Songs" className="highlight-img" />
              <div className="highlight-title">Sufi Songs of Jammu</div>
            </div>

            <div className="highlight-card">
              <img src="https://images.unsplash.com/photo-1533222481259-ce20eda1e20b?w=600&h=400&fit=crop" alt="Youth" className="highlight-img" />
              <div className="highlight-title">Young Heritage Ambassadors</div>
            </div>

            <button className="arrow-btn">›</button>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Link href="/highlights" className="btn btn-green">Discover More ▾</Link>
          </div>
        </section>
      </div>

      <div className="section">
        <div className="grid-2">
          {/* MAP SECTION */}
          <div>
            <div className="section-header" style={{ justifyContent: 'flex-start' }}>
              <h2 className="section-title">Heritage Map of Jammu</h2>
            </div>
            <div className="map-container">
              <img src="/map_bg.png" alt="Heritage Map" className="map-img animate-float" />
              <Link href="/map" className="btn btn-blue">View Full Map</Link>
            </div>
          </div>

          {/* YOUTH SPOTLIGHT */}
          <div>
            <div className="section-header" style={{ justifyContent: 'flex-start' }}>
              <h2 className="section-title">Youth Spotlight</h2>
            </div>
            <div className="spotlight-grid">
              <div className="spotlight-card">
                <img src="https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?w=400&h=300&fit=crop" alt="Student" />
                <h4>Student Projects</h4>
                <Link href="/projects" className="btn btn-purple" style={{ display: 'block', width: '100%', padding: '0.5rem' }}>Learn More ▾</Link>
              </div>
              <div className="spotlight-card">
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=300&fit=crop" alt="Youth" />
                <h4>Joint Heritage Up</h4>
                <Link href="/heritage-up" className="btn btn-purple" style={{ display: 'block', width: '100%', padding: '0.5rem' }}>Learn More ▾</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section" style={{ paddingTop: 0 }}>
        <div className="grid-2">
          {/* COMMUNITY VOICES */}
          <div>
            <div className="section-header" style={{ justifyContent: 'flex-start' }}>
              <h2 className="section-title">Community Voices</h2>
            </div>
            <div className="map-container" style={{ padding: '0' }}>
              <div className="voices-list" style={{ width: '100%', gap: 0 }}>
                <div className="voice-card">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" alt="Avatar" className="voice-avatar" />
                  <div className="voice-info" style={{ flex: 1 }}>
                    <h4>Oral Histories</h4>
                    <Link href="/voices/1" className="btn btn-blue" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Listen / Read More ▾</Link>
                  </div>
                </div>
                <div className="voice-card" style={{ borderBottom: 'none' }}>
                  <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop" alt="Avatar" className="voice-avatar" />
                  <div className="voice-info" style={{ flex: 1 }}>
                    <h4>Traditional Songs</h4>
                    <Link href="/voices/2" className="btn btn-blue" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Listen / Read More ▾</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* YOUTH EVENTS */}
          <div>
            <div className="section-header" style={{ justifyContent: 'flex-start' }}>
              <h2 className="section-title">Youth Events</h2>
            </div>
            <div className="events-grid">
              <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=300&h=200&fit=crop" alt="Event" />
              <img src="https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=300&h=200&fit=crop" alt="Event" />
              <img src="https://images.unsplash.com/photo-1523580494112-071d3121405e?w=300&h=200&fit=crop" alt="Event" />
            </div>
            <div style={{ textAlign: 'center' }}>
              <Link href="/report" className="btn btn-red" style={{ padding: '0.75rem 3rem' }}>⚠ Report a Heritage Threat</Link>
            </div>
          </div>
        </div>
      </div>

      {/* UPCOMING EVENTS */}
      <div className="upcoming-section">
        <div className="upcoming-container">
          <h3 className="upcoming-header">Upcoming Events ›</h3>
          <div className="upcoming-tags">
            <div className="event-tag">
              <span style={{ fontSize: '1.2rem' }}>🗓</span> Folk Dance Workshop
            </div>
            <div className="event-tag" style={{ border: 'none', background: 'transparent', padding: '0.5rem 0' }}>
              <Link href="/events" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ borderBottom: '2px solid var(--text-primary)', fontWeight: 700 }}>15</span> View All Events
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
