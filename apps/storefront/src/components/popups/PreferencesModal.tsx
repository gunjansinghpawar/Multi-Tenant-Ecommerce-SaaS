'use client';

import { usePopupStore } from '@/store/usePopupStore';
import { X, Globe, MapPin, DollarSign } from 'lucide-react';
import { useState } from 'react';

export function PreferencesModal() {
  const { closePopup } = usePopupStore();
  
  const [language, setLanguage] = useState('English');
  const [currency, setCurrency] = useState('USD ($)');
  const [country, setCountry] = useState('United States');

  const handleSave = () => {
    alert(`Preferences saved: ${language}, ${currency}, ${country}`);
    closePopup();
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 w-full max-w-md relative animate-in slide-in-from-bottom-8 shadow-2xl border border-gray-100 dark:border-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Regional Settings</h3>
        <button 
          onClick={closePopup}
          className="p-2 text-gray-400 hover:text-black dark:hover:text-white bg-gray-50 dark:bg-gray-800 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="flex items-center text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            <MapPin className="w-4 h-4 mr-2" /> Country/Region
          </label>
          <select 
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white outline-none"
          >
            <option>United States</option>
            <option>United Kingdom</option>
            <option>Canada</option>
            <option>Australia</option>
            <option>India</option>
          </select>
        </div>

        <div>
          <label className="flex items-center text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            <Globe className="w-4 h-4 mr-2" /> Language
          </label>
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white outline-none"
          >
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
          </select>
        </div>

        <div>
          <label className="flex items-center text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            <DollarSign className="w-4 h-4 mr-2" /> Currency
          </label>
          <select 
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white outline-none"
          >
            <option>USD ($)</option>
            <option>EUR (€)</option>
            <option>GBP (£)</option>
            <option>INR (₹)</option>
          </select>
        </div>

        <button 
          onClick={handleSave}
          className="w-full py-4 font-bold rounded-xl text-white bg-black hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-100 transition-colors mt-4"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}
