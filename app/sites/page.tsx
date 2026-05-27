import { client } from '../../sanity/lib/client'
import SitesList from './SitesList'

export const revalidate = 60 // Revalidate this page cached output every 60 seconds

async function getSites() {
  try {
    const query = `*[_type == "heritageSite"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      region,
      district,
      era,
      significance,
      locationDetails,
      tags
    }`
    return await client.fetch(query)
  } catch (e) {
    console.error('Failed to fetch heritage sites from Sanity:', e)
    return []
  }
}

export default async function ExploreSitesPage() {
  const sites = await getSites()
  return <SitesList sites={sites} />
}
