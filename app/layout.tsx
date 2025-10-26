import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Iranian Marketplace Analytics - ابزار تحلیل بازارهای آنلاین ایران',
  description: 'Advanced analytical and web scraping tool for Iranian online marketplaces',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
