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
  tags?: string[];
  excerpt?: string;
}

interface BlogListProps {
  posts: Post[];
}

export default function BlogList({ posts = [] }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // Extract unique tags
  const allTags = Array.from(
    new Set(
      posts
        .flatMap((post) => post.tags || [])
        .filter((tag) => typeof tag === 'string' && tag.trim() !== '')
    )
  ).sort()

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    // 1. Tag filter
    if (selectedTag) {
      if (!post.tags || !post.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase())) {
        return false
      }
    }

    // 2. Text search matching
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim()
      const matchesTitle = post.title?.toLowerCase().includes(query)
      const matchesExcerpt = post.excerpt?.toLowerCase().includes(query)
      const matchesTags = post.tags?.some(tag => tag.toLowerCase().includes(query))

      return matchesTitle || matchesExcerpt || matchesTags
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

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedTag(null)
  }

  return (
    <div className="blog-container">
      {/* HEADER */}
      <header className="blog-header animate-fade-up">
        <h1>Stories & Updates</h1>
        <p>
          Read editorial stories, logs of recent heritage walks, announcements, 
          and community preservation diaries from across Jammu and Kashmir.
        </p>
      </header>

      {/* FILTER BOX */}
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
            placeholder="Search blogs by title, tags or content keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Tag badging */}
        {allTags.length > 0 && (
          <div className="filter-section">
            <span className="filter-label">Filter by Topic</span>
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

        {/* Clear Filters */}
        {(searchQuery || selectedTag) && (
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

      {/* BLOG GRID */}
      <section className="animate-fade-up animate-delay-2">
        {filteredPosts.length === 0 ? (
          <div className="no-results">
            <h3>No Blog Posts Found</h3>
            <p>
              We couldn't find any articles matching your search query or topic criteria. 
              Try searching something else or reset the filter pills.
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
                        No visual uploaded
                      </div>
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
                      {post.excerpt || 'Read the full stories and preservation journals.'}
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
