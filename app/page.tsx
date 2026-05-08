import { client } from '../sanity/lib/client'
import { urlForImage } from '../sanity/lib/image'
import Link from 'next/link'

export const revalidate = 60 // Revalidate every 60 seconds

async function getPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    "excerpt": array::join(string::split((pt::text(body)), "")[0..100], "") + "..."
  }`
  return client.fetch(query)
}

export default async function Home() {
  const posts = await getPosts()

  return (
    <main style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 800, background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem' }}>
          Devika Project
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#94a3b8', marginBottom: '2rem' }}>A modern Next.js + Sanity CMS Experience</p>
        <Link href="/studio" className="button">
          Open Sanity Studio
        </Link>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {posts.length > 0 ? (
          posts.map((post: any) => (
            <Link key={post._id} href={`/post/${post.slug?.current || ''}`} className="card">
              {post.mainImage && (
                <img
                  src={urlForImage(post.mainImage)?.url() || ''}
                  alt={post.title}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
              )}
              <div style={{ padding: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem', color: '#e2e8f0' }}>{post.title}</h2>
                <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}
                </p>
                <p style={{ color: '#cbd5e1', lineHeight: 1.6 }}>{post.excerpt !== '...' ? post.excerpt : 'No excerpt available.'}</p>
              </div>
            </Link>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '1rem', border: '1px dashed rgba(255,255,255,0.2)' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#e2e8f0', marginBottom: '1rem' }}>No posts found</h3>
            <p style={{ color: '#94a3b8' }}>Your Sanity database is empty. Go to the Studio to create your first post!</p>
          </div>
        )}
      </div>
    </main>
  )
}
