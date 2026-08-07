'use client';

import { useState } from 'react';
import { mockPosts, mockCategories } from '@/components/blog/mock-data';
import { BlogHero } from '@/components/blog/BlogHero';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogSearch } from '@/components/blog/BlogSearch';
import { CategoryList } from '@/components/blog/CategoryList';
import { NewsletterSignup } from '@/components/blog/NewsletterSignup';

export default function BlogHomePage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredPost = mockPosts[0];
  const regularPosts = mockPosts.slice(1);

  const filteredPosts = regularPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category.slug === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-white dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
              Insights & News
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl">
              Discover the latest strategies, trends, and stories in ecommerce and technology.
            </p>
          </div>
          <BlogSearch onSearch={setSearchQuery} />
        </div>

        {/* Featured Post (Only show if no search/filter is active) */}
        {activeCategory === 'all' && !searchQuery && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <BlogHero post={featuredPost} />
          </section>
        )}

        {/* Categories & Post Grid */}
        <section>
          <div className="mb-8">
            <CategoryList 
              categories={mockCategories}
              activeCategorySlug={activeCategory}
              onSelectCategory={setActiveCategory}
            />
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">No articles found</p>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or category filter.</p>
            </div>
          )}
        </section>

        {/* Newsletter */}
        <section className="py-12">
          <NewsletterSignup />
        </section>

      </div>
    </main>
  );
}
