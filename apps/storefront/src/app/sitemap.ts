import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://commercex.com';

  // In a real application, you would fetch products and categories from your database
  // to dynamically generate these entries.
  const staticRoutes = ['', '/about', '/contact', '/collections/all'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: route === '' ? 1 : 0.8,
    })
  );

  return [...staticRoutes];
}
