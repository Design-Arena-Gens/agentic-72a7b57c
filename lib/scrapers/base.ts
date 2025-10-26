import { Product } from '../types';
import * as cheerio from 'cheerio';

export interface ScraperConfig {
  baseUrl: string;
  name: string;
  userAgents: string[];
  delayMs: number;
  maxRetries: number;
}

export abstract class BaseScraper {
  protected config: ScraperConfig;

  constructor(config: ScraperConfig) {
    this.config = config;
  }

  protected getRandomUserAgent(): string {
    return this.config.userAgents[
      Math.floor(Math.random() * this.config.userAgents.length)
    ];
  }

  protected async delay(ms?: number): Promise<void> {
    const delayTime = ms || this.config.delayMs;
    await new Promise(resolve => setTimeout(resolve, delayTime));
  }

  protected async fetchWithRetry(
    url: string,
    options: RequestInit = {}
  ): Promise<Response> {
    let lastError: Error | null = null;

    for (let i = 0; i < this.config.maxRetries; i++) {
      try {
        const response = await fetch(url, {
          ...options,
          headers: {
            'User-Agent': this.getRandomUserAgent(),
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'fa-IR,fa;q=0.9,en-US;q=0.8,en;q=0.7',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            ...options.headers,
          },
        });

        if (response.ok) {
          return response;
        }

        if (response.status === 429) {
          // Rate limited, wait longer
          await this.delay(this.config.delayMs * 3);
          continue;
        }

        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      } catch (error) {
        lastError = error as Error;
        if (i < this.config.maxRetries - 1) {
          await this.delay(this.config.delayMs * (i + 1));
        }
      }
    }

    throw lastError || new Error('Failed to fetch after retries');
  }

  protected parsePrice(priceStr: string): number {
    // Remove Persian/Arabic numerals and convert to English
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    const arabicDigits = '٠١٢٣٤٥٦٧٨٩';
    const englishDigits = '0123456789';
    
    let normalized = priceStr;
    for (let i = 0; i < 10; i++) {
      normalized = normalized
        .replace(new RegExp(persianDigits[i], 'g'), englishDigits[i])
        .replace(new RegExp(arabicDigits[i], 'g'), englishDigits[i]);
    }
    
    // Remove all non-digit characters
    const digits = normalized.replace(/[^\d]/g, '');
    return parseInt(digits, 10) || 0;
  }

  protected generateId(source: string, productId: string): string {
    return `${source}_${productId}`;
  }

  abstract scrapeCategory(category: string, subcategory: string, limit?: number): Promise<Product[]>;
  abstract scrapeProduct(url: string): Promise<Product | null>;
}
