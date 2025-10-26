import { Product } from './types';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export async function exportToExcel(products: Product[], filename: string = 'products.xlsx'): Promise<void> {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Products');

  // Define columns
  worksheet.columns = [
    { header: 'ID', key: 'id', width: 20 },
    { header: 'عنوان', key: 'title', width: 40 },
    { header: 'قیمت', key: 'price', width: 15 },
    { header: 'برند', key: 'brand', width: 15 },
    { header: 'دسته‌بندی', key: 'category', width: 20 },
    { header: 'زیردسته', key: 'subcategory', width: 20 },
    { header: 'تعداد بازدید', key: 'viewCount', width: 15 },
    { header: 'تعداد فروش', key: 'salesCount', width: 15 },
    { header: 'امتیاز', key: 'rating', width: 10 },
    { header: 'منبع', key: 'source', width: 15 },
    { header: 'لینک', key: 'sourceUrl', width: 50 },
  ];

  // Style header row
  worksheet.getRow(1).font = { bold: true };
  worksheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF0EA5E9' },
  };

  // Add data
  products.forEach(product => {
    worksheet.addRow({
      id: product.id,
      title: product.title,
      price: product.price,
      brand: product.brand || '',
      category: product.category,
      subcategory: product.subcategory,
      viewCount: product.viewCount || 0,
      salesCount: product.salesCount || 0,
      rating: product.rating || 0,
      source: product.source,
      sourceUrl: product.sourceUrl,
    });
  });

  // Generate buffer and download
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, filename);
}

export function exportToCSV(products: Product[], filename: string = 'products.csv'): void {
  const headers = ['ID', 'عنوان', 'قیمت', 'برند', 'دسته‌بندی', 'زیردسته', 'تعداد بازدید', 'تعداد فروش', 'امتیاز', 'منبع', 'لینک'];
  
  const rows = products.map(p => [
    p.id,
    p.title,
    p.price,
    p.brand || '',
    p.category,
    p.subcategory,
    p.viewCount || 0,
    p.salesCount || 0,
    p.rating || 0,
    p.source,
    p.sourceUrl,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n');

  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, filename);
}

export function exportToJSON(products: Product[], filename: string = 'products.json'): void {
  const json = JSON.stringify(products, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  saveAs(blob, filename);
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function formatProductForClipboard(product: Product): string {
  return `
عنوان: ${product.title}
قیمت: ${formatPrice(product.price)} ${product.currency}
برند: ${product.brand || 'نامشخص'}
دسته‌بندی: ${product.category} / ${product.subcategory}
${product.viewCount ? `تعداد بازدید: ${formatNumber(product.viewCount)}` : ''}
${product.salesCount ? `تعداد فروش: ${formatNumber(product.salesCount)}` : ''}
${product.rating ? `امتیاز: ${product.rating.toFixed(1)} از 5` : ''}
منبع: ${product.source}
لینک: ${product.sourceUrl}

توضیحات:
${product.description}

تصاویر:
${product.images.join('\n')}
  `.trim();
}

export async function downloadImages(images: string[], productId: string): Promise<void> {
  for (let i = 0; i < images.length; i++) {
    try {
      const response = await fetch(images[i]);
      const blob = await response.blob();
      saveAs(blob, `${productId}_image_${i + 1}.jpg`);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  }
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('fa-IR').format(price);
}

function formatNumber(num: number): string {
  return new Intl.NumberFormat('fa-IR').format(num);
}
