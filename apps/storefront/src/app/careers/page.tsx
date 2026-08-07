import { PageHero } from '@/components/static/PageHero';
import { Briefcase, MapPin, ArrowRight } from 'lucide-react';

export default function CareersPage() {
  const jobs = [
    { id: '1', title: 'Senior Frontend Engineer', department: 'Engineering', location: 'Remote / San Francisco', type: 'Full-time' },
    { id: '2', title: 'Product Marketing Manager', department: 'Marketing', location: 'New York', type: 'Full-time' },
    { id: '3', title: 'UX/UI Designer', department: 'Design', location: 'Remote', type: 'Contract' },
    { id: '4', title: 'Customer Success Specialist', department: 'Support', location: 'London', type: 'Full-time' },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-black pb-24">
      <PageHero 
        title="Come build the future of commerce." 
        subtitle="Join our global team of innovators, creators, and problem solvers."
        backgroundImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop"
      />

      {/* Benefits */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why you'll love working here</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">We invest in our people so they can do their best work.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Remote-first culture', desc: 'Work from anywhere. We provide stipends for home office setups or co-working spaces.' },
            { title: 'Comprehensive health', desc: 'Premium medical, dental, and vision coverage for you and your dependents.' },
            { title: 'Continuous learning', desc: '$2,000 annual budget for conferences, courses, and books to help you grow.' }
          ].map((benefit) => (
            <div key={benefit.title} className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{benefit.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Open Positions</h2>
        
        <div className="space-y-4">
          {jobs.map(job => (
            <div key={job.id} className="group block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1.5" /> {job.department}</span>
                    <span className="flex items-center"><MapPin className="w-4 h-4 mr-1.5" /> {job.location}</span>
                    <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 rounded-md font-medium text-gray-700 dark:text-gray-300">
                      {job.type}
                    </span>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0">
                  <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
