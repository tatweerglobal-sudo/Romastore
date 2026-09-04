import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import WeatherSync from '@/components/WeatherSync';
import UnboxingReels from '@/components/UnboxingReels';
import { Sparkles, ArrowLeft, Award, ShieldCheck, Flame, Heart, Compass, Brain, Lock, Gift, Crown } from 'lucide-react';

export const revalidate = 0;

async function getFeaturedProducts() {
  try {
    const products = await prisma.product.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
    });
    return products;
  } catch (error) {
    console.error('Failed to fetch featured products:', error);
    return [];
  }
}

export default async function HomePage() {
  const products = await getFeaturedProducts();

  return (
    <div className="space-y-16 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-emeraldLuxury-950 via-obsidian to-obsidian border-b border-gold-500/20">
        
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8 z-10">
          
          <div className="inline-flex items-center gap-2 bg-gold-950/80 border border-gold-500/40 text-gold-300 text-xs px-4 py-2 rounded-full shadow-xl">
            <Sparkles className="w-4 h-4 text-gold-400 animate-spin" />
            <span>تشكيلة عطور النيش المبتكرة بنظام الذكاء الاصطناعي العصبي 2026</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
            تجسيد الفخامة <br />
            <span className="bg-gradient-to-r from-gold-300 via-amber-400 to-gold-600 bg-clip-text text-transparent">
              في قطرات عطرية نادرة
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
            دار روما تجلب لك أصالة العود المعتق، ودقّة النوتات الفرنسية، في زجاجات فاخرة صُممت لتعكس حضورك المتميز وشخصيتك الفريدة.
          </p>

          {/* Weather Sync Detector Banner */}
          <div className="max-w-xl mx-auto">
            <WeatherSync />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/perfumes"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-gold-500 via-amber-400 to-gold-600 text-obsidian font-extrabold text-base px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(217,140,25,0.4)] hover:brightness-110 hover:scale-105 transition-all"
            >
              <span>استكشف التشكيلة الكاملة</span>
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <Link
              href="/neuro"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-charcoal/90 border border-gold-500/30 text-gold-300 font-bold text-base px-7 py-4 rounded-xl hover:bg-gold-950/60 hover:border-gold-400 transition-all"
            >
              <Brain className="w-5 h-5 text-gold-400" />
              <span>مستشار العطور حسب المزاج</span>
            </Link>
          </div>

          {/* Quick Feature Badges */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-xs text-gray-300">
            <Link href="/vault" className="p-3 rounded-xl bg-charcoal/80 border border-gold-500/30 hover:border-gold-400 transition-all flex items-center justify-center gap-1.5 font-bold text-amber-300">
              <Lock className="w-4 h-4 text-amber-400" />
              <span>الخزنة السرية (ROYAL777)</span>
            </Link>
            <Link href="/mystery-box" className="p-3 rounded-xl bg-charcoal/80 border border-gold-500/30 hover:border-gold-400 transition-all flex items-center justify-center gap-1.5 font-bold text-gold-300">
              <Gift className="w-4 h-4 text-gold-400" />
              <span>صندوق الغموض الملكي</span>
            </Link>
            <Link href="/bespoke" className="p-3 rounded-xl bg-charcoal/80 border border-gold-500/30 hover:border-gold-400 transition-all flex items-center justify-center gap-1.5 font-bold text-gold-300">
              <Crown className="w-4 h-4 text-gold-400" />
              <span>جلسة عطر خاص 1-of-1</span>
            </Link>
            <Link href="/quiz" className="p-3 rounded-xl bg-charcoal/80 border border-gold-500/30 hover:border-gold-400 transition-all flex items-center justify-center gap-1.5 font-bold text-gold-300">
              <Compass className="w-4 h-4 text-gold-400" />
              <span>حاسبة اختبار العطور</span>
            </Link>
          </div>

        </div>
      </section>

      {/* MOBILE APP NATIVE CATEGORY SWIPER CHIPS */}
      <div className="px-4 max-w-7xl mx-auto md:hidden">
        <span className="text-[11px] font-bold text-gray-400 block mb-2 px-1">تصفح السريع حسب القسم:</span>
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none snap-x text-xs">
          <Link
            href="/perfumes"
            className="flex-shrink-0 snap-start bg-gold-500 text-obsidian font-black px-4 py-2 rounded-full shadow-md flex items-center gap-1.5 active:scale-95 transition-transform"
          >
            <span>✨ كافة العطور</span>
          </Link>
          <Link
            href="/perfumes?category=عطور نيش"
            className="flex-shrink-0 snap-start bg-charcoal border border-gold-500/30 text-gold-300 font-bold px-4 py-2 rounded-full active:scale-95 transition-transform"
          >
            <span>👑 عطور النيش</span>
          </Link>
          <Link
            href="/neuro"
            className="flex-shrink-0 snap-start bg-charcoal border border-gold-500/30 text-amber-300 font-bold px-4 py-2 rounded-full active:scale-95 transition-transform"
          >
            <span>🧠 عطور المزاج</span>
          </Link>
          <Link
            href="/vault"
            className="flex-shrink-0 snap-start bg-charcoal border border-amber-500/30 text-amber-400 font-bold px-4 py-2 rounded-full active:scale-95 transition-transform"
          >
            <span>🔐 الخزنة السرية</span>
          </Link>
          <Link
            href="/cellar"
            className="flex-shrink-0 snap-start bg-charcoal border border-gray-800 text-gray-300 font-bold px-4 py-2 rounded-full active:scale-95 transition-transform"
          >
            <span>🍷 خزانة التعتيق</span>
          </Link>
          <Link
            href="/mystery-box"
            className="flex-shrink-0 snap-start bg-charcoal border border-purple-500/30 text-purple-300 font-bold px-4 py-2 rounded-full active:scale-95 transition-transform"
          >
            <span>🎁 صندوق الغموض</span>
          </Link>
        </div>
      </div>

      {/* FEATURED PERFUMES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>الأكثر طلباً ومبيعاً</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">عطور روما النيش الفاخرة</h2>
          </div>
          <Link
            href="/perfumes"
            className="text-xs text-gold-400 hover:text-gold-300 font-bold flex items-center gap-1"
          >
            <span>مشاهدة كافة العطور ({products.length})</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* UNBOXING REELS WALL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <UnboxingReels />
      </section>

    </div>
  );
}
