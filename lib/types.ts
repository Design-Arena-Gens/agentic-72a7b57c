export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  currency: string;
  images: string[];
  description: string;
  viewCount?: number;
  salesCount?: number;
  rating?: number;
  reviewCount?: number;
  brand?: string;
  listedDate?: string;
  category: string;
  subcategory: string;
  source: string;
  sourceUrl: string;
  seller?: string;
  stock?: number;
  discount?: number;
  specifications?: Record<string, string>;
  scrapedAt: string;
}

export interface Category {
  id: string;
  name: string;
  nameEn: string;
  icon?: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  nameEn: string;
  categoryId: string;
  productCount?: number;
}

export interface Analytics {
  totalProducts: number;
  averagePrice: number;
  priceRange: {
    min: number;
    max: number;
  };
  topBrands: BrandStats[];
  topTitles: TitleStats[];
  trendingProducts: Product[];
  priceDistribution: PriceDistribution[];
  salesByTime: TimeSeriesData[];
  conversionRate?: number;
}

export interface BrandStats {
  brand: string;
  count: number;
  averagePrice: number;
  averageRating?: number;
}

export interface TitleStats {
  title: string;
  viewCount: number;
  salesCount: number;
  conversionRate: number;
  rank: number;
}

export interface PriceDistribution {
  range: string;
  count: number;
  percentage: number;
}

export interface TimeSeriesData {
  date: string;
  sales: number;
  views: number;
}

export interface KeywordAnalysis {
  keyword: string;
  frequency: number;
  averagePrice: number;
  productCount: number;
  trend: 'up' | 'down' | 'stable';
}

export interface FilterOptions {
  priceMin?: number;
  priceMax?: number;
  brands?: string[];
  minRating?: number;
  sortBy?: 'price' | 'popularity' | 'date' | 'rating';
  sortOrder?: 'asc' | 'desc';
  dateFrom?: string;
  dateTo?: string;
}

export interface ExportOptions {
  format: 'excel' | 'csv' | 'json';
  includeImages: boolean;
  fields: string[];
}

export interface ScrapingJob {
  id: string;
  source: string;
  category: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  productsScraped: number;
  startedAt?: string;
  completedAt?: string;
  error?: string;
}
