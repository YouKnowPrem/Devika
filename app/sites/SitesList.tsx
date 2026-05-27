'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { urlForImage } from '../../sanity/lib/image'

interface HeritageSite {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: any;
  publishedAt?: string;
  region?: string;
  district?: string;
  era?: string;
  significance?: string;
  locationDetails?: string;
  tags?: string[];
}

interface SitesListProps {
  sites: HeritageSite[];
}

// Districts mapped by Region for hierarchical filtering
const REGION_DISTRICTS: Record<string, string[]> = {
  Jammu: ['Jammu', 'Samba', 'Kathua', 'Udhampur', 'Reasi', 'Rajouri', 'Poonch', 'Ramban', 'Doda', 'Kishtwar'],
  Kashmir: ['Srinagar', 'Budgam', 'Ganderbal', 'Anantnag', 'Pulwama', 'Shopian', 'Kulgam', 'Baramulla', 'Kupwara', 'Bandipora'],
  Ladakh: ['Leh', 'Kargil']
}

export default function SitesList({ sites = [] }: SitesListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('All')
  const [selectedDistrict, setSelectedDistrict] = useState('All')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // 1. Dynamic District list based on selected Region
  const availableDistricts = useMemo(() => {
    if (selectedRegion === 'All') {
      return Object.values(REGION_DISTRICTS).flat().sort()
    }
    return REGION_DISTRICTS[selectedRegion] || []
  }, [selectedRegion])

  // Extract all unique tags
  const allTags = useMemo(() => {
    return Array.from(
      new Set(
        sites
          .flatMap((site) => site.tags || [])
          .filter((tag) => typeof tag === 'string' && tag.trim() !== '')
      )
    ).sort()
  }, [sites])

  // Filter sites
  const filteredSites = sites.filter((site) => {
    // A. Region filter
    if (selectedRegion !== 'All') {
      if (!site.region || site.region.toLowerCase() !== selectedRegion.toLowerCase()) {
        return false
      }
    }

    // B. District filter
    if (selectedDistrict !== 'All') {
      if (!site.district || site.district.toLowerCase() !== selectedDistrict.toLowerCase()) {
        return false
      }
    }

    // C. Tag filter
    if (selectedTag) {
      if (!site.tags || !site.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase())) {
        return false
      }
    }

    // D. Text Search query matching (name, era, district, specific location, tags)
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim()
      const matchesTitle = site.title?.toLowerCase().includes(query)
      const matchesEra = site.era?.toLowerCase().includes(query)
      const matchesDistrict = site.district?.toLowerCase().includes(query)
      const matchesLocation = site.locationDetails?.toLowerCase().includes(query)
      const matchesSignificance = site.significance?.toLowerCase().includes(query)
      const matchesTags = site.tags?.some(tag => tag.toLowerCase().includes(query))

      return matchesTitle || matchesEra || matchesDistrict || matchesLocation || matchesSignificance || matchesTags
    }

    return true
  })

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedRegion('All')
    setSelectedDistrict('All')
    setSelectedTag(null)
  }

  return (
    <div className="blog-container">
      {/* HEADER */}
      <header className="blog-header animate-fade-up">
        <h1>Historical & Cultural Sites</h1>
        <p>
          Explore the tangible heritage, ancient temples, shrines, and monuments 
          scattered across the districts of Jammu, Kashmir, and Ladakh.
        </p>
      </header>

      {/* FILTER DASHBOARD */}
      <section className="search-filter-wrapper animate-fade-up animate-delay-1">
        {/* Real-time search */}
        <div className="search-box-container">
          <svg
            className="search-icon-svg"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z"
            />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search sites by name, dynasty, era, location or history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Dynamic Regional / District Dropdowns */}
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          
          {/* Region Tabs */}
          <div className="filter-section" style={{ flexGrow: 1 }}>
            <span className="filter-label">Filter by Region</span>
            <div className="region-buttons">
              {['All', 'Jammu', 'Kashmir', 'Ladakh'].map((region) => (
                <button
                  key={region}
                  className={`region-btn ${selectedRegion === region ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedRegion(region)
                    setSelectedDistrict('All') // Reset district choice when region shifts
                  }}
                >
                  {region === 'All' ? '✦ All Regions' : region}
                </button>
              ))}
            </div>
          </div>

          {/* Smart District Dropdown */}
          <div className="filter-section">
            <span className="filter-label">Select District ({selectedRegion === 'All' ? 'J&K' : selectedRegion})</span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="wiki-select"
            >
              <option value="All">✦ All Districts</option>
              {availableDistricts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Categories / Tag filters */}
        {allTags.length > 0 && (
          <div className="filter-section">
            <span className="filter-label">Filter by Categories</span>
            <div className="tag-filters">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  className={`tag-badge-btn ${selectedTag === tag ? 'active' : ''}`}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Clear filters utility */}
        {(searchQuery || selectedRegion !== 'All' || selectedDistrict !== 'All' || selectedTag) && (
          <div style={{ alignSelf: 'flex-end' }}>
            <button
              onClick={handleClearFilters}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--accent-red)',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </section>

      {/* SITES GRID */}
      <section className="animate-fade-up animate-delay-2">
        {filteredSites.length === 0 ? (
          <div className="no-results">
            <h3>No Heritage Sites Found</h3>
            <p>
              We couldn't find any historical sites matching your regional or text filters. 
              Try resetting the active selections or select a different district.
            </p>
            <button
              onClick={handleClearFilters}
              className="btn btn-blue"
              style={{ marginTop: '1.5rem', padding: '0.5rem 1.5rem', fontSize: '0.85rem' }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="blog-grid">
            {filteredSites.map((site) => {
              const imageSrc = site.mainImage ? urlForImage(site.mainImage)?.url() : null
              
              return (
                <article key={site._id} className="blog-card">
                  <div className="blog-card-img-wrapper">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={site.title}
                        className="blog-card-img"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--text-secondary)',
                          fontSize: '0.9rem',
                          fontStyle: 'italic',
                          background: '#e4dec9'
                        }}
                      >
                        No image uploaded
                      </div>
                    )}
                    {site.region && (
                      <span className="blog-card-region">
                        {site.region} {site.district ? `• ${site.district}` : ''}
                      </span>
                    )}
                  </div>

                  <div className="blog-card-content">
                    <div className="blog-card-meta">
                      {site.era && <span>⏳ Era: {site.era}</span>}
                    </div>

                    <Link href={`/sites/${site.slug?.current}`}>
                      <h2 className="blog-card-title">{site.title}</h2>
                    </Link>

                    <p className="blog-card-excerpt">
                      {site.significance || 'Explore this historical site in Jammu and Kashmir.'}
                    </p>

                    {site.tags && site.tags.length > 0 && (
                      <div className="blog-card-tags">
                        {site.tags.map((tag) => (
                          <span key={tag} className="blog-card-tag">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
