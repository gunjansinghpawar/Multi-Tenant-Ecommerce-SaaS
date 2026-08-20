'use client';
import { motion } from 'framer-motion';
import { Users, MoreVertical, TrendingUp, TrendingDown } from 'lucide-react';

const clients = [
  { name: 'Acme Corp', id: 'ten_1029', status: 'Active', mrr: '$42,500', trend: 'up' },
  { name: 'Globex Inc', id: 'ten_9381', status: 'Active', mrr: '$12,400', trend: 'down' },
  { name: 'Soylent', id: 'ten_4412', status: 'Active', mrr: '$89,200', trend: 'up' },
  { name: 'Initech', id: 'ten_8832', status: 'Deploying', mrr: '--', trend: 'neutral' },
];

export function AgencyDashboard() {
  return (
    <section className="py-32 bg-background border-t border-border overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-h2 mb-4">Master control for Agencies.</h2>
          <p className="text-lg text-muted-foreground">Manage dozens of client storefronts from a single, unified Super Admin panel. Deploy updates, manage billing, and monitor health across your entire portfolio.</p>
        </div>

        {/* Dense UI Table Mockup */}
        <div className="max-w-5xl mx-auto bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
          <div className="p-4 border-b border-border bg-muted/50 flex justify-between items-center">
            <div className="flex items-center gap-2 font-medium">
              <Users size={18} className="text-primary" /> Agency Portfolio
            </div>
            <div className="text-sm text-muted-foreground">4 Total Tenants</div>
          </div>
          
          <div className="overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <table className="w-full text-left text-sm whitespace-nowrap min-w-[600px]">
              <thead className="bg-background text-muted-foreground border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-medium">Client Name</th>
                  <th className="px-6 py-4 font-medium">Tenant ID</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Monthly GMV</th>
                  <th className="px-6 py-4 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {clients.map((client, i) => (
                  <motion.tr 
                    key={client.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ backgroundColor: 'var(--tw-colors-muted-DEFAULT)' }}
                    className="group"
                  >
                    <td className="px-6 py-4 font-bold">{client.name}</td>
                    <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{client.id}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${client.status === 'Active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {client.mrr}
                        {client.trend === 'up' && <TrendingUp size={14} className="text-success" />}
                        {client.trend === 'down' && <TrendingDown size={14} className="text-destructive" />}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
