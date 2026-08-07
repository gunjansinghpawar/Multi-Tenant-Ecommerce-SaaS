import { PageHero } from '@/components/static/PageHero';
import { Download, ExternalLink } from 'lucide-react';

export default function PressPage() {
  const pressReleases = [
    { id: 1, title: 'CommerceX Announces $50M Series B to Accelerate Global Expansion', date: 'June 12, 2026' },
    { id: 2, title: 'CommerceX Launches New AI-Powered Recommendation Engine', date: 'April 05, 2026' },
    { id: 3, title: 'CommerceX Partners with Stripe to Revolutionize Checkout', date: 'January 20, 2026' },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-black pb-24">
      <PageHero 
        title="Press & Media" 
        subtitle="The latest news, announcements, and resources for media professionals."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Content */}
          <div className="lg:col-span-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Press Releases</h2>
            <div className="space-y-6">
              {pressReleases.map(release => (
                <div key={release.id} className="pb-6 border-b border-gray-100 dark:border-gray-800 last:border-0">
                  <p className="text-sm font-medium text-gray-500 mb-2">{release.date}</p>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-blue-600 transition-colors cursor-pointer">
                    {release.title}
                  </h3>
                  <button className="text-blue-600 font-medium inline-flex items-center hover:underline">
                    Read release <ExternalLink className="w-4 h-4 ml-1" />
                  </button>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 mt-16">In The News</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 block">TechCrunch</span>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">How CommerceX is redefining headless commerce for the mid-market.</h4>
                  <button className="text-blue-600 font-medium hover:underline text-sm">Read article</button>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar / Resources */}
          <div className="lg:col-span-4">
            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Media Kit</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                Download our official logos, brand guidelines, and executive headshots.
              </p>
              
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl hover:border-black dark:hover:border-white transition-colors">
                  <span className="font-medium text-sm">Brand Guidelines (PDF)</span>
                  <Download className="w-4 h-4 text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl hover:border-black dark:hover:border-white transition-colors">
                  <span className="font-medium text-sm">Logo Pack (ZIP)</span>
                  <Download className="w-4 h-4 text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl hover:border-black dark:hover:border-white transition-colors">
                  <span className="font-medium text-sm">Executive Photos (ZIP)</span>
                  <Download className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Media Contact</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Jane Doe, Head of PR</p>
                <a href="mailto:press@commercex.com" className="text-sm text-blue-600 hover:underline">press@commercex.com</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
