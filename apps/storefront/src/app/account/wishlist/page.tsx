'use client';

import { useState } from 'react';
import { Heart, Share2, Copy, Trash2, MoreVertical, Plus, Edit2 } from 'lucide-react';
import Link from 'next/link';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface Wishlist {
  id: string;
  name: string;
  items: WishlistItem[];
}

export default function WishlistPage() {
  const [lists, setLists] = useState<Wishlist[]>([
    {
      id: '1',
      name: 'Summer Fits',
      items: [
        { id: 'p1', name: 'Linen Summer Blazer', price: 189, image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=800&auto=format&fit=crop' },
        { id: 'p2', name: 'Suede Loafers', price: 145, image: 'https://images.unsplash.com/photo-1614252339460-54f447d885e7?q=80&w=800&auto=format&fit=crop' }
      ]
    },
    {
      id: '2',
      name: 'Gift Ideas',
      items: [
        { id: 'p3', name: 'Ceramic Mug', price: 24, image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800&auto=format&fit=crop' }
      ]
    }
  ]);
  
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const duplicateList = (list: Wishlist) => {
    const newList = {
      ...list,
      id: Date.now().toString(),
      name: `${list.name} (Copy)`
    };
    setLists([...lists, newList]);
    setActiveMenuId(null);
    alert('Wishlist duplicated!');
  };

  const deleteList = (listId: string) => {
    setLists(lists.filter(l => l.id !== listId));
    setActiveMenuId(null);
  };

  const shareList = (list: Wishlist) => {
    navigator.clipboard.writeText(`https://commercex.com/shared-list/${list.id}`);
    setActiveMenuId(null);
    alert('Share link copied to clipboard!');
  };

  const removeItem = (listId: string, itemId: string) => {
    setLists(lists.map(list => {
      if (list.id === listId) {
        return { ...list, items: list.items.filter(item => item.id !== itemId) };
      }
      return list;
    }));
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Wishlists</h1>
          <p className="text-gray-500">Manage and share your saved items.</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-black dark:bg-white text-white dark:text-black font-bold rounded-lg hover:bg-gray-900 transition-colors">
          <Plus className="w-4 h-4 mr-2" /> Create List
        </button>
      </div>

      <div className="space-y-12">
        {lists.map(list => (
          <div key={list.id} className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-800 shadow-sm relative">
            
            {/* List Header & Actions */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <Heart className="w-5 h-5 mr-3 text-red-500 fill-red-500" />
                {list.name} <span className="ml-2 text-sm text-gray-400 font-normal">({list.items.length} items)</span>
              </h2>
              
              <div className="relative">
                <button 
                  onClick={() => setActiveMenuId(activeMenuId === list.id ? null : list.id)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-gray-500" />
                </button>

                {/* Dropdown Menu */}
                {activeMenuId === list.id && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden z-10">
                    <button onClick={() => { setActiveMenuId(null); alert('Edit list modal'); }} className="w-full flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <Edit2 className="w-4 h-4 mr-3 text-gray-400" /> Rename
                    </button>
                    <button onClick={() => shareList(list)} className="w-full flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <Share2 className="w-4 h-4 mr-3 text-gray-400" /> Share List
                    </button>
                    <button onClick={() => duplicateList(list)} className="w-full flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <Copy className="w-4 h-4 mr-3 text-gray-400" /> Duplicate List
                    </button>
                    <button onClick={() => deleteList(list.id)} className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                      <Trash2 className="w-4 h-4 mr-3" /> Delete List
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Items Grid */}
            {list.items.length === 0 ? (
              <p className="text-gray-500 py-8 text-center bg-gray-50 dark:bg-gray-800/50 rounded-2xl">This list is empty.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {list.items.map(item => (
                  <div key={item.id} className="group relative">
                    <div className="aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden mb-3 relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <button 
                        onClick={() => removeItem(list.id, item.id)}
                        className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <Link href={`/products/${item.id}`} className="font-medium text-gray-900 dark:text-white line-clamp-1 group-hover:underline">
                      {item.name}
                    </Link>
                    <p className="text-gray-500">${item.price.toFixed(2)}</p>
                    <button className="mt-3 w-full py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm">
                      Move to Cart
                    </button>
                  </div>
                ))}
              </div>
            )}
            
          </div>
        ))}
      </div>
    </div>
  );
}
