import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { Plus, Trash2, Edit, Sparkles, ArrowRight } from 'lucide-react';
import ProductDeleteButton from './ProductDeleteButton';
import ProductCloneButton from './ProductCloneButton';

export const revalidate = 0;

export default async function AdminProductsPage() {
  let products: any[] = [];
  try {
    products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching admin products:', error);
  }

  const firstImage = (imgStr: string) => (imgStr ? imgStr.split(',')[0] || '' : '');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-gold-400 text-xs font-bold mb-1">
            <Link href="/admin" className="hover:underline flex items-center gap-1">
              <ArrowRight className="w-3.5 h-3.5" />
              <span>العودة للوحة الإحصائيات</span>
            </Link>
          </div>
          <h1 className="text-3xl font-black text-white">إدارة مكتبة العطور ({products.length})</h1>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-obsidian font-bold text-xs px-5 py-3 rounded-xl shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة عطر جديد</span>
        </Link>
      </div>

      {/* Products Table */}
      <div className="bg-charcoal rounded-2xl border border-gold-500/20 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right text-gray-300">
            <thead className="bg-obsidian text-gray-400 font-bold uppercase border-b border-gray-800">
              <tr>
                <th className="p-4">العطر والصورة</th>
                <th className="p-4">التصنيف والتركيز</th>
                <th className="p-4">السعر والمخزون</th>
                <th className="p-4">النوتات العطرية</th>
                <th className="p-4">الثبات والفوحان</th>
                <th className="p-4 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {products.map((prod) => (
                <tr key={prod.id} className="hover:bg-obsidian/50">
                  
                  {/* Product Name & Image */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 relative rounded-lg overflow-hidden border border-gray-800 flex-shrink-0">
                        <Image src={firstImage(prod.images)} alt={prod.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm line-clamp-1">{prod.name}</h4>
                        <span className="text-[10px] text-gold-400">الحجم: {prod.size}</span>
                      </div>
                    </div>
                  </td>

                  {/* Category & Concentration */}
                  <td className="p-4">
                    <span className="bg-gray-800 px-2 py-0.5 rounded text-gray-300 block w-fit mb-1 font-bold">
                      {prod.category}
                    </span>
                    <span className="text-[10px] text-gray-400 block">{prod.concentration}</span>
                  </td>

                  {/* Price & Stock */}
                  <td className="p-4">
                    <div className="font-black text-gold-300 text-sm">{prod.discountPrice ?? prod.price} ر.س</div>
                    <span className={`text-[10px] font-bold ${prod.stock <= 5 ? 'text-red-400' : 'text-emerald-400'}`}>
                      المخزون: {prod.stock} زجاجة
                    </span>
                  </td>

                  {/* Notes Preview */}
                  <td className="p-4 max-w-xs">
                    <p className="text-[11px] text-gray-300 line-clamp-2">
                      🌿 {prod.topNotes}
                    </p>
                  </td>

                  {/* Ratings */}
                  <td className="p-4 font-bold text-amber-400">
                    <div>الثبات: {prod.longevity}/5</div>
                    <div>الفوحان: {prod.sillage}/5</div>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <a
                        href={`/perfumes/${prod.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 hover:text-white transition-colors text-xs font-bold"
                        title="معاينة في المتجر"
                      >
                        معاينة
                      </a>
                      <ProductCloneButton productId={prod.id} />
                      <ProductDeleteButton productId={prod.id} />
                    </div>
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
