'use client';

import { useState, useMemo } from 'react';
import { Product } from '@/lib/types';
import { X } from 'lucide-react';

interface FilterPanelProps {
  filters: any;
  onFiltersChange: (filters: any) => void;
  products: Product[];
}

export default function FilterPanel({ filters, onFiltersChange, products }: FilterPanelProps) {
  const [priceMin, setPriceMin] = useState(filters.priceMin || '');
  const [priceMax, setPriceMax] = useState(filters.priceMax || '');
  const [selectedBrands, setSelectedBrands] = useState<string[]>(filters.brands || []);
  const [minRating, setMinRating] = useState(filters.minRating || '');

  const availableBrands = useMemo(() => {
    const brands = new Set<string>();
    products.forEach(p => {
      if (p.brand) brands.add(p.brand);
    });
    return Array.from(brands).sort();
  }, [products]);

  const applyFilters = () => {
    onFiltersChange({
      priceMin: priceMin ? parseFloat(priceMin) : undefined,
      priceMax: priceMax ? parseFloat(priceMax) : undefined,
      brands: selectedBrands.length > 0 ? selectedBrands : undefined,
      minRating: minRating ? parseFloat(minRating) : undefined,
    });
  };

  const clearFilters = () => {
    setPriceMin('');
    setPriceMax('');
    setSelectedBrands([]);
    setMinRating('');
    onFiltersChange({});
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  return (
    <div className="border-t border-gray-200 pt-4 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            محدوده قیمت (تومان)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="از"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              className="input text-sm w-full"
            />
            <input
              type="number"
              placeholder="تا"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              className="input text-sm w-full"
            />
          </div>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            حداقل امتیاز
          </label>
          <select
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            className="input text-sm w-full"
          >
            <option value="">همه</option>
            <option value="4">4 ستاره و بالاتر</option>
            <option value="3">3 ستاره و بالاتر</option>
            <option value="2">2 ستاره و بالاتر</option>
          </select>
        </div>

        {/* Brands */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            برند
          </label>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {availableBrands.slice(0, 15).map(brand => (
              <button
                key={brand}
                onClick={() => toggleBrand(brand)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedBrands.includes(brand)
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={applyFilters}
          className="btn-primary text-sm"
        >
          اعمال فیلتر
        </button>
        <button
          onClick={clearFilters}
          className="btn-secondary text-sm flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          پاک کردن فیلترها
        </button>
      </div>
    </div>
  );
}
