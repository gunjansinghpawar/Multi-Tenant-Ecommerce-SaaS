import { BlogPost, Author, Category, Tag, Comment } from './types';

export const mockCategories: Category[] = [
  { id: 'c1', name: 'E-commerce Trends', slug: 'ecommerce-trends', color: 'bg-blue-100 text-blue-800' },
  { id: 'c2', name: 'Case Studies', slug: 'case-studies', color: 'bg-green-100 text-green-800' },
  { id: 'c3', name: 'Product Updates', slug: 'product-updates', color: 'bg-purple-100 text-purple-800' },
  { id: 'c4', name: 'Tutorials', slug: 'tutorials', color: 'bg-orange-100 text-orange-800' },
];

export const mockTags: Tag[] = [
  { id: 't1', name: 'B2B', slug: 'b2b' },
  { id: 't2', name: 'Conversion Rate', slug: 'cro' },
  { id: 't3', name: 'Headless', slug: 'headless' },
  { id: 't4', name: 'Omnichannel', slug: 'omnichannel' },
];

export const mockAuthors: Record<string, Author> = {
  a1: {
    id: 'a1',
    name: 'Sarah Jenkins',
    role: 'Lead UX Architect',
    avatarUrl: 'https://i.pravatar.cc/150?u=sarah',
    bio: 'Sarah has over 10 years of experience designing high-converting ecommerce experiences for Fortune 500 brands.',
    socials: { twitter: 'https://twitter.com', linkedin: 'https://linkedin.com' },
  },
  a2: {
    id: 'a2',
    name: 'David Chen',
    role: 'Product Manager',
    avatarUrl: 'https://i.pravatar.cc/150?u=david',
    bio: 'David is passionate about building tools that empower merchants to scale globally.',
  }
};

export const mockPosts: BlogPost[] = [
  {
    id: 'p1',
    title: 'The Future of Headless Commerce: What You Need to Know for 2027',
    slug: 'future-of-headless-commerce',
    excerpt: 'As customer expectations evolve, monolithic architectures are holding brands back. Discover why headless commerce is the key to omnichannel success in the coming year.',
    content: `
      <h2>The Shift Away from Monoliths</h2>
      <p>For years, monolithic platforms were the standard. They offered a convenient all-in-one package, but often at the cost of flexibility and speed. Today's consumers demand lightning-fast, personalized experiences across web, mobile apps, social media, and even in-store kiosks.</p>
      
      <p>This is where headless architecture shines. By decoupling the frontend presentation layer from the backend ecommerce engine, brands gain unprecedented agility.</p>
      
      <h3>Key Benefits</h3>
      <ul>
        <li><strong>Speed:</strong> Deliver sub-second page loads using modern frontend frameworks like Next.js or Remix.</li>
        <li><strong>Flexibility:</strong> Swap out your CMS, payment provider, or search engine without rebuilding your entire site.</li>
        <li><strong>Omnichannel:</strong> Push products to any digital touchpoint using the same core APIs.</li>
      </ul>
      
      <blockquote>"Headless isn't just a technical upgrade; it's a strategic enabler for business growth." - Sarah Jenkins</blockquote>
      
      <p>As we move into 2027, we expect to see even more brands adopting composable architectures, leveraging microservices to build tailored, best-of-breed tech stacks.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
    publishedAt: '2026-07-28T10:00:00Z',
    readTimeMinutes: 5,
    author: mockAuthors['a1'],
    category: mockCategories[0],
    tags: [mockTags[0], mockTags[2]],
  },
  {
    id: 'p2',
    title: 'How Acme Corp Increased Conversions by 40% with Our New Checkout',
    slug: 'acme-corp-checkout-case-study',
    excerpt: 'A deep dive into how optimizing the checkout flow and introducing one-click payments completely transformed Acme Corp\'s bottom line.',
    content: '<p>Content coming soon...</p>',
    coverImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2400&auto=format&fit=crop',
    publishedAt: '2026-07-20T14:30:00Z',
    readTimeMinutes: 8,
    author: mockAuthors['a2'],
    category: mockCategories[1],
    tags: [mockTags[1]],
  },
  {
    id: 'p3',
    title: 'Introducing AI-Powered Product Recommendations',
    slug: 'ai-product-recommendations-launch',
    excerpt: 'Boost your average order value effortlessly with our new machine-learning recommendation engine, now available for all enterprise plans.',
    content: '<p>Content coming soon...</p>',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2532&auto=format&fit=crop',
    publishedAt: '2026-07-15T09:15:00Z',
    readTimeMinutes: 3,
    author: mockAuthors['a2'],
    category: mockCategories[2],
    tags: [mockTags[1], mockTags[3]],
  }
];

export const mockComments: Record<string, Comment[]> = {
  p1: [
    {
      id: 'cmt1',
      postId: 'p1',
      user: { name: 'Michael Brown', avatarUrl: 'https://i.pravatar.cc/150?u=michael' },
      text: 'Great article! We migrated to a headless setup last year and the performance gains were exactly as described. The flexibility is unmatched.',
      createdAt: '2026-07-29T08:30:00Z',
      likes: 12,
      replies: [
        {
          id: 'cmt2',
          postId: 'p1',
          user: { name: 'Sarah Jenkins', avatarUrl: 'https://i.pravatar.cc/150?u=sarah' },
          text: 'Thanks Michael! Glad to hear the migration went well for your team. What frontend framework did you end up choosing?',
          createdAt: '2026-07-29T10:15:00Z',
          likes: 4,
        }
      ]
    },
    {
      id: 'cmt3',
      postId: 'p1',
      user: { name: 'Elena Rodriguez' },
      text: 'Im still struggling to convince our stakeholders that the initial investment is worth it. Do you have any hard numbers on ROI?',
      createdAt: '2026-07-30T14:20:00Z',
      likes: 2,
    }
  ]
};
