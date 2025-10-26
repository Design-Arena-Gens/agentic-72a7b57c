import { DigikalaScraper } from './digikala';
import { BasalamScraper } from './basalam';
import { BaseScraper } from './base';

export const scrapers: Record<string, BaseScraper> = {
  digikala: new DigikalaScraper(),
  basalam: new BasalamScraper(),
};

export function getScraper(source: string): BaseScraper | undefined {
  return scrapers[source.toLowerCase()];
}

export async function scrapeAllSources(
  category: string,
  subcategory: string,
  sources: string[] = ['digikala', 'basalam']
): Promise<any[]> {
  const allProducts: any[] = [];

  for (const source of sources) {
    const scraper = getScraper(source);
    if (scraper) {
      try {
        const products = await scraper.scrapeCategory(category, subcategory, 30);
        allProducts.push(...products);
      } catch (error) {
        console.error(`Error scraping ${source}:`, error);
      }
    }
  }

  return allProducts;
}
