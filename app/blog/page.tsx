import { client } from '../../sanity/lib/client'
import BlogList from './BlogList'

export const revalidate = 60 // Revalidate this page cached output every 60 seconds

async function getPosts() {
  try {
    const query = `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      tags,
      excerpt
    }`
    return await client.fetch(query)
  } catch (e) {
    console.error('Failed to fetch blog posts from Sanity:', e)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getPosts()
  return <BlogList posts={posts} />
}
