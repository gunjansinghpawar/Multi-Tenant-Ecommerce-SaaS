import React from 'react';
import { Metadata } from 'next';
import { Button } from '@commercex/ui';
import { Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing | CommerceX',
  description: 'Simple, transparent pricing for growing ecommerce businesses. Choose the plan that fits your scale.',
};

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for new businesses getting off the ground.',
    price: '$29',
    period: '/mo',
    features: ['1 Storefront', 'Unlimited Products', 'Basic Analytics', 'Standard Themes', 'Community Support'],
    cta: 'Start Free Trial',
    popular: false
  },
  {
    name: 'Growth',
    description: 'For scaling brands needing advanced tools.',
    price: '$99',
    period: '/mo',
    features: ['Up to 3 Storefronts', 'Advanced Analytics', 'WhatsApp Automation', 'Custom Domains', 'Priority Support', 'Abandoned Cart Recovery'],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    description: 'For agencies and high-volume merchants.',
    price: 'Custom',
    period: '',
    features: ['Unlimited Storefronts', 'Headless API Access', 'Custom Integrations', 'Dedicated Account Manager', 'SLA Guarantee', 'White-labeling'],
    cta: 'Contact Sales',
    popular: false
  }
];

export default function PricingPage() {
  return (
    <div className="pt-24 pb-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">Simple, transparent pricing</h1>
          <p className="text-xl text-muted-foreground">
            No hidden fees. No surprise charges. Choose the plan that fits your growth stage.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`relative flex flex-col p-8 rounded-3xl border ${plan.popular ? 'border-primary shadow-xl shadow-primary/10 bg-card' : 'border-border bg-background'}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm min-h-[40px]">{plan.description}</p>
              </div>
              
              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-5xl font-extrabold">{plan.price}</span>
                <span className="text-muted-foreground font-medium">{plan.period}</span>
              </div>
              
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={18} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                size="lg" 
                variant={plan.popular ? 'default' : 'outline'} 
                className={`w-full rounded-full ${plan.popular ? 'shadow-lg shadow-primary/25' : ''}`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
