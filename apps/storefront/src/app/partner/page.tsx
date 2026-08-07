import { PageHero } from '@/components/static/PageHero';
import { Layers, Users, Zap, CheckCircle2 } from 'lucide-react';

export default function PartnerPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black pb-24">
      <PageHero 
        title="Agency & Technology Partners" 
        subtitle="Build the future of commerce for your clients with our enterprise-grade APIs and robust developer tooling."
        align="left"
        className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800"
      />

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Designed for Agencies</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Stop fighting with legacy monoliths. Our headless architecture gives your development team the freedom to build bespoke storefronts using any frontend framework, while relying on our scalable backend for checkout, inventory, and logic.
            </p>
            <ul className="space-y-4 mb-8">
              {['Dedicated Partner Manager', 'Revenue Share Program', 'Co-Marketing Opportunities', 'Sandbox Environments'].map(item => (
                <li key={item} className="flex items-center text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                  {item}
                </li>
              ))}
            </ul>
            <button className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors">
              Become a Partner
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             <div className="bg-white dark:bg-black p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl shadow-black/5 dark:shadow-white/5">
                <Layers className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-6" />
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Flexible APIs</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm">GraphQL and REST APIs designed for maximum extensibility.</p>
             </div>
             <div className="bg-white dark:bg-black p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl shadow-black/5 dark:shadow-white/5 mt-0 sm:mt-12">
                <Users className="w-10 h-10 text-purple-600 dark:text-purple-400 mb-6" />
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Client Management</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Manage all your client stores from a single unified dashboard.</p>
             </div>
             <div className="bg-white dark:bg-black p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl shadow-black/5 dark:shadow-white/5">
                <Zap className="w-10 h-10 text-orange-600 dark:text-orange-400 mb-6" />
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Priority Support</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Direct Slack channels with our engineering team for fast resolution.</p>
             </div>
          </div>
        </div>
      </section>
    </main>
  );
}
