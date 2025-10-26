'use client';

import { useState, useEffect } from 'react';
import { categories } from '@/lib/categories';
import { Product } from '@/lib/types';
import Dashboard from '@/components/Dashboard';
import CategorySelector from '@/components/CategorySelector';
import { LayoutDashboard } from 'lucide-react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const handleCategorySelect = async (categoryId: string, subcategoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(subcategoryId);
    setLoading(true);

    try {
      const response = await fetch(
        `/api/scrape?category=${categoryId}&subcategory=${subcategoryId}`
      );
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-8 h-8 text-primary-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  ابزار تحلیل بازارهای آنلاین ایران
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  تحلیل هوشمند و جامع محصولات فروشگاه‌های اینترنتی
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {!selectedCategory || !selectedSubcategory ? (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                انتخاب دسته‌بندی
              </h2>
              <p className="text-gray-600 mb-6">
                برای شروع تحلیل، یک دسته‌بندی و زیردسته را انتخاب کنید
              </p>
            </div>
            
            <CategorySelector onSelect={handleCategorySelect} />
          </div>
        ) : (
          <Dashboard
            category={selectedCategory}
            subcategory={selectedSubcategory}
            products={products}
            loading={loading}
            onBack={() => {
              setSelectedCategory(null);
              setSelectedSubcategory(null);
              setProducts([]);
            }}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600 text-sm">
            ابزار تحلیل بازارهای آنلاین ایران - نسخه 1.0.0
          </p>
        </div>
      </footer>
    </main>
  );
}
