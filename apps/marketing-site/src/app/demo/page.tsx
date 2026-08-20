import { Metadata } from 'next';
import { Button } from '@commercex/ui';
import { Calendar, Video } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Book a Demo | CommerceX',
  description: 'Schedule a personalized walkthrough of the CommerceX platform with our enterprise engineers.',
};

export default function DemoPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-32 bg-background">
      <section className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16 max-w-6xl mx-auto">
          <div className="w-full lg:w-1/2 space-y-8">
            <h1 className="text-display tracking-tight text-foreground">
              See it in action.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Book a 30-minute personalized walkthrough with an engineer. We'll show you how CommerceX can solve your specific scaling challenges.
            </p>
            <div className="space-y-4 pt-8 border-t border-border">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Video size={20} />
                </div>
                <div>
                  <h4 className="font-bold">Live Platform Tour</h4>
                  <p className="text-sm text-muted-foreground">Deep dive into the architecture.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Calendar size={20} />
                </div>
                <div>
                  <h4 className="font-bold">Migration Assessment</h4>
                  <p className="text-sm text-muted-foreground">Map your data from Shopify/Magento.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="bg-card border border-border rounded-[24px] p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Schedule your session</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <input className="w-full h-10 px-3 rounded-md border border-border bg-background" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <input className="w-full h-10 px-3 rounded-md border border-border bg-background" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Work Email</label>
                  <input type="email" className="w-full h-10 px-3 rounded-md border border-border bg-background" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company URL</label>
                  <input type="url" className="w-full h-10 px-3 rounded-md border border-border bg-background" />
                </div>
                <Button className="w-full h-12 text-base mt-4">Confirm Request</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
