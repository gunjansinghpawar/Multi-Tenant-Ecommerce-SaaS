import Link from 'next/link';
import { format } from 'date-fns';
import { BlogPost } from './types';

interface BlogHeroProps {
  post: BlogPost;
}

export function BlogHero({ post }: BlogHeroProps) {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden min-h-[600px] flex items-end group">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl p-6 sm:p-12 lg:p-16">
        <span className={`inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wide rounded-full ${post.category.color || 'bg-white text-black'}`}>
          {post.category.name}
        </span>
        
        <Link href={`/test-blog/${post.slug}`}>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 hover:text-gray-200 transition-colors">
            {post.title}
          </h2>
        </Link>
        
        <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl line-clamp-2 sm:line-clamp-none">
          {post.excerpt}
        </p>
        
        <div className="flex items-center text-sm font-medium text-gray-400">
          <img
            src={post.author.avatarUrl}
            alt={post.author.name}
            className="w-12 h-12 rounded-full border-2 border-gray-700 object-cover mr-4"
          />
          <div>
            <span className="block text-white text-base">{post.author.name}</span>
            <span>{format(new Date(post.publishedAt), 'MMM d, yyyy')} • {post.readTimeMinutes} min read</span>
          </div>
        </div>
      </div>
    </div>
  );
}
