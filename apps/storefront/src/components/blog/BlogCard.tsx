import Link from 'next/link';
import { format } from 'date-fns';
import { BlogPost } from './types';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group flex flex-col bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-white/5 transition-all duration-300">
      <Link href={`/test-blog/${post.slug}`} className="relative h-64 overflow-hidden block">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 z-20">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${post.category.color || 'bg-gray-100 text-gray-800'}`}>
            {post.category.name}
          </span>
        </div>
      </Link>
      
      <div className="flex flex-col flex-1 p-6 sm:p-8">
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span>{format(new Date(post.publishedAt), 'MMM d, yyyy')}</span>
          <span>•</span>
          <span>{post.readTimeMinutes} min read</span>
        </div>
        
        <Link href={`/test-blog/${post.slug}`} className="block mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-6 flex-1">
          {post.excerpt}
        </p>
        
        <div className="flex items-center mt-auto pt-6 border-t border-gray-100 dark:border-gray-800">
          <img
            src={post.author.avatarUrl}
            alt={post.author.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {post.author.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {post.author.role}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
