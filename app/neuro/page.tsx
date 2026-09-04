'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Brain, Flame, Heart, Smile, Zap, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function NeuroPerfumeryPage() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const { addItem } = useCart();

  const moods = [
    {
      id: 'confidence',
      title: '🔥 ثقة وقوة حضور مهيبة',
      desc: 'تحفيز موجات الدماغ للقيادة والسيطرة بالأمسيات والتجمعات الرسمية.',
      notes: 'عود كمبودي معتق, عنبر شمس, بخور ملكي',
      matchName: 'روما نيش - عود الملكية',
      slug: 'roma-royal-oud',
      price: 520,
      image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'calm',
      title: '😌 هدوء واسترخاء واستجمام',
      desc: 'تهدئة التوتر العصبي ومنحك السكينة والسلام الداخلي طوال اليوم.',
      notes: 'مسك نقي, فانيليا مدغشقر, خشب الكشمير',
      matchName: 'إكسير المخمل الذهبي',
      slug: 'velvet-amber-elixir',
      price: 450,
      image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'romance',
      title: '💖 جاذبية ورومانسية ساحرة',
      desc: 'تحفيز هرمونات الجاذبية والشغف بلمسات مخملية أوربية فريدة.',
      notes: 'ورد دمشقي, زنبق الوادي, ليتشي زهرية',
      matchName: 'سولاريس الأخضر - زهر الإمبراطورة',
      slug: 'empress-rose-solaris',
      price: 490,
      image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'energy',
      title: '⚡ نشاط وانتعاش صباحي',
      desc: 'تنشيط التركيز والإنتاجية مع الافتتاحية الحمضية التوابلية الحارة.',
      notes: 'جريب فروت, نعناع بستاني, ميرمية, ليمون',
      matchName: 'نوكتا الفضي - ليل روما',
      slug: 'roma-nocturne-silver',
      price: 390,
      image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop',
    },
  ];

  const currentMatch = moods.find((m) => m.id === selectedMood);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-gold-950/80 border border-gold-500/30 text-gold-300 text-xs px-4 py-1.5 rounded-full">
          <Brain className="w-4 h-4 text-gold-400" />
          <span>علم العطور العصبي (Neuro-Perfumery)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">اختر حالتك النفسية والمزاج المطلوب</h1>
        <p className="text-xs sm:text-sm text-gray-400">
          يعتمد الذكاء الاصطناعي العصبي على مطابقة الجزيئات العطرية مع موجات الدماغ لتحديد العطر الذي يمنحك التأثير النفسي المنشود.
        </p>
      </div>

      {/* Mood Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {moods.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelectedMood(m.id)}
            className={`p-6 rounded-2xl border text-right space-y-2 transition-all ${
              selectedMood === m.id
                ? 'bg-gold-950/60 border-gold-400 shadow-[0_0_20px_rgba(217,140,25,0.2)]'
                : 'bg-charcoal border-gray-800 hover:border-gold-500/40'
            }`}
          >
            <h3 className="text-base font-bold text-white">{m.title}</h3>
            <p className="text-xs text-gray-400 leading-relaxed">{m.desc}</p>
          </button>
        ))}
      </div>

      {/* Recommended Match Result */}
      {currentMatch && (
        <div className="bg-charcoal p-8 rounded-3xl border border-gold-500/40 shadow-2xl space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <span className="text-xs font-bold text-gold-300 flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>المطابقة العصبية الحصرية 99.4%:</span>
            </span>
            <span className="text-xs text-emerald-400 font-extrabold">{currentMatch.price} ر.س</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <div className="w-32 h-32 relative rounded-2xl overflow-hidden border border-gold-500/30 flex-shrink-0">
              <img src={currentMatch.image} alt={currentMatch.matchName} className="object-cover w-full h-full" />
            </div>

            <div className="space-y-2 text-right flex-1">
              <h2 className="text-xl font-black text-white">{currentMatch.matchName}</h2>
              <p className="text-xs text-gray-300 leading-relaxed">
                توليفة الجزيئات: <span className="text-gold-300 font-bold">{currentMatch.notes}</span>
              </p>
              <p className="text-xs text-gray-400">
                هذا العطر يحتوي على المركبات الموصلة عصبياً لتحقيق {currentMatch.title} بأعلى جودة.
              </p>
            </div>
          </div>

          <button
            onClick={() =>
              addItem({
                id: currentMatch.slug,
                name: currentMatch.matchName,
                slug: currentMatch.slug,
                price: currentMatch.price,
                image: currentMatch.image,
                size: '100ml',
              })
            }
            className="w-full bg-gradient-to-r from-gold-500 via-amber-400 to-gold-600 text-obsidian font-black py-3.5 rounded-xl shadow-xl hover:brightness-110 text-xs flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>أضف للحقيبة الآن بناءً على حالتك النفسية</span>
          </button>
        </div>
      )}

    </div>
  );
}
