import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | CommerceX',
  description: 'How CommerceX collects, uses, and protects your data.',
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-32 bg-background">
      <section className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: October 24, 2024</p>
        </div>
        
        <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground prose-headings:text-foreground">
          <h2>1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us (such as account registration details), information collected automatically (such as IP addresses and usage metrics), and information from third-party integrations you authorize.
          </p>
          
          <h2>2. How We Use Information</h2>
          <p>
            We use the information collected to operate, maintain, and improve the CommerceX platform. We do not sell your personal data or your customers' data to third-party data brokers under any circumstances.
          </p>
          
          <h2>3. Data Security</h2>
          <p>
            We employ enterprise-grade security measures including AES-256 encryption at rest and TLS 1.3 in transit. While no system is perfectly secure, we adhere to strict SOC2 compliance standards to protect your data.
          </p>

          <h2>4. GDPR and CCPA Rights</h2>
          <p>
            You have the right to request access, correction, or deletion of your personal data. Merchants are responsible for managing data deletion requests from their end-customers using our provided Data Privacy APIs.
          </p>
        </div>
      </section>
    </div>
  );
}
