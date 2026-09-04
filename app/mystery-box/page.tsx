'use client';

import { useState } from 'react';
import { Gift, Sparkles, HelpCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function MysteryBoxPage() {
  const { addItem } = useCart();

  const handleAddMysteryBox = () => {
    addItem({
      id: 'roma-mystery-box',
      name: 'صندوق الغموض الملكي (Roma Mystery Niche Box)',
      slug: 'roma-mystery-box',
      price: 390,
      image: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=800&auto=format&fit=crop',
      size: '100ml + 3 Samples',
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-gold-950/80 border border-gold-500/30 text-gold-300 text-xs px-4 py-1.5 rounded-full">
          <Gift className="w-4 h-4 text-gold-400" />
          <span>ابتكار الغموض الحصري (Mystery Niche Box)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">صندوق المفاجآت والنيش الملكي</h1>
        <p className="text-xs sm:text-sm text-gray-400">
          دع خبير روما يختار لك عطراً نيشاً نادراً بحجم 100ml برفقة 3 عينات استكشافية بخصم 35%!
        </p>
      </div>

      <div className="bg-gradient-to-b from-charcoal to-emeraldLuxury-950 p-8 rounded-3xl border border-gold-500/40 text-center space-y-6 shadow-2xl">
        <div className="w-40 h-40 relative rounded-2xl overflow-hidden border-2 border-gold-500/40 mx-auto shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=800&auto=format&fit=crop"
            alt="Mystery Box"
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-obsidian/40 flex items-center justify-center">
            <HelpCircle className="w-16 h-16 text-gold-400 opacity-80 animate-pulse" />
          </div>
        </div>

        <div className="space-y-2 max-w-md mx-auto">
          <h2 className="text-2xl font-black text-white">صندوق المفاجأة الملكي 🎁</h2>
          <p className="text-xs text-gray-300">
            تحصل على زجاجة عطر كاملة 100ml بقيمة تزيد عن 650 ر.س + 3 عينات 10ml لترشيحات سريّة تحاكي ذوقك.
          </p>
          <div className="text-3xl font-black text-gold-300 pt-2">
            390 ر.س <span className="text-xs text-gray-500 line-through">650 ر.س</span>
          </div>
        </div>

        <button
          onClick={handleAddMysteryBox}
          className="w-full sm:w-auto bg-gradient-to-r from-gold-500 via-amber-400 to-gold-600 text-obsidian font-black px-10 py-4 rounded-xl shadow-xl hover:brightness-110 text-sm inline-flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>أضف صندوق الغموض للحقيبة الآن</span>
        </button>
      </div>

    </div>
  );
}
