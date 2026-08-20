import { Metadata } from 'next';
import { Button, Card, CardContent } from '@commercex/ui';
import { LayoutDashboard, ShoppingCart, BarChart, Bot, Smartphone, CreditCard, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'All Features | CommerceX',
  description: 'Explore the complete feature set of the CommerceX platform. From visual store building to AI automation, discover everything you need to run your ecommerce business.',
};

const featureCategories = [
  {
    title: 'Store Builder',
    description: 'Design without limits using our visual editor.',
    icon: LayoutDashboard,
    href: '/features/store-builder',
  },
  {
    title: 'Commerce Engine',
    description: 'Manage products, inventory, and complex variants.',
    icon: ShoppingCart,
    href: '/features/commerce',
  },
  {
    title: 'Analytics & SEO',
    description: 'Real-time dashboards and technical SEO tools.',
    icon: BarChart,
    href: '/features/analytics',
  },
  {
    title: 'AI Intelligence',
    description: 'Automate descriptions, recommendations, and insights.',
    icon: Bot,
    href: '/features/ai',
  },
  {
    title: 'WhatsApp Automation',
    description: 'Recover carts and notify customers natively.',
    icon: Smartphone,
    href: '/features/whatsapp',
  },
  {
    title: 'Headless API',
    description: 'Build custom frontends with our robust API.',
    icon: CreditCard,
    href: '/features/headless-commerce',
  },
];

export default function FeaturesIndexPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-32">
      {/* Hero Section */}
      <section className="relative px-4 md:px-6 mb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background pointer-events-none -z-10" />
        <div className="container mx-auto max-w-5xl text-center space-y-6">
          <h1 className="text-display tracking-tight text-foreground">
            Everything you need.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-info">Built in.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Stop stitching together dozens of plugins. CommerceX provides a unified, enterprise-grade feature set out of the box.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCategories.map((feature) => (
            <Link key={feature.title} href={feature.href} className="group">
              <Card className="h-full flex flex-col hover:border-primary/50 transition-colors duration-300">
                <CardContent className="p-8 flex flex-col flex-grow">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-h4 mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground mb-6 flex-grow">
                    {feature.description}
                  </p>
                  <div className="flex items-center text-primary font-medium text-sm mt-auto">
                    Explore feature <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
