'use client';

import { use } from 'react';
import { CampaignProductCard } from '@/components/campaigns/CampaignProductCard';
import { Instagram, Youtube, Twitter } from 'lucide-react';

export default function CreatorPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  
  // Simulated Creator Data
  const creator = {
    name: "Alex Rivera",
    handle: `@${resolvedParams.slug}`,
    bio: "Tech reviewer, minimal desk setups, and mechanical keyboard enthusiast.",
    quote: '"These are the tools I actually use every single day to get work done. No compromises."',
    coverImage: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2940&auto=format&fit=crop', // Desk setup
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop', // Face
    picks: [
      { id: '1', name: 'Ergo Split Keyboard', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop', originalPrice: 249, salePrice: 249 },
      { id: '2', name: 'Ultra-wide Monitor Arm', image: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=800&auto=format&fit=crop', originalPrice: 129, salePrice: 99 },
      { id: '3', name: 'Wool Felt Desk Mat', image: 'https://images.unsplash.com/photo-1621644788107-1bc32c326084?q=80&w=800&auto=format&fit=crop', originalPrice: 35, salePrice: 35 },
    ]
  };

  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] pb-24">
      {/* Creator Cover */}
      <div className="relative w-full h-[40vh] min-h-[300px]">
        <img
          src={creator.coverImage}
          alt="Cover"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Creator Profile */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-32 z-10 text-center">
        <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-8 border-[#fafafa] dark:border-[#0a0a0a] shadow-xl mb-6">
          <img src={creator.avatar} alt={creator.name} className="w-full h-full object-cover" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{creator.name}</h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium mb-4">{creator.handle}</p>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-6">{creator.bio}</p>
        
        <div className="flex justify-center space-x-4">
          <button className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors">
            <Instagram className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-500 transition-colors">
            <Youtube className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-gray-600 hover:text-blue-400 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
            <Twitter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-16 px-4">
         <blockquote className="text-2xl font-serif text-center italic text-gray-900 dark:text-white">
           {creator.quote}
         </blockquote>
      </div>

      {/* Creator Picks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-black dark:border-white pl-4">
          Top Picks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {creator.picks.map(product => (
            <CampaignProductCard key={product.id} product={product} theme="dark" />
          ))}
        </div>
      </section>
    </main>
  );
}
