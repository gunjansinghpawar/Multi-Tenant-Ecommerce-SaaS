import { CountdownTimer } from '@/components/campaigns/CountdownTimer';
import { CampaignProductCard } from '@/components/campaigns/CampaignProductCard';

export default function FlashSalePage() {
  const targetDate = new Date();
  targetDate.setHours(targetDate.getHours() + 2); // 2 hours from now

  const flashItems = [
    { id: '1', name: 'Wireless Earbuds Pro', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop', originalPrice: 199.99, salePrice: 89.99, stockLeft: 3 },
    { id: '2', name: 'Mechanical Keyboard v2', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop', originalPrice: 149.99, salePrice: 75.00, stockLeft: 1 },
    { id: '3', name: '4K Web Camera', image: 'https://images.unsplash.com/photo-1588508119047-9252c79219ea?q=80&w=800&auto=format&fit=crop', originalPrice: 129.99, salePrice: 49.99, stockLeft: 6 },
  ];

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 py-12">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-red-100">
        
        {/* Header */}
        <div className="bg-red-600 p-8 sm:p-12 text-center text-white relative overflow-hidden">
          {/* Abstract pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
          
          <div className="relative z-10">
            <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold uppercase tracking-widest mb-6">
              Invite Only
            </span>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter mb-8">
              Lightning Drop
            </h1>
            
            <div className="flex justify-center mb-4">
              <CountdownTimer targetDate={targetDate.toISOString()} theme="light" size="sm" />
            </div>
            <p className="text-red-100 font-medium">Until prices return to normal.</p>
          </div>
        </div>

        {/* Products */}
        <div className="p-8 sm:p-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {flashItems.map(product => (
              <CampaignProductCard key={product.id} product={product} theme="light" />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
