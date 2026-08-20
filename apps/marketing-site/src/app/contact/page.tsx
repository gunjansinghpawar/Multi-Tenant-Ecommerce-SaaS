import { Metadata } from 'next';
import { Button } from '@commercex/ui';
import { Mail, MessageSquare, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | CommerceX',
  description: 'Get in touch with the CommerceX sales, support, or partnership teams.',
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-32 bg-background">
      <section className="container mx-auto px-4 md:px-6 mb-16 text-center">
        <h1 className="text-display tracking-tight text-foreground mb-6">
          Get in touch.
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Whether you need technical support, enterprise sales, or partnership details, our team is here to help.
        </p>
      </section>

      <section className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-[24px] border border-border bg-card text-center space-y-4">
            <MessageSquare className="mx-auto h-8 w-8 text-primary" />
            <h3 className="text-lg font-bold">Support</h3>
            <p className="text-muted-foreground text-sm">Technical assistance for merchants.</p>
            <Button variant="outline" className="w-full mt-4 rounded-full">Open Ticket</Button>
          </div>
          <div className="p-8 rounded-[24px] border border-border bg-card text-center space-y-4">
            <Phone className="mx-auto h-8 w-8 text-primary" />
            <h3 className="text-lg font-bold">Sales</h3>
            <p className="text-muted-foreground text-sm">Enterprise & volume pricing inquiries.</p>
            <Button variant="outline" className="w-full mt-4 rounded-full">Contact Sales</Button>
          </div>
          <div className="p-8 rounded-[24px] border border-border bg-card text-center space-y-4">
            <Mail className="mx-auto h-8 w-8 text-primary" />
            <h3 className="text-lg font-bold">Partnerships</h3>
            <p className="text-muted-foreground text-sm">Agency and technology partners.</p>
            <Button variant="outline" className="w-full mt-4 rounded-full">Email Team</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
