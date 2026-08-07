import { ProductReviews } from '@/components/reviews/ProductReviews';

export default function TestReviewsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Product Details Page</h1>
        <p className="text-gray-500 dark:text-gray-400">
          This is a simulated product page to test the Reviews & QnA component.
        </p>
      </div>

      {/* The Reviews Component */}
      <ProductReviews productId="test-product-123" />
    </main>
  );
}
