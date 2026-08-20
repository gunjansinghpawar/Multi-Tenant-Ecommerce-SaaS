import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | CommerceX',
  description: 'Information regarding how and why we use cookies on the CommerceX platform.',
};

export default function CookiePolicyPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-32 bg-background">
      <section className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Cookie Policy</h1>
          <p className="text-muted-foreground">Last updated: October 24, 2024</p>
        </div>
        
        <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground prose-headings:text-foreground">
          <h2>1. What Are Cookies?</h2>
          <p>
            Cookies are small text files stored on your device when you visit a website. They are widely used to make websites work more efficiently and to provide statistical data to site owners.
          </p>
          
          <h2>2. How We Use Cookies</h2>
          <p>
            CommerceX uses cookies for the following purposes:
          </p>
          <ul>
            <li><strong>Strictly Necessary:</strong> Essential for authentication, security, and load balancing across our edge nodes.</li>
            <li><strong>Performance:</strong> To monitor system health, page load speeds, and API latencies.</li>
            <li><strong>Functional:</strong> To remember your preferences, such as light/dark mode and language settings.</li>
            <li><strong>Analytics:</strong> To understand how visitors interact with our marketing pages (using anonymized, aggregate data).</li>
          </ul>

          <h2>3. Managing Cookies</h2>
          <p>
            You can control or delete cookies through your browser settings. Note that disabling strictly necessary cookies will prevent you from accessing the Super Admin or Tenant Admin dashboards.
          </p>
        </div>
      </section>
    </div>
  );
}
