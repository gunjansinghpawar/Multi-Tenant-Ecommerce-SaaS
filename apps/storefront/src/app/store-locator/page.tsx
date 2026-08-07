'use client';

import { useState } from 'react';
import { Search, MapPin, Phone, Clock, Navigation } from 'lucide-react';

export default function StoreLocatorPage() {
  const [search, setSearch] = useState('');

  const stores = [
    { id: 1, name: 'San Francisco Flagship', address: '100 Market St, San Francisco, CA 94105', phone: '(415) 555-0101', hours: 'Mon-Sat: 10am - 8pm, Sun: 11am - 6pm' },
    { id: 2, name: 'New York SoHo', address: '123 Prince St, New York, NY 10012', phone: '(212) 555-0102', hours: 'Mon-Sat: 10am - 9pm, Sun: 11am - 7pm' },
    { id: 3, name: 'London Covent Garden', address: '45 Floral St, London WC2E 9DA, UK', phone: '+44 20 7946 0103', hours: 'Mon-Sat: 10am - 7pm, Sun: 12pm - 6pm' },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-black flex flex-col">
      <div className="flex-1 flex flex-col lg:flex-row h-screen max-h-screen overflow-hidden">
        
        {/* Sidebar / List */}
        <div className="w-full lg:w-[400px] xl:w-[450px] flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-10 shadow-xl">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Find a Store</h1>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="City, State, or Zip Code"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-colors"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {stores.map(store => (
              <div key={store.id} className="p-5 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white cursor-pointer transition-colors group">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400">{store.name}</h3>
                
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0" />
                    <span>{store.address}</span>
                  </div>
                  <div className="flex items-start">
                    <Phone className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0" />
                    <span>{store.phone}</span>
                  </div>
                  <div className="flex items-start">
                    <Clock className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0" />
                    <span>{store.hours}</span>
                  </div>
                </div>

                <button className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <Navigation className="w-4 h-4 mr-2" /> Get Directions
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Map Area (Mock) */}
        <div className="flex-1 relative bg-gray-100 dark:bg-gray-800 h-full min-h-[400px]">
          {/* Simulated Map Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-50 dark:opacity-30" 
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop)' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 dark:bg-black/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl text-center max-w-sm">
              <MapPin className="w-8 h-8 text-black dark:text-white mx-auto mb-3" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Interactive Map Placeholder</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">In a production environment, this would integrate with Google Maps or Mapbox APIs.</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
