import { client } from '../../../sanity/lib/client'
import { urlForImage } from '../../../sanity/lib/image'
import { PortableText } from 'next-sanity'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 60 // Revalidate this page cached output every 60 seconds

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
    <article className="blog-post-wrapper" style={{ maxWidth: '800px' }}>
      {/* BACK LINK */}
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
        Back to Stories
      </Link>

      {/* HEADER */}
      <header className="blog-post-header">
        <h1 className="blog-post-title" style={{ fontSize: '2.8rem', lineHeight: '1.2' }}>{post.title}</h1>
        <div className="blog-post-meta">
          <span>🗓 {formatDate(post.publishedAt)}</span>
        </div>
      </header>

      {/* MAIN IMAGE */}
      {imageSrc && (
        <div className="blog-post-image-container" style={{ height: '400px' }}>
          <img src={imageSrc} alt={post.title} className="blog-post-image" />
        </div>
      )}

      {/* BODY */}
      <div className="blog-post-body">
        {post.body ? (
          <PortableText value={post.body} />
        ) : (
          <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>
            This blog post does not contain any content yet. Check back soon for stories and logs!
          </p>
        )}
      </div>

      {/* FOOTER TAG PILLS */}
      {post.tags && post.tags.length > 0 && (
        <footer className="blog-post-tags-footer">
          <span className="blog-post-tags-title">Topics:</span>
          {post.tags.map((tag: string) => (
            <Link key={tag} href={`/blog?query=${tag}`} className="blog-card-tag">
              #{tag}
            </Link>
          ))}
        </footer>
      )}
    </article>
  )
}
