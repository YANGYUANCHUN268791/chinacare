import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://healthroute.xyz'
  const locales = ['zh', 'en', 'ar', 'fr', 'es', 'ru']
  const routes = ['', '/hospitals', '/about', '/contact', '/pricing', '/how-it-works', '/get-started', '/privacy', '/terms', '/disclaimer']

  return locales.flatMap(locale =>
    routes.map(route => ({
      url: `${base}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1.0 : 0.8,
    }))
  )
}
