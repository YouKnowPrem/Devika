import { client } from '../../../sanity/lib/client'
import { urlForImage } from '../../../sanity/lib/image'
import { PortableText } from 'next-sanity'
import Link from 'next/link'
import { notFound } from 'next/navigation'

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

  const imageSrc = post.mainImage ? urlForImage(post.mainImage)?.url() : null

  return (
    <article className="blog-post-wrapper">
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

      {/* ARTICLE HEADER */}
      <header className="blog-post-header">
        {post.region && (
          <span className="blog-post-region-badge">{post.region}</span>
        )}
        <h1 className="blog-post-title">{post.title}</h1>
        <div className="blog-post-meta">
          <span>🗓 {formatDate(post.publishedAt)}</span>
          {post.region && <span>📍 {post.region} Region</span>}
        </div>
      </header>

      {/* FEATURED MAIN IMAGE */}
      {imageSrc && (
        <div className="blog-post-image-container">
          <img src={imageSrc} alt={post.title} className="blog-post-image" />
        </div>
      )}

      {/* RICH TEXT PORTABLE TEXT BODY */}
      <div className="blog-post-body">
        {post.body ? (
          <PortableText value={post.body} />
        ) : (
          <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>
            This cultural article does not contain any body text yet. Check back soon for historical details!
          </p>
        )}
      </div>

      {/* FOOTER TAGS LIST */}
      {post.tags && post.tags.length > 0 && (
        <footer className="blog-post-tags-footer">
          <span className="blog-post-tags-title">Categorized In:</span>
          {post.tags.map((tag: string) => (
            <Link key={tag} href={`/blog?query=${tag}`} className="blog-card-tag" style={{ cursor: 'pointer' }}>
              #{tag}
            </Link>
          ))}
        </footer>
      )}
    </article>
  )
}
