import { PageHero } from '@/components/static/PageHero';

export default function AboutPage() {
  const team = [
    { name: 'Sarah Jenkins', role: 'Chief Executive Officer', image: 'https://i.pravatar.cc/300?u=sarah' },
    { name: 'David Chen', role: 'Chief Technology Officer', image: 'https://i.pravatar.cc/300?u=david' },
    { name: 'Elena Rodriguez', role: 'Head of Design', image: 'https://i.pravatar.cc/300?u=elena' },
    { name: 'Michael Brown', role: 'Head of Product', image: 'https://i.pravatar.cc/300?u=michael' },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-black pb-24">
      <PageHero 
        title="We are redefining commerce." 
        subtitle="Our mission is to empower merchants with the tools they need to build incredible digital experiences."
        backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2850&auto=format&fit=crop"
      />

      {/* Our Mission */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Founded in 2020, we started with a simple observation: building a truly custom, high-performance 
              ecommerce site was too difficult. The existing platforms were either too rigid, or required massive 
              engineering teams to maintain.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              We built CommerceX to bridge that gap. A headless, composable architecture that gives designers 
              and developers absolute freedom, without sacrificing the robust backend needed to scale a global business.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop" alt="Office" className="rounded-2xl w-full h-64 object-cover" />
            <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1000&auto=format&fit=crop" alt="Team" className="rounded-2xl w-full h-64 object-cover mt-8" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl sm:text-5xl font-extrabold text-black dark:text-white mb-2">50k+</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Merchants</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-extrabold text-black dark:text-white mb-2">$2B+</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">GMV Processed</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-extrabold text-black dark:text-white mb-2">99.99%</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Uptime</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-extrabold text-black dark:text-white mb-2">120+</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Team Members</div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Meet the Leadership</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">The experienced team guiding our vision.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {team.map((member) => (
            <div key={member.name} className="text-center group">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
              <p className="text-gray-500 dark:text-gray-400">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
