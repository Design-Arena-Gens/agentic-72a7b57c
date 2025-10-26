'use client';

import { useState, useMemo } from 'react';
import { Product } from '@/lib/types';
import { calculateAnalytics, filterProducts, sortProducts, analyzeKeywords } from '@/lib/analytics';
import { ArrowLeft, Download, Filter, Copy, TrendingUp } from 'lucide-react';
import ProductList from './ProductList';
import AnalyticsCharts from './AnalyticsCharts';
import FilterPanel from './FilterPanel';
import { exportToExcel, exportToCSV, exportToJSON } from '@/lib/export';

interface DashboardProps {
  category: string;
  subcategory: string;
  products: Product[];
  loading: boolean;
  onBack: () => void;
}

export default function Dashboard({
  category,
  subcategory,
  products,
  loading,
  onBack,
}: DashboardProps) {
  const [filters, setFilters] = useState<any>({});
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = filterProducts(products, filters);
    result = sortProducts(result, sortBy, sortOrder);
    return result;
  }, [products, filters, sortBy, sortOrder]);

  const analytics = useMemo(() => {
    return calculateAnalytics(filteredProducts);
  }, [filteredProducts]);

  const keywords = useMemo(() => {
    return analyzeKeywords(filteredProducts);
  }, [filteredProducts]);

  const handleExport = async (format: 'excel' | 'csv' | 'json') => {
    const filename = `${subcategory}_products_${Date.now()}`;
    
    switch (format) {
      case 'excel':
        await exportToExcel(filteredProducts, `${filename}.xlsx`);
        break;
      case 'csv':
        exportToCSV(filteredProducts, `${filename}.csv`);
        break;
      case 'json':
        exportToJSON(filteredProducts, `${filename}.json`);
        break;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">در حال دریافت اطلاعات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              بازگشت
            </button>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{subcategory}</h2>
              <p className="text-sm text-gray-600 mt-1">
                تعداد کل محصولات: {filteredProducts.length.toLocaleString('fa-IR')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              فیلتر
            </button>
            
            <div className="relative group">
              <button className="btn-primary flex items-center gap-2">
                <Download className="w-4 h-4" />
                خروجی
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                <button
                  onClick={() => handleExport('excel')}
                  className="w-full px-4 py-2 text-right hover:bg-gray-50 rounded-t-lg"
                >
                  Excel
                </button>
                <button
                  onClick={() => handleExport('csv')}
                  className="w-full px-4 py-2 text-right hover:bg-gray-50"
                >
                  CSV
                </button>
                <button
                  onClick={() => handleExport('json')}
                  className="w-full px-4 py-2 text-right hover:bg-gray-50 rounded-b-lg"
                >
                  JSON
                </button>
              </div>
            </div>
          </div>
        </div>

        {showFilters && (
          <FilterPanel
            filters={filters}
            onFiltersChange={setFilters}
            products={products}
          />
        )}
      </div>

      {/* Analytics */}
      <AnalyticsCharts analytics={analytics} keywords={keywords} />

      {/* Products */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">لیست محصولات</h3>
          
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input text-sm"
            >
              <option value="popularity">محبوب‌ترین</option>
              <option value="price">قیمت</option>
              <option value="date">جدیدترین</option>
              <option value="rating">امتیاز</option>
              <option value="sales">پرفروش‌ترین</option>
            </select>
            
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="btn-secondary text-sm"
            >
              {sortOrder === 'asc' ? '↑ صعودی' : '↓ نزولی'}
            </button>
          </div>
        </div>

        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
}
