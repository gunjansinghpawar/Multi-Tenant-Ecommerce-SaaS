import { UrgencyBanner } from '@/components/campaigns/UrgencyBanner';
import { CampaignHero } from '@/components/campaigns/CampaignHero';
import { CountdownTimer } from '@/components/campaigns/CountdownTimer';
import { CampaignProductCard } from '@/components/campaigns/CampaignProductCard';

export default function DiwaliPage() {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 15);

  const gifts = [
    { id: '1', name: 'Premium Gold Necklace 24k', image: 'https://images.unsplash.com/photo-1599643478524-fb66f7ca265b?q=80&w=800&auto=format&fit=crop', originalPrice: 899.99, salePrice: 749.99 },
    { id: '2', name: 'Artisan Sweet Box', image: 'https://images.unsplash.com/photo-1628287739986-c4f4204ff359?q=80&w=800&auto=format&fit=crop', originalPrice: 129.99, salePrice: 89.99 },
    { id: '3', name: 'Festive Silk Saree', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop', originalPrice: 299.99, salePrice: 199.99 },
    { id: '4', name: 'Handcrafted Diya Set (12)', image: 'https://images.unsplash.com/photo-1605273752538-2d88f6155986?q=80&w=800&auto=format&fit=crop', originalPrice: 49.99, salePrice: 24.99 },
  ];

  return (
    <main className="min-h-screen bg-[#1a0f00]">
      <UrgencyBanner message="✨ DIWALI MEGA SALE - UP TO 60% OFF ON FESTIVE WEAR & GIFTS ✨" theme="warning" sticky />
      
      <CampaignHero 
        title="FESTIVE OFFERS"
        subtitle="Illuminate your home and wardrobe with our exclusive Diwali collections."
        theme="gold"
        backgroundImage="https://images.unsplash.com/photo-1574676166442-7a718b958eb6?q=80&w=2940&auto=format&fit=crop"
      >
        <CountdownTimer targetDate={targetDate.toISOString()} theme="gold" size="lg" />
      </CampaignHero>

      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-serif text-[#ffd700] text-center mb-4">Curated Gifts for Loved Ones</h2>
        <p className="text-center text-[#cca900] mb-12 max-w-2xl mx-auto">Discover the perfect presents to make this Diwali unforgettable.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {gifts.map(product => (
            <CampaignProductCard key={product.id} product={product} theme="gold" />
          ))}
        </div>
      </section>

      <div className="border-t border-[#ffd700]/30 max-w-7xl mx-auto" />

      <section className="py-24 px-4 text-center">
        <h3 className="text-3xl sm:text-4xl font-serif text-[#ffd700] mb-6">Corporate Gifting</h3>
        <p className="text-gray-300 max-w-xl mx-auto mb-8">
          Looking to reward your employees or partners this festive season? Get flat 30% off on bulk orders.
        </p>
        <button className="px-8 py-4 bg-[#ffd700] text-black font-bold uppercase tracking-wider rounded-md hover:bg-white transition-colors shadow-[0_0_20px_rgba(255,215,0,0.4)]">
          Explore Corporate Gifts
        </button>
      </section>
    </main>
  );
}
