import { UrgencyBanner } from '@/components/campaigns/UrgencyBanner';
import { CampaignHero } from '@/components/campaigns/CampaignHero';
import { CountdownTimer } from '@/components/campaigns/CountdownTimer';
import { CampaignProductCard } from '@/components/campaigns/CampaignProductCard';

export default function BlackFridayPage() {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 3);

  const doorbusters = [
    { id: '1', name: 'Ultra HD Smart TV 65"', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=800&auto=format&fit=crop', originalPrice: 1299.99, salePrice: 599.99, stockLeft: 12 },
    { id: '2', name: 'Noise Cancelling Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop', originalPrice: 349.99, salePrice: 149.99, stockLeft: 5 },
    { id: '3', name: 'Pro Gaming Laptop RTX 4080', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=800&auto=format&fit=crop', originalPrice: 2499.99, salePrice: 1899.99, stockLeft: 3 },
    { id: '4', name: 'Smart Home Security Kit', image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop', originalPrice: 499.99, salePrice: 199.99, stockLeft: 8 },
  ];

  return (
    <main className="min-h-screen bg-black">
      <UrgencyBanner message="⚡ BLACK FRIDAY CYBER MONDAY BLOWOUT - UP TO 80% OFF STOREWIDE ⚡" theme="neon" sticky />
      
      <CampaignHero 
        title="BLACK FRIDAY"
        subtitle="The biggest sale of the year is happening right now. Don't wait, stock is strictly limited."
        theme="neon"
      >
        <CountdownTimer targetDate={targetDate.toISOString()} theme="neon" size="lg" />
      </CampaignHero>

      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-black text-white uppercase tracking-wider mb-12 text-center drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          🔥 Doorbusters 🔥
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doorbusters.map(product => (
            <CampaignProductCard key={product.id} product={product} theme="neon" />
          ))}
        </div>
      </section>
      
      {/* Footer Banner */}
      <div className="bg-[#00ff00] py-16 text-center text-black px-4">
        <h3 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter mb-4">Once they're gone, they're gone.</h3>
        <p className="text-xl font-bold mb-8 max-w-2xl mx-auto">Our servers are melting. Checkout immediately to secure your items.</p>
        <button className="px-12 py-4 bg-black text-[#00ff00] text-xl font-black uppercase tracking-widest rounded-none hover:bg-gray-900 transition-colors">
          Shop All Deals
        </button>
      </div>
    </main>
  );
}
