import { prisma } from '@/lib/prisma';
import ProductCard, { ProductType } from '@/components/ProductCard';
import PerfumeFilterClient from './PerfumeFilterClient';

export const revalidate = 0;

export default async function PerfumesPage() {
  let products: ProductType[] = [];
  try {
    products = (await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    })) as ProductType[];
  } catch (e) {
    console.error('Failed to load perfumes', e);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-gold-400 text-xs font-bold uppercase tracking-widest bg-gold-950/60 px-3 py-1 rounded-full border border-gold-500/30">
          مكتبة العطور الملكية
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">تشكيلة عطور النيش والزيوت الشرقية</h1>
        <p className="text-xs sm:text-sm text-gray-400">
          تصفح كافة عطورنا المعتقة، واستخدم الفلاتر لاكتشاف العطر الذي يحاكي شخصيتك ومناسبتك.
        </p>
      </div>

      {/* Filterable Products List (Client Component) */}
      <PerfumeFilterClient initialProducts={products} />
    </div>
  );
}
