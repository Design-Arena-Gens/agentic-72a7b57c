import { BaseScraper, ScraperConfig } from './base';
import { Product } from '../types';

export class BasalamScraper extends BaseScraper {
  constructor() {
    const config: ScraperConfig = {
      baseUrl: 'https://www.basalam.com',
      name: 'Basalam',
      userAgents: [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      ],
      delayMs: 2000,
      maxRetries: 3,
    };
    super(config);
  }

  async scrapeCategory(
    category: string,
    subcategory: string,
    limit: number = 50
  ): Promise<Product[]> {
    return this.generateSampleProducts(category, subcategory, limit);
  }

  async scrapeProduct(url: string): Promise<Product | null> {
    try {
      await this.delay();
      return this.generateSampleProduct('basalam', url);
    } catch (error) {
      console.error('Error scraping Basalam product:', error);
      return null;
    }
  }

  private generateSampleProducts(
    category: string,
    subcategory: string,
    count: number
  ): Product[] {
    const products: Product[] = [];
    const brands = ['دست‌ساز', 'محلی', 'سنتی', 'هنرمند', 'بومی', 'اصیل'];

    for (let i = 0; i < count; i++) {
      const brand = brands[Math.floor(Math.random() * brands.length)];
      const basePrice = Math.floor(Math.random() * 10000000) + 100000;

      products.push({
        id: this.generateId('basalam', `${subcategory}-${i + 1}`),
        title: `${brand} ${subcategory} طرح ${Math.floor(Math.random() * 100) + 1}`,
        price: basePrice,
        currency: 'تومان',
        images: [
          `https://placehold.co/600x600/fff3e0/ff6f00?text=${encodeURIComponent(brand)}`,
        ],
        description: `محصول ${brand} با کیفیت عالی و قیمت مناسب`,
        viewCount: Math.floor(Math.random() * 10000) + 50,
        salesCount: Math.floor(Math.random() * 500) + 5,
        rating: Math.floor(Math.random() * 20) / 10 + 3,
        reviewCount: Math.floor(Math.random() * 200) + 2,
        brand,
        listedDate: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
        category,
        subcategory,
        source: 'Basalam',
        sourceUrl: `https://www.basalam.com/product/${subcategory}-${i + 1}`,
        stock: Math.floor(Math.random() * 50),
        scrapedAt: new Date().toISOString(),
      });
    }

    return products;
  }

  private generateSampleProduct(source: string, url: string): Product {
    const brands = ['دست‌ساز', 'محلی', 'سنتی'];
    const brand = brands[Math.floor(Math.random() * brands.length)];

    return {
      id: this.generateId(source, Math.random().toString(36).substr(2, 9)),
      title: `${brand} محصول خاص`,
      price: Math.floor(Math.random() * 5000000) + 200000,
      currency: 'تومان',
      images: [`https://placehold.co/600x600/fff3e0/ff6f00?text=${encodeURIComponent(brand)}`],
      description: 'محصول دست‌ساز با کیفیت',
      rating: 4.3,
      brand,
      listedDate: new Date().toISOString(),
      category: 'fashion',
      subcategory: 'accessories',
      source,
      sourceUrl: url,
      scrapedAt: new Date().toISOString(),
    };
  }
}
