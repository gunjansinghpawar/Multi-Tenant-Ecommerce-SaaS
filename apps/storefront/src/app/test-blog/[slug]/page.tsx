'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { ArrowLeft, Tag as TagIcon } from 'lucide-react';

import { mockPosts, mockComments } from '@/components/blog/mock-data';
import { AuthorProfile } from '@/components/blog/AuthorProfile';
import { SocialShare } from '@/components/blog/SocialShare';
import { BlogComments } from '@/components/blog/BlogComments';
import { BlogCard } from '@/components/blog/BlogCard';

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // In Next.js 15, params is a Promise in client components when accessed like this, 
  // or we unwrap it. Using `use()` to unwrap the promise for the slug.
  const resolvedParams = use(params);
  const post = mockPosts.find(p => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Get 3 related posts (just taking random ones from mock for demo)
  const relatedPosts = mockPosts.filter(p => p.id !== post.id).slice(0, 3);
  const postComments = mockComments[post.id] || [];

  return (
    <main className="min-h-screen bg-white dark:bg-black pb-24">
      {/* Header / Hero */}
      <div className="relative w-full h-[60vh] min-h-[400px]">
        <img
          src={post.coverImage}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/test-blog"
              className="inline-flex items-center text-gray-300 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
            </Link>
            
            <div className="mb-6">
              <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${post.category.color || 'bg-white text-black'}`}>
                {post.category.name}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-center space-x-4 text-sm font-medium text-gray-300">
              <img
                src={post.author.avatarUrl}
                alt={post.author.name}
                className="w-10 h-10 rounded-full border-2 border-gray-700"
              />
              <div className="text-left">
                <span className="block text-white">{post.author.name}</span>
                <span>{format(new Date(post.publishedAt), 'MMM d, yyyy')} • {post.readTimeMinutes} min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Article Content */}
        <article 
          className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-500"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 flex items-center flex-wrap gap-2">
            <TagIcon className="w-5 h-5 text-gray-400 mr-2" />
            {post.tags.map(tag => (
              <span key={tag.id} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium">
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Share */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center">
          <SocialShare 
            url={`https://yourstore.com/blog/${post.slug}`} 
            title={post.title} 
          />
        </div>

        {/* Author Bio */}
        <div className="mt-12">
          <AuthorProfile author={post.author} />
        </div>

        {/* Comments */}
        <BlogComments initialComments={postComments} postId={post.id} />
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-16 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map(relatedPost => (
              <BlogCard key={relatedPost.id} post={relatedPost} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
