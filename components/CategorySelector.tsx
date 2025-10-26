'use client';

import { categories } from '@/lib/categories';
import { ChevronRight } from 'lucide-react';

interface CategorySelectorProps {
  onSelect: (categoryId: string, subcategoryId: string) => void;
}

export default function CategorySelector({ onSelect }: CategorySelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <div key={category.id} className="card hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{category.icon}</span>
            <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
          </div>
          
          <div className="space-y-2">
            {category.subcategories.map((subcategory) => (
              <button
                key={subcategory.id}
                onClick={() => onSelect(category.id, subcategory.id)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-primary-50 transition-colors group"
              >
                <span className="text-gray-700 group-hover:text-primary-700 font-medium">
                  {subcategory.name}
                </span>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600" />
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
