'use client';

import { useState } from 'react';
import { EmptyState } from '@/components/states/EmptyState';
import { StatusState } from '@/components/states/StatusState';
import { SkeletonGrid } from '@/components/states/SkeletonGrid';
import { PackageX, ShoppingBag, HeartCrack, SearchX, ShoppingCart, AlertOctagon, Lock, Wrench, WifiOff, CheckCircle } from 'lucide-react';

export default function StatesDemoPage() {
  const [activeTab, setActiveTab] = useState<'empty' | 'status' | 'skeleton'>('empty');
  
  return (
    <div className="min-h-screen bg-white dark:bg-black pb-24">
      {/* Header */}
      <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
            Global Page States Engine
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
            A centralized system for handling all 12 requested scenarios using just three highly flexible components.
          </p>
          
          <div className="flex justify-center space-x-2">
            <button 
              onClick={() => setActiveTab('empty')}
              className={`px-6 py-2 rounded-full font-bold transition-colors ${activeTab === 'empty' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}`}
            >
              Empty States
            </button>
            <button 
              onClick={() => setActiveTab('status')}
              className={`px-6 py-2 rounded-full font-bold transition-colors ${activeTab === 'status' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}`}
            >
              Status / Errors
            </button>
            <button 
              onClick={() => setActiveTab('skeleton')}
              className={`px-6 py-2 rounded-full font-bold transition-colors ${activeTab === 'skeleton' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}`}
            >
              Loading Skeletons
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {activeTab === 'empty' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-800 font-bold text-sm text-center">No Products</div>
              <EmptyState icon={PackageX} title="No Products Found" description="We couldn't find any products matching your current filters." actionText="Clear Filters" />
            </div>
            
            <div className="border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-800 font-bold text-sm text-center">No Orders</div>
              <EmptyState icon={ShoppingBag} title="No Order History" description="You haven't placed any orders with us yet." actionText="Start Shopping" />
            </div>

            <div className="border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-800 font-bold text-sm text-center">No Wishlist</div>
              <EmptyState icon={HeartCrack} title="Your Wishlist is Empty" description="Save items you love to your wishlist to review them later." actionText="Explore Items" />
            </div>

            <div className="border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-800 font-bold text-sm text-center">No Search Results</div>
              <EmptyState icon={SearchX} title="No Results" description="We couldn't find anything matching your search." actionText="Try a different term" />
            </div>
          </div>
        )}

        {activeTab === 'status' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden flex flex-col">
              <div className="bg-gray-50 dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-800 font-bold text-sm text-center">Error State</div>
              <div className="flex-1 -mt-12"><StatusState type="error" icon={AlertOctagon} title="Something went wrong" description="We encountered an unexpected error while processing your request." actionText="Try Again" /></div>
            </div>

            <div className="border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden flex flex-col">
              <div className="bg-gray-50 dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-800 font-bold text-sm text-center">Permission Required</div>
              <div className="flex-1 -mt-12"><StatusState type="warning" icon={Lock} title="Login Required" description="You must be logged into a wholesale account to view this page." actionText="Log In" /></div>
            </div>

            <div className="border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden flex flex-col">
              <div className="bg-gray-50 dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-800 font-bold text-sm text-center">Maintenance</div>
              <div className="flex-1 -mt-12"><StatusState type="info" icon={Wrench} title="Under Maintenance" description="We are currently upgrading our systems. Please check back in a few minutes." actionText="Check Status Page" /></div>
            </div>

            <div className="border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden flex flex-col">
              <div className="bg-gray-50 dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-800 font-bold text-sm text-center">Offline</div>
              <div className="flex-1 -mt-12"><StatusState type="error" icon={WifiOff} title="You are offline" description="Please check your internet connection and try again." actionText="Retry Connection" /></div>
            </div>
          </div>
        )}

        {activeTab === 'skeleton' && (
          <div className="border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden p-8">
            <h2 className="text-2xl font-bold mb-8">Loading State</h2>
            <SkeletonGrid count={4} />
          </div>
        )}
      </div>
    </div>
  );
}
