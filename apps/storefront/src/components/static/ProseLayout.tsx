import React from 'react';

interface ProseLayoutProps {
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export function ProseLayout({ title, lastUpdated, children }: ProseLayoutProps) {
  return (
    <main className="min-h-screen bg-white dark:bg-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 text-center sm:text-left border-b border-gray-100 dark:border-gray-800 pb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            {title}
          </h1>
          {lastUpdated && (
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              Last updated: {lastUpdated}
            </p>
          )}
        </header>
        <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-500 prose-img:rounded-2xl">
          {children}
        </article>
      </div>
    </main>
  );
}
