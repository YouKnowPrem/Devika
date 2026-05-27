import { client } from '../../../sanity/lib/client'
import { urlForImage } from '../../../sanity/lib/image'
import { PortableText } from 'next-sanity'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import WikiTOC from '../../blog/[slug]/WikiTOC'
import ImageCarousel from '../../blog/[slug]/ImageCarousel'

export const revalidate = 60 // Revalidate this page cached output every 60 seconds

export async function generateStaticParams() {
  try {
    const query = `*[_type == "heritageSite" && defined(slug.current)] {
      "slug": slug.current
    }`
    const sites = await client.fetch(query)
    return sites.map((site: { slug: string }) => ({
      slug: site.slug,
    }))
  } catch (e) {
    return []
  }
}

async function getSite(slug: string) {
  try {
    const query = `*[_type == "heritageSite" && slug.current == $slug][0] {
      _id,
      title,
      mainImage,
      publishedAt,
      region,
      district,
      locationDetails,
      era,
      significance,
      custodians,
      gallery,
      body,
      tags
    }`
    return await client.fetch(query, { slug })
  } catch (e) {
    console.error('Error fetching single heritage site:', e)
    return null
  }
}

interface HeritageSiteProps {
  params: Promise<{ slug: string }>
}

export default async function HeritageSiteDetails({ params }: HeritageSiteProps) {
  const { slug } = await params
  const site = await getSite(slug)

  if (!site) {
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

  const getHeadingId = (value: any) => {
    const text = value.children?.map((c: any) => c.text || '').join('') || ''
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
  }

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

  const bodyBlocks = site.body || []
  const firstHeadingIndex = bodyBlocks.findIndex(
    (block: any) => block._type === 'block' && (block.style === 'h2' || block.style === 'h3')
  )

  const introBlocks = firstHeadingIndex !== -1 ? bodyBlocks.slice(0, firstHeadingIndex) : bodyBlocks
  const remainingBlocks = firstHeadingIndex !== -1 ? bodyBlocks.slice(firstHeadingIndex) : []

  const midIndex = Math.ceil(remainingBlocks.length / 2)
  const remainingFirstHalf = remainingBlocks.slice(0, midIndex)
  const remainingSecondHalf = remainingBlocks.slice(midIndex)

  const mainImageSrc = site.mainImage ? urlForImage(site.mainImage)?.url() : null

  return (
    <div className="blog-post-wrapper" style={{ maxWidth: '1200px' }}>
      {/* BACK TO PORTAL */}
      <Link href="/sites" className="back-to-blog">
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
        Back to Explore Hub
      </Link>

      {/* HEADER */}
      <header className="blog-post-header" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '2rem' }}>
        <h1 className="blog-post-title" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{site.title}</h1>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontStyle: 'italic' }}>
          Historical site entry from the J&K cultural archive
        </div>
      </header>

      {/* WIKIPEDIA DUAL COLUMN GRID */}
      <div className="wiki-grid">
        {/* LEFT COLUMN: HISTORY RICH CONTENT */}
        <main className="wiki-main-col">
          {/* INTRO */}
          <div className="blog-post-body intro-section" style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
            {introBlocks.length > 0 ? (
              <PortableText value={introBlocks} components={portableTextComponents} />
            ) : (
              <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                This site entry does not contain introductory text yet. Check the fact sheet on the right for quick indicators.
              </p>
            )}
          </div>

          {/* TABLE OF CONTENTS */}
          <WikiTOC body={bodyBlocks} />

          {/* HISTORY FLOW & MID IMAGE SLIDESHOW CAROUSEL */}
          <div className="blog-post-body">
            {remainingFirstHalf.length > 0 && (
              <PortableText value={remainingFirstHalf} components={portableTextComponents} />
            )}

            {/* Carousel Placement */}
            {site.gallery && site.gallery.length > 0 && (
              <ImageCarousel images={site.gallery} />
            )}

            {remainingSecondHalf.length > 0 && (
              <PortableText value={remainingSecondHalf} components={portableTextComponents} />
            )}
          </div>

          {/* TAG BADGES FOOTER */}
          {site.tags && site.tags.length > 0 && (
            <footer className="blog-post-tags-footer" style={{ marginTop: '3rem' }}>
              <span className="blog-post-tags-title">Tags:</span>
              {site.tags.map((tag: string) => (
                <Link key={tag} href={`/sites?query=${tag}`} className="blog-card-tag" style={{ cursor: 'pointer' }}>
                  #{tag}
                </Link>
              ))}
            </footer>
          )}
        </main>

        {/* RIGHT COLUMN: FACT SHEET SIDEBAR CARD */}
        <aside className="wiki-infobox-col">
          <div className="wiki-infobox">
            <div className="wiki-infobox-header">
              <div className="wiki-infobox-title">{site.title}</div>
            </div>

            {mainImageSrc && (
              <div className="wiki-infobox-img-container">
                <img src={mainImageSrc} alt={site.title} className="wiki-infobox-img" />
              </div>
            )}

            <table className="wiki-infobox-table">
              <tbody>
                <tr className="wiki-infobox-row">
                  <td className="wiki-infobox-label">Region</td>
                  <td className="wiki-infobox-value">{site.region || 'Jammu & Kashmir'}</td>
                </tr>

                {site.district && (
                  <tr className="wiki-infobox-row">
                    <td className="wiki-infobox-label">District</td>
                    <td className="wiki-infobox-value">{site.district}</td>
                  </tr>
                )}

                {site.era && (
                  <tr className="wiki-infobox-row">
                    <td className="wiki-infobox-label">Period/Era</td>
                    <td className="wiki-infobox-value">{site.era}</td>
                  </tr>
                )}

                {site.significance && (
                  <tr className="wiki-infobox-row">
                    <td className="wiki-infobox-label">Significance</td>
                    <td className="wiki-infobox-value">{site.significance}</td>
                  </tr>
                )}

                {site.locationDetails && (
                  <tr className="wiki-infobox-row">
                    <td className="wiki-infobox-label">Location</td>
                    <td className="wiki-infobox-value">{site.locationDetails}</td>
                  </tr>
                )}

                {site.custodians && (
                  <tr className="wiki-infobox-row">
                    <td className="wiki-infobox-label">Custodians</td>
                    <td className="wiki-infobox-value">{site.custodians}</td>
                  </tr>
                )}

                <tr className="wiki-infobox-row">
                  <td className="wiki-infobox-label">Published</td>
                  <td className="wiki-infobox-value">{formatDate(site.publishedAt)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </aside>
      </div>
    </div>
  )
}
