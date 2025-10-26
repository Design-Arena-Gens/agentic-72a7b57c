import { Category } from './types';

export const categories: Category[] = [
  {
    id: 'home-appliances',
    name: 'لوازم خانگی',
    nameEn: 'Home Appliances',
    icon: '🏠',
    subcategories: [
      { id: 'furniture', name: 'مبلمان', nameEn: 'Furniture', categoryId: 'home-appliances' },
      { id: 'sofa', name: 'مبل و کاناپه', nameEn: 'Sofa & Couch', categoryId: 'home-appliances' },
      { id: 'chair', name: 'صندلی', nameEn: 'Chair', categoryId: 'home-appliances' },
      { id: 'table', name: 'میز', nameEn: 'Table', categoryId: 'home-appliances' },
      { id: 'bedroom', name: 'سرویس خواب', nameEn: 'Bedroom Sets', categoryId: 'home-appliances' },
      { id: 'bed', name: 'تخت خواب', nameEn: 'Bed', categoryId: 'home-appliances' },
      { id: 'wardrobe', name: 'کمد لباس', nameEn: 'Wardrobe', categoryId: 'home-appliances' },
      { id: 'nightstand', name: 'پاتختی', nameEn: 'Nightstand', categoryId: 'home-appliances' },
      { id: 'carpet', name: 'فرش و موکت', nameEn: 'Carpets & Rugs', categoryId: 'home-appliances' },
      { id: 'decoration', name: 'دکوراسیون', nameEn: 'Decoration', categoryId: 'home-appliances' },
      { id: 'kitchen', name: 'آشپزخانه', nameEn: 'Kitchen', categoryId: 'home-appliances' },
    ],
  },
  {
    id: 'electronics',
    name: 'لوازم الکترونیک',
    nameEn: 'Electronics',
    icon: '📱',
    subcategories: [
      { id: 'television', name: 'تلویزیون', nameEn: 'Television', categoryId: 'electronics' },
      { id: 'refrigerator', name: 'یخچال و فریزر', nameEn: 'Refrigerator & Freezer', categoryId: 'electronics' },
      { id: 'audio-video', name: 'صوتی و تصویری', nameEn: 'Audio & Video', categoryId: 'electronics' },
      { id: 'computer', name: 'کامپیوتر و لپتاپ', nameEn: 'Computers & Laptops', categoryId: 'electronics' },
      { id: 'mobile', name: 'موبایل و تبلت', nameEn: 'Mobile & Tablet', categoryId: 'electronics' },
      { id: 'camera', name: 'دوربین', nameEn: 'Camera', categoryId: 'electronics' },
      { id: 'gaming', name: 'بازی و سرگرمی', nameEn: 'Gaming', categoryId: 'electronics' },
      { id: 'smartwatch', name: 'ساعت هوشمند', nameEn: 'Smartwatch', categoryId: 'electronics' },
    ],
  },
  {
    id: 'fashion',
    name: 'مد و پوشاک',
    nameEn: 'Fashion & Apparel',
    icon: '👕',
    subcategories: [
      { id: 'women-clothing', name: 'پوشاک زنانه', nameEn: 'Women\'s Clothing', categoryId: 'fashion' },
      { id: 'men-clothing', name: 'پوشاک مردانه', nameEn: 'Men\'s Clothing', categoryId: 'fashion' },
      { id: 'children-clothing', name: 'پوشاک بچگانه', nameEn: 'Children\'s Clothing', categoryId: 'fashion' },
      { id: 'shoes', name: 'کفش', nameEn: 'Shoes', categoryId: 'fashion' },
      { id: 'bags', name: 'کیف', nameEn: 'Bags', categoryId: 'fashion' },
      { id: 'accessories', name: 'اکسسوری', nameEn: 'Accessories', categoryId: 'fashion' },
      { id: 'jewelry', name: 'جواهرات', nameEn: 'Jewelry', categoryId: 'fashion' },
    ],
  },
  {
    id: 'beauty',
    name: 'زیبایی و سلامت',
    nameEn: 'Beauty & Health',
    icon: '💄',
    subcategories: [
      { id: 'skincare', name: 'مراقبت پوست', nameEn: 'Skincare', categoryId: 'beauty' },
      { id: 'makeup', name: 'آرایش', nameEn: 'Makeup', categoryId: 'beauty' },
      { id: 'perfume', name: 'عطر', nameEn: 'Perfume', categoryId: 'beauty' },
      { id: 'haircare', name: 'مراقبت مو', nameEn: 'Hair Care', categoryId: 'beauty' },
      { id: 'health', name: 'سلامت', nameEn: 'Health', categoryId: 'beauty' },
    ],
  },
  {
    id: 'sports',
    name: 'ورزش و سفر',
    nameEn: 'Sports & Travel',
    icon: '⚽',
    subcategories: [
      { id: 'sports-equipment', name: 'تجهیزات ورزشی', nameEn: 'Sports Equipment', categoryId: 'sports' },
      { id: 'sportswear', name: 'پوشاک ورزشی', nameEn: 'Sportswear', categoryId: 'sports' },
      { id: 'camping', name: 'کمپینگ', nameEn: 'Camping', categoryId: 'sports' },
      { id: 'travel', name: 'لوازم سفر', nameEn: 'Travel', categoryId: 'sports' },
    ],
  },
  {
    id: 'books',
    name: 'کتاب و لوازم تحریر',
    nameEn: 'Books & Stationery',
    icon: '📚',
    subcategories: [
      { id: 'books', name: 'کتاب', nameEn: 'Books', categoryId: 'books' },
      { id: 'stationery', name: 'لوازم تحریر', nameEn: 'Stationery', categoryId: 'books' },
      { id: 'art-supplies', name: 'لوازم هنری', nameEn: 'Art Supplies', categoryId: 'books' },
    ],
  },
  {
    id: 'toys',
    name: 'اسباب بازی',
    nameEn: 'Toys',
    icon: '🧸',
    subcategories: [
      { id: 'dolls', name: 'عروسک', nameEn: 'Dolls', categoryId: 'toys' },
      { id: 'educational', name: 'آموزشی', nameEn: 'Educational', categoryId: 'toys' },
      { id: 'games', name: 'بازی', nameEn: 'Games', categoryId: 'toys' },
    ],
  },
  {
    id: 'automotive',
    name: 'خودرو و موتورسیکلت',
    nameEn: 'Automotive',
    icon: '🚗',
    subcategories: [
      { id: 'car-parts', name: 'لوازم یدکی', nameEn: 'Car Parts', categoryId: 'automotive' },
      { id: 'car-accessories', name: 'لوازم جانبی', nameEn: 'Car Accessories', categoryId: 'automotive' },
      { id: 'motorcycle', name: 'موتورسیکلت', nameEn: 'Motorcycle', categoryId: 'automotive' },
    ],
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find(cat => cat.id === id);
}

export function getSubcategoryById(id: string): { category: Category; subcategory: any } | undefined {
  for (const category of categories) {
    const subcategory = category.subcategories.find(sub => sub.id === id);
    if (subcategory) {
      return { category, subcategory };
    }
  }
  return undefined;
}

export function getAllSubcategories() {
  return categories.flatMap(cat => 
    cat.subcategories.map(sub => ({
      ...sub,
      categoryName: cat.name,
      categoryNameEn: cat.nameEn,
    }))
  );
}
