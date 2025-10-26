'use client';

import { Product } from '@/lib/types';
import { Copy, ExternalLink, Download, Star } from 'lucide-react';
import { formatProductForClipboard, copyToClipboard, downloadImages } from '@/lib/export';
import { useState } from 'react';

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (product: Product) => {
    const text = formatProductForClipboard(product);
    await copyToClipboard(text);
    setCopiedId(product.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadImages = async (product: Product) => {
    await downloadImages(product.images, product.id);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        هیچ محصولی یافت نشد
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex gap-4">
            {/* Image */}
            <div className="flex-shrink-0">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-32 h-32 object-cover rounded-lg"
              />
            </div>

            {/* Content */}
            <div className="flex-grow">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-grow">
                  <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                    {product.title}
                  </h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    {product.brand && (
                      <span className="badge bg-blue-100 text-blue-800">
                        {product.brand}
                      </span>
                    )}
                    <span className="badge bg-gray-100 text-gray-800">
                      {product.source}
                    </span>
                    {product.discount && product.discount > 0 && (
                      <span className="badge bg-red-100 text-red-800">
                        {product.discount}% تخفیف
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-left ml-4">
                  <div className="text-2xl font-bold text-primary-600">
                    {formatPrice(product.price)}
                  </div>
                  <div className="text-sm text-gray-600">تومان</div>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <div className="text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </div>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                {product.viewCount && (
                  <div className="text-sm">
                    <span className="text-gray-600">بازدید:</span>
                    <span className="font-semibold mr-1">
                      {formatPrice(product.viewCount)}
                    </span>
                  </div>
                )}
                {product.salesCount && (
                  <div className="text-sm">
                    <span className="text-gray-600">فروش:</span>
                    <span className="font-semibold mr-1">
                      {formatPrice(product.salesCount)}
                    </span>
                  </div>
                )}
                {product.rating && (
                  <div className="text-sm flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{product.rating.toFixed(1)}</span>
                    {product.reviewCount && (
                      <span className="text-gray-600">
                        ({formatPrice(product.reviewCount)})
                      </span>
                    )}
                  </div>
                )}
                {product.stock !== undefined && (
                  <div className="text-sm">
                    <span className="text-gray-600">موجودی:</span>
                    <span className="font-semibold mr-1">
                      {product.stock > 0 ? formatPrice(product.stock) : 'ناموجود'}
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {product.description}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(product)}
                  className="btn-secondary text-sm flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  {copiedId === product.id ? 'کپی شد!' : 'کپی اطلاعات'}
                </button>

                <button
                  onClick={() => handleDownloadImages(product)}
                  className="btn-secondary text-sm flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  دانلود تصاویر
                </button>

                <a
                  href={product.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  مشاهده در سایت
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
