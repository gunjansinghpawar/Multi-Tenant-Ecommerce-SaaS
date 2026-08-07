import { PageHero } from '@/components/static/PageHero';
import { DollarSign, BarChart2, Globe, ArrowRight } from 'lucide-react';

export default function AffiliatePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black pb-24">
      <PageHero 
        title="Join the CommerceX Affiliate Program" 
        subtitle="Earn industry-leading commissions by referring the world's most powerful commerce platform."
        backgroundImage="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop"
      />

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-16">Why partner with us?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
              <DollarSign className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">20% Recurring Commission</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Earn a 20% cut of the merchant's subscription fee for the first 12 months they are active.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6">
              <BarChart2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">High Conversion Rates</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Our platform sells itself. Benefit from our optimized funnels and dedicated sales team.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-green-600 dark:text-green-400 mb-6">
              <Globe className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Global Reach</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Promote CommerceX to merchants anywhere in the world. We support 100+ currencies and languages.
            </p>
          </div>
        </div>

        <div className="mt-20 p-12 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Ready to start earning?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Apply now to get your unique tracking link, creative assets, and access to our partner dashboard.
          </p>
          <button className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-black dark:bg-white dark:text-black rounded-full hover:bg-gray-900 dark:hover:bg-gray-100 transition-all">
            Apply Now <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </section>
    </main>
  );
}
