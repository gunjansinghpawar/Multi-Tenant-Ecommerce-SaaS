'use client';
import { ShoppingCart } from 'lucide-react';
import { useAnalytics } from '../../hooks/use-analytics';
import { useCartStore } from '../../store/use-cart-store';

interface CampaignProductCardProps {
  product: {
    id: string;
    name: string;
    image: string;
    originalPrice: number;
    salePrice: number;
    stockLeft?: number;
  };
  theme?: 'dark' | 'light' | 'neon' | 'gold';
}
export function CampaignProductCard({ product, theme = 'dark' }: CampaignProductCardProps) {
  const { track } = useAnalytics();
  const { addItem } = useCartStore();

  const discountPercent = Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100);

  const themeClasses = {
    dark: 'bg-black border-gray-800 text-white',
    light: 'bg-white border-gray-200 text-black',
    neon: 'bg-black border-[#00ff00] text-[#00ff00]',
    gold: 'bg-[#1a0f00] border-[#ffd700] text-[#ffd700]',
  };

  const discountBadgeTheme = {
    dark: 'bg-red-600 text-white',
    light: 'bg-red-500 text-white',
    neon: 'bg-[#00ff00] text-black',
    gold: 'bg-[#ffd700] text-black',
  };

  const buttonTheme = {
    dark: 'bg-white text-black hover:bg-gray-200',
    light: 'bg-black text-white hover:bg-gray-800',
    neon: 'bg-[#00ff00] text-black hover:bg-[#00cc00]',
    gold: 'bg-[#ffd700] text-black hover:bg-[#e6c200]',
  };

  return (
    <div className={`group relative rounded-2xl border overflow-hidden flex flex-col ${themeClasses[theme]} transition-transform hover:-translate-y-1 hover:shadow-xl`}>
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 dark:bg-gray-900">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Discount Badge */}
        <div className={`absolute top-4 left-4 px-3 py-1 text-sm font-black tracking-widest uppercase rounded-sm z-10 ${discountBadgeTheme[theme]}`}>
          {discountPercent}% OFF
        </div>

        {/* Low Stock Indicator */}
        {product.stockLeft && product.stockLeft < 10 && (
          <div className="absolute bottom-4 left-4 right-4 bg-red-600/90 text-white text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded-full text-center backdrop-blur-sm">
            🔥 Only {product.stockLeft} left in stock!
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-bold text-lg mb-2 line-clamp-1">{product.name}</h3>
        
        <div className="mt-auto flex items-end justify-between mb-4">
          <div>
            <span className={`text-sm line-through block mb-0.5 opacity-60 ${theme === 'neon' ? 'text-[#00ff00]' : 'text-gray-500'}`}>
              ${product.originalPrice.toFixed(2)}
            </span>
            <span className="text-2xl font-black">
              ${product.salePrice.toFixed(2)}
            </span>
          </div>
        </div>

        <button 
          onClick={() => {
            track('promotion_click', { product_id: product.id, campaign: theme });
            addItem({
              id: crypto.randomUUID(),
              productId: product.id,
              name: product.name,
              price: product.salePrice,
              quantity: 1,
              image: product.image,
            });
          }}
          className={`w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center transition-colors ${buttonTheme[theme]}`}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
