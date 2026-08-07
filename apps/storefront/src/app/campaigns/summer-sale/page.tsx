import { UrgencyBanner } from '@/components/campaigns/UrgencyBanner';
import { CampaignHero } from '@/components/campaigns/CampaignHero';
import { CampaignProductCard } from '@/components/campaigns/CampaignProductCard';

export default function SummerSalePage() {
  const clearance = [
    { id: '1', name: 'Polarized Sunglasses', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop', originalPrice: 120.00, salePrice: 45.00 },
    { id: '2', name: 'Linen Beach Towel', image: 'https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=800&auto=format&fit=crop', originalPrice: 40.00, salePrice: 15.00 },
    { id: '3', name: 'Woven Straw Hat', image: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8?q=80&w=800&auto=format&fit=crop', originalPrice: 65.00, salePrice: 20.00 },
    { id: '4', name: 'Canvas Tote Bag', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop', originalPrice: 55.00, salePrice: 19.99 },
  ];

  return (
    <main className="min-h-screen bg-white">
      <UrgencyBanner message="☀️ END OF SUMMER CLEARANCE - EVERYTHING MUST GO ☀️" theme="dark" sticky={false} />
      
      <CampaignHero 
        title="SUMMER CLEARANCE"
        subtitle="Up to 75% off. Make room for the new season."
        theme="light"
        backgroundImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2946&auto=format&fit=crop"
      />

      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Final Markdown</h2>
            <p className="text-gray-500 text-lg">Styles starting at $15.</p>
          </div>
          <div className="mt-6 md:mt-0 space-x-2">
            {['All', 'Swimwear', 'Accessories', 'Footwear'].map(cat => (
              <button key={cat} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-full font-medium text-sm transition-colors">
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {clearance.map(product => (
            <CampaignProductCard key={product.id} product={product} theme="light" />
          ))}
        </div>
      </section>

      {/* Newsletter block specific for summer sale */}
      <section className="bg-yellow-400 py-24 text-center px-4">
        <h3 className="text-3xl sm:text-4xl font-bold text-black mb-4">Don't miss the next drop.</h3>
        <p className="text-lg text-yellow-900 mb-8">Sign up for early access to our Fall collection.</p>
        <div className="max-w-md mx-auto flex">
          <input type="email" placeholder="Email address" className="flex-1 px-6 py-4 rounded-l-full border-none focus:ring-2 focus:ring-black" />
          <button className="px-8 py-4 bg-black text-white font-bold rounded-r-full hover:bg-gray-900">Sign Up</button>
        </div>
      </section>
    </main>
  );
}
