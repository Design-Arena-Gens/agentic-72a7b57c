'use client';

import { Analytics, KeywordAnalysis } from '@/lib/types';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Package, DollarSign, Award } from 'lucide-react';

interface AnalyticsChartsProps {
  analytics: Analytics;
  keywords: KeywordAnalysis[];
}

const COLORS = ['#0ea5e9', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#6366f1'];

export default function AnalyticsCharts({ analytics, keywords }: AnalyticsChartsProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(Math.floor(price));
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">تعداد کل محصولات</p>
              <p className="text-3xl font-bold">
                {analytics.totalProducts.toLocaleString('fa-IR')}
              </p>
            </div>
            <Package className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm mb-1">میانگین قیمت</p>
              <p className="text-2xl font-bold">
                {formatPrice(analytics.averagePrice)}
              </p>
              <p className="text-green-100 text-xs">تومان</p>
            </div>
            <DollarSign className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm mb-1">کمترین قیمت</p>
              <p className="text-2xl font-bold">
                {formatPrice(analytics.priceRange.min)}
              </p>
              <p className="text-purple-100 text-xs">تومان</p>
            </div>
            <TrendingUp className="w-12 h-12 text-purple-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-pink-500 to-pink-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100 text-sm mb-1">بیشترین قیمت</p>
              <p className="text-2xl font-bold">
                {formatPrice(analytics.priceRange.max)}
              </p>
              <p className="text-pink-100 text-xs">تومان</p>
            </div>
            <Award className="w-12 h-12 text-pink-200" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Brands */}
        <div className="card">
          <h3 className="text-lg font-bold text-gray-900 mb-4">برندهای برتر</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.topBrands.slice(0, 8)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="brand" />
              <YAxis />
              <Tooltip
                formatter={(value: any) => [value.toLocaleString('fa-IR'), 'تعداد']}
                labelStyle={{ direction: 'rtl' }}
              />
              <Bar dataKey="count" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Price Distribution */}
        <div className="card">
          <h3 className="text-lg font-bold text-gray-900 mb-4">توزیع قیمت</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics.priceDistribution}
                dataKey="count"
                nameKey="range"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {analytics.priceDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: any) => [value.toLocaleString('fa-IR'), 'تعداد']}
                labelStyle={{ direction: 'rtl' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Keywords */}
      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 mb-4">کلمات کلیدی پرتکرار</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {keywords.slice(0, 18).map((keyword, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-3 border border-gray-200"
            >
              <div className="font-bold text-gray-900 mb-1">{keyword.keyword}</div>
              <div className="text-sm text-gray-600">
                تکرار: {keyword.frequency.toLocaleString('fa-IR')}
              </div>
              <div className="text-xs text-gray-500">
                {formatPrice(keyword.averagePrice)} تومان
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Titles */}
      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 mb-4">عناوین برتر (بر اساس نرخ تبدیل)</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">رتبه</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">عنوان</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">بازدید</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">فروش</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">نرخ تبدیل</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {analytics.topTitles.slice(0, 10).map((title, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{title.title}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {title.viewCount.toLocaleString('fa-IR')}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {title.salesCount.toLocaleString('fa-IR')}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className="badge bg-green-100 text-green-800">
                      {(title.conversionRate * 100).toFixed(2)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
