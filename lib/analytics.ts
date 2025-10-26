import { Product, Analytics, BrandStats, TitleStats, PriceDistribution, KeywordAnalysis } from './types';

export function calculateAnalytics(products: Product[]): Analytics {
  if (products.length === 0) {
    return {
      totalProducts: 0,
      averagePrice: 0,
      priceRange: { min: 0, max: 0 },
      topBrands: [],
      topTitles: [],
      trendingProducts: [],
      priceDistribution: [],
      salesByTime: [],
    };
  }

  const prices = products.map(p => p.price);
  const totalProducts = products.length;
  const averagePrice = prices.reduce((a, b) => a + b, 0) / totalProducts;
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  return {
    totalProducts,
    averagePrice,
    priceRange: { min: minPrice, max: maxPrice },
    topBrands: calculateTopBrands(products),
    topTitles: calculateTopTitles(products),
    trendingProducts: findTrendingProducts(products),
    priceDistribution: calculatePriceDistribution(products),
    salesByTime: calculateSalesByTime(products),
  };
}

export function calculateTopBrands(products: Product[]): BrandStats[] {
  const brandMap = new Map<string, { count: number; totalPrice: number; totalRating: number; ratingCount: number }>();

  products.forEach(product => {
    if (!product.brand) return;
    
    const existing = brandMap.get(product.brand) || { count: 0, totalPrice: 0, totalRating: 0, ratingCount: 0 };
    existing.count++;
    existing.totalPrice += product.price;
    if (product.rating) {
      existing.totalRating += product.rating;
      existing.ratingCount++;
    }
    brandMap.set(product.brand, existing);
  });

  return Array.from(brandMap.entries())
    .map(([brand, stats]) => ({
      brand,
      count: stats.count,
      averagePrice: stats.totalPrice / stats.count,
      averageRating: stats.ratingCount > 0 ? stats.totalRating / stats.ratingCount : undefined,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

export function calculateTopTitles(products: Product[]): TitleStats[] {
  return products
    .filter(p => p.viewCount && p.salesCount)
    .map((p, index) => ({
      title: p.title,
      viewCount: p.viewCount || 0,
      salesCount: p.salesCount || 0,
      conversionRate: p.viewCount ? (p.salesCount || 0) / p.viewCount : 0,
      rank: index + 1,
    }))
    .sort((a, b) => b.conversionRate - a.conversionRate)
    .slice(0, 20);
}

export function findTrendingProducts(products: Product[]): Product[] {
  // Products with high sales in recent time
  const recentCutoff = Date.now() - 30 * 24 * 60 * 60 * 1000; // 30 days
  
  return products
    .filter(p => {
      const listedDate = p.listedDate ? new Date(p.listedDate).getTime() : 0;
      return listedDate > recentCutoff && p.salesCount && p.salesCount > 10;
    })
    .sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0))
    .slice(0, 10);
}

export function calculatePriceDistribution(products: Product[]): PriceDistribution[] {
  const prices = products.map(p => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  
  const ranges = [
    { min: minPrice, max: minPrice + (maxPrice - minPrice) * 0.2, label: 'خیلی ارزان' },
    { min: minPrice + (maxPrice - minPrice) * 0.2, max: minPrice + (maxPrice - minPrice) * 0.4, label: 'ارزان' },
    { min: minPrice + (maxPrice - minPrice) * 0.4, max: minPrice + (maxPrice - minPrice) * 0.6, label: 'متوسط' },
    { min: minPrice + (maxPrice - minPrice) * 0.6, max: minPrice + (maxPrice - minPrice) * 0.8, label: 'گران' },
    { min: minPrice + (maxPrice - minPrice) * 0.8, max: maxPrice, label: 'خیلی گران' },
  ];

  const distribution = ranges.map(range => {
    const count = products.filter(p => p.price >= range.min && p.price < range.max).length;
    return {
      range: `${formatPrice(range.min)} - ${formatPrice(range.max)}`,
      count,
      percentage: (count / products.length) * 100,
    };
  });

  return distribution;
}

export function calculateSalesByTime(products: Product[]): any[] {
  const salesByDate = new Map<string, { sales: number; views: number }>();

  products.forEach(product => {
    if (!product.listedDate) return;
    
    const date = new Date(product.listedDate).toISOString().split('T')[0];
    const existing = salesByDate.get(date) || { sales: 0, views: 0 };
    existing.sales += product.salesCount || 0;
    existing.views += product.viewCount || 0;
    salesByDate.set(date, existing);
  });

  return Array.from(salesByDate.entries())
    .map(([date, stats]) => ({
      date,
      sales: stats.sales,
      views: stats.views,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function analyzeKeywords(products: Product[]): KeywordAnalysis[] {
  const keywordMap = new Map<string, { count: number; totalPrice: number; products: Set<string> }>();

  products.forEach(product => {
    const words = product.title.split(/\s+/).filter(w => w.length > 2);
    
    words.forEach(word => {
      const normalized = word.toLowerCase();
      const existing = keywordMap.get(normalized) || { count: 0, totalPrice: 0, products: new Set() };
      existing.count++;
      existing.totalPrice += product.price;
      existing.products.add(product.id);
      keywordMap.set(normalized, existing);
    });
  });

  return Array.from(keywordMap.entries())
    .map(([keyword, stats]) => ({
      keyword,
      frequency: stats.count,
      averagePrice: stats.totalPrice / stats.count,
      productCount: stats.products.size,
      trend: 'stable' as const, // Would need historical data for real trend
    }))
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 50);
}

export function filterProducts(products: Product[], filters: any): Product[] {
  return products.filter(product => {
    if (filters.priceMin && product.price < filters.priceMin) return false;
    if (filters.priceMax && product.price > filters.priceMax) return false;
    if (filters.brands && filters.brands.length > 0 && !filters.brands.includes(product.brand)) return false;
    if (filters.minRating && product.rating && product.rating < filters.minRating) return false;
    if (filters.dateFrom && product.listedDate && product.listedDate < filters.dateFrom) return false;
    if (filters.dateTo && product.listedDate && product.listedDate > filters.dateTo) return false;
    return true;
  });
}

export function sortProducts(products: Product[], sortBy: string, order: 'asc' | 'desc' = 'desc'): Product[] {
  const sorted = [...products];
  
  sorted.sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'price':
        comparison = a.price - b.price;
        break;
      case 'popularity':
        comparison = (a.viewCount || 0) - (b.viewCount || 0);
        break;
      case 'date':
        comparison = (a.listedDate || '').localeCompare(b.listedDate || '');
        break;
      case 'rating':
        comparison = (a.rating || 0) - (b.rating || 0);
        break;
      case 'sales':
        comparison = (a.salesCount || 0) - (b.salesCount || 0);
        break;
      default:
        comparison = 0;
    }
    
    return order === 'asc' ? comparison : -comparison;
  });
  
  return sorted;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('fa-IR').format(Math.floor(price));
}
