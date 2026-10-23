import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  return ['', '/archivo', '/como-jugar', '/privacidad', '/cookies'].map((path) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: path ? 'weekly' : 'daily' }))
}
