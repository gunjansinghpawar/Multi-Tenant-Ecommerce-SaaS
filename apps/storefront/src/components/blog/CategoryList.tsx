import { Category } from './types';

interface CategoryListProps {
  categories: Category[];
  activeCategorySlug?: string;
  onSelectCategory: (slug: string) => void;
}

export function CategoryList({ categories, activeCategorySlug, onSelectCategory }: CategoryListProps) {
  return (
    <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
      <div className="flex space-x-2">
        <button
          onClick={() => onSelectCategory('all')}
          className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            !activeCategorySlug || activeCategorySlug === 'all'
              ? 'bg-black text-white dark:bg-white dark:text-black'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          All Articles
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.slug)}
            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategorySlug === category.slug
                ? 'bg-black text-white dark:bg-white dark:text-black'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
