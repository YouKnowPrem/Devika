import { client } from '../../../sanity/lib/client'
import { urlForImage } from '../../../sanity/lib/image'
import { PortableText } from 'next-sanity'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import WikiTOC from './WikiTOC'
import ImageCarousel from './ImageCarousel'

export const revalidate = 60 // Revalidate this page cached output every 60 seconds

// Generate static parameters for all posts so they build statically on compile
export async function generateStaticParams() {
  try {
    const query = `*[_type == "post" && defined(slug.current)] {
      "slug": slug.current
    }`
    const posts = await client.fetch(query)
    return posts.map((post: { slug: string }) => ({
      slug: post.slug,
    }))
  } catch (e) {
    return []
  }
}

async function getPost(slug: string) {
  try {
    const query = `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      mainImage,
      publishedAt,
      region,
      tags,
      era,
      significance,
      locationDetails,
      custodians,
      gallery,
      body
    }`
    return await client.fetch(query, { slug })
  } catch (e) {
    console.error('Error fetching single post:', e)
    return null
  }
}

interface BlogPostProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Helper function to build clean IDs for TOC scrolling
  const getHeadingId = (value: any) => {
    const text = value.children?.map((c: any) => c.text || '').join('') || ''
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
  }

  // Custom PortableText block rendering components
  const portableTextComponents = {
    block: {
      h2: ({ children, value }: any) => {
        const id = getHeadingId(value)
        return <h2 id={id} style={{ marginTop: '2.5rem', scrollMarginTop: '100px' }}>{children}</h2>
      },
      h3: ({ children, value }: any) => {
        const id = getHeadingId(value)
        return <h3 id={id} style={{ marginTop: '2rem', scrollMarginTop: '100px' }}>{children}</h3>
      }
    }
  }

  // Wikipedia logic: divide body into Introduction blocks and remaining content blocks
  const bodyBlocks = post.body || []
  
  // Find index of first heading block (h2 or h3)
  const firstHeadingIndex = bodyBlocks.findIndex(
    (block: any) => block._type === 'block' && (block.style === 'h2' || block.style === 'h3')
  )

  const introBlocks = firstHeadingIndex !== -1 ? bodyBlocks.slice(0, firstHeadingIndex) : bodyBlocks
  const remainingBlocks = firstHeadingIndex !== -1 ? bodyBlocks.slice(firstHeadingIndex) : []

  // Split remaining blocks in half to place the image carousel in the middle of content
  const midIndex = Math.ceil(remainingBlocks.length / 2)
  const remainingFirstHalf = remainingBlocks.slice(0, midIndex)
  const remainingSecondHalf = remainingBlocks.slice(midIndex)

  const mainImageSrc = post.mainImage ? urlForImage(post.mainImage)?.url() : null

  return (
    <div className="blog-post-wrapper" style={{ maxWidth: '1200px' }}>
      {/* BACK TO ARCHIVE */}
      <Link href="/blog" className="back-to-blog">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          style={{ width: '16px', height: '16px' }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        Back to Archive
      </Link>

      {/* ARTICLE HEADER (WIKI STYLE TITLE) */}
      <header className="blog-post-header" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '2rem' }}>
        <h1 className="blog-post-title" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{post.title}</h1>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontStyle: 'italic' }}>
          From the regional living archive of Jammu, Kashmir, and Ladakh
        </div>
      </header>

      {/* WIKIPEDIA GRID TEMPLATE */}
      <div className="wiki-grid">
        {/* LEFT COLUMN: MAIN ARTICLE TEXT */}
        <main className="wiki-main-col">
          
          {/* 1. INTRODUCTION PARAGRAPHS */}
          <div className="blog-post-body intro-section" style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
            {introBlocks.length > 0 ? (
              <PortableText value={introBlocks} components={portableTextComponents} />
            ) : (
              <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                This cultural article does not contain introductory text yet. Check the facts panel for metadata info.
              </p>
            )}
          </div>

          {/* 2. TABLE OF CONTENTS */}
          <WikiTOC body={bodyBlocks} />

          {/* 3. DYNAMIC CONTENT TEXT FLOW & CENTERED CAROUSEL */}
          <div className="blog-post-body">
            {remainingFirstHalf.length > 0 && (
              <PortableText value={remainingFirstHalf} components={portableTextComponents} />
            )}

            {/* INTERACTIVE IMAGE CAROUSEL (MID-CONTENT) */}
            {post.gallery && post.gallery.length > 0 && (
              <ImageCarousel images={post.gallery} />
            )}

            {remainingSecondHalf.length > 0 && (
              <PortableText value={remainingSecondHalf} components={portableTextComponents} />
            )}
          </div>

          {/* TAGS FOOTER */}
          {post.tags && post.tags.length > 0 && (
            <footer className="blog-post-tags-footer" style={{ marginTop: '3rem' }}>
              <span className="blog-post-tags-title">Tags:</span>
              {post.tags.map((tag: string) => (
                <Link key={tag} href={`/blog?query=${tag}`} className="blog-card-tag" style={{ cursor: 'pointer' }}>
                  #{tag}
                </Link>
              ))}
            </footer>
          )}
        </main>

        {/* RIGHT COLUMN: FACT SHEET INFOBOX */}
        <aside className="wiki-infobox-col">
          <div className="wiki-infobox">
            <div className="wiki-infobox-header">
              <div className="wiki-infobox-title">{post.title}</div>
            </div>

            {/* Infobox Main Image */}
            {mainImageSrc && (
              <div className="wiki-infobox-img-container">
                <img src={mainImageSrc} alt={post.title} className="wiki-infobox-img" />
              </div>
            )}

            {/* Infobox Quick Facts Table */}
            <table className="wiki-infobox-table">
              <tbody>
                <tr className="wiki-infobox-row">
                  <td className="wiki-infobox-label">Region</td>
                  <td className="wiki-infobox-value">{post.region || 'Jammu & Kashmir'}</td>
                </tr>

                {post.era && (
                  <tr className="wiki-infobox-row">
                    <td className="wiki-infobox-label">Period/Era</td>
                    <td className="wiki-infobox-value">{post.era}</td>
                  </tr>
                )}

                {post.significance && (
                  <tr className="wiki-infobox-row">
                    <td className="wiki-infobox-label">Significance</td>
                    <td className="wiki-infobox-value">{post.significance}</td>
                  </tr>
                )}

                {post.locationDetails && (
                  <tr className="wiki-infobox-row">
                    <td className="wiki-infobox-label">Location</td>
                    <td className="wiki-infobox-value">{post.locationDetails}</td>
                  </tr>
                )}

                {post.custodians && (
                  <tr className="wiki-infobox-row">
                    <td className="wiki-infobox-label">Custodians</td>
                    <td className="wiki-infobox-value">{post.custodians}</td>
                  </tr>
                )}

                <tr className="wiki-infobox-row">
                  <td className="wiki-infobox-label">Published</td>
                  <td className="wiki-infobox-value">{formatDate(post.publishedAt)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </aside>
      </div>
    </div>
  )
}
