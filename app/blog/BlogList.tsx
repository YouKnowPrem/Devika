'use client'

import { useState } from 'react'
import Link from 'next/link'
import { urlForImage } from '../../sanity/lib/image'

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: any;
  publishedAt?: string;
  region?: string;
  tags?: string[];
  excerpt?: string;
}

interface BlogListProps {
  posts: Post[];
}

export default function BlogList({ posts = [] }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('All')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // Extract all unique tags across all posts
  const allTags = Array.from(
    new Set(
      posts
        .flatMap((post) => post.tags || [])
        .filter((tag) => typeof tag === 'string' && tag.trim() !== '')
    )
  ).sort()

  // Filter logic
  const filteredPosts = posts.filter((post) => {
    // 1. Region filter
    if (selectedRegion !== 'All') {
      if (!post.region || post.region.toLowerCase() !== selectedRegion.toLowerCase()) {
        return false
      }
    }

    // 2. Tag filter
    if (selectedTag) {
      if (!post.tags || !post.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase())) {
        return false
      }
    }

    // 3. Text query search (matches title, excerpt, region, or tags)
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim()
      const matchesTitle = post.title?.toLowerCase().includes(query)
      const matchesExcerpt = post.excerpt?.toLowerCase().includes(query)
      const matchesRegion = post.region?.toLowerCase().includes(query)
      const matchesTags = post.tags?.some(tag => tag.toLowerCase().includes(query))

      return matchesTitle || matchesExcerpt || matchesRegion || matchesTags
    }

    return true
  })

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null) // deselect if clicked again
    } else {
      setSelectedTag(tag)
    }
  }

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedRegion('All')
    setSelectedTag(null)
  }

  return (
    <div className="blog-container">
      {/* HEADER SECTION */}
      <header className="blog-header animate-fade-up">
        <h1>Living Archive</h1>
        <p>
          Discover, read, and explore the deep-seated history, rich culture, 
          and oral traditions of Jammu, Kashmir, and Ladakh.
        </p>
      </header>

      {/* SEARCH AND FILTERS */}
      <section className="search-filter-wrapper animate-fade-up animate-delay-1">
        {/* Real-time Text Search Bar */}
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
            placeholder="Search by article title, tag, history or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Search by Region Filter (Dropdown/Radio equivalent visually) */}
        <div className="filter-section">
          <span className="filter-label">Search by Region</span>
          <div className="region-buttons">
            {['All', 'Jammu', 'Kashmir', 'Ladakh'].map((region) => (
              <button
                key={region}
                className={`region-btn ${selectedRegion === region ? 'active' : ''}`}
                onClick={() => {
                  setSelectedRegion(region)
                  setSelectedTag(null) // Clear tag selections when region switches for cleaner user paths
                }}
              >
                {region === 'All' ? '✦ All Regions' : region}
              </button>
            ))}
          </div>
        </div>

        {/* Category Tags Suggestion Pills */}
        {allTags.length > 0 && (
          <div className="filter-section">
            <span className="filter-label">Filter by Category Tags</span>
            <div className="tag-filters">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  className={`tag-badge-btn ${selectedTag === tag ? 'active' : ''}`}
                  onClick={() => handleTagClick(tag)}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Clear filters utility button */}
        {(searchQuery || selectedRegion !== 'All' || selectedTag) && (
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
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* ARTICLES GRID SECTION */}
      <section className="animate-fade-up animate-delay-2">
        {filteredPosts.length === 0 ? (
          <div className="no-results">
            <h3>No Records Found</h3>
            <p>
              We couldn't find any historical records or cultural posts matching your search criteria. 
              Try searching a different region or clearing the active text filter.
            </p>
            <button
              onClick={handleClearFilters}
              className="btn btn-blue"
              style={{ marginTop: '1.5rem', padding: '0.5rem 1.5rem', fontSize: '0.85rem' }}
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          <div className="blog-grid">
            {filteredPosts.map((post) => {
              const imageSrc = post.mainImage ? urlForImage(post.mainImage)?.url() : null
              
              return (
                <article key={post._id} className="blog-card">
                  <div className="blog-card-img-wrapper">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={post.title}
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
                        No image available
                      </div>
                    )}
                    {post.region && (
                      <span className="blog-card-region">{post.region}</span>
                    )}
                  </div>

                  <div className="blog-card-content">
                    <div className="blog-card-meta">
                      <span>🗓 {formatDate(post.publishedAt)}</span>
                    </div>

                    <Link href={`/blog/${post.slug?.current}`}>
                      <h2 className="blog-card-title">{post.title}</h2>
                    </Link>

                    <p className="blog-card-excerpt">
                      {post.excerpt || 'Read more about this Jammu & Kashmir cultural story.'}
                    </p>

                    {post.tags && post.tags.length > 0 && (
                      <div className="blog-card-tags">
                        {post.tags.map((tag) => (
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
