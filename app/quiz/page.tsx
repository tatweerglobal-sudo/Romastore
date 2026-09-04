'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Compass, CheckCircle2, RotateCcw, ArrowLeft, Eye } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface PerfumeMatch {
  name: string;
  slug: string;
  price: number;
  reason: string;
  image: string;
  notes: string;
}

export default function PerfumeQuizPage() {
  const [step, setStep] = useState(1);
  const [occasion, setOccasion] = useState('');
  const [vibe, setVibe] = useState('');
  const [strength, setStrength] = useState('');
  const { addItem } = useCart();

  const handleReset = () => {
    setStep(1);
    setOccasion('');
    setVibe('');
    setStrength('');
  };

  const getRecommendations = (): PerfumeMatch[] => {
    if (vibe === 'oud') {
      return [
        {
          name: 'روما نيش - عود الملكية (Roma Royal Oud)',
          slug: 'roma-royal-oud',
          price: 520,
          reason: 'العطر المثالي لعشاق العود الكمبودي والمعتق مع طابع ملكي مهيب يناسب أوقاتك الفاخرة.',
          image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop',
          notes: 'برغموت، ورد جوري، عود كمبودي، عنبر شمس',
        },
        {
          name: 'إكسير المخمل الذهبي (Velvet Amber Elixir)',
          slug: 'velvet-amber-elixir',
          price: 450,
          reason: 'توليفة عنبرية دافئة تمنحك حضوراً مخملياً ساحراً يدوم لأيام.',
          image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop',
          notes: 'قرفة، عنبر دافئ، فانيليا مدغشقر، تبغ',
        },
      ];
    }
    if (vibe === 'floral') {
      return [
        {
          name: 'سولاريس الأخضر - زهر الإمبراطورة (Empress Rose Solaris)',
          slug: 'empress-rose-solaris',
          price: 490,
          reason: 'نفحات أنثوية راقية من الورد الدمشقي والمسك البلوري النقي لجاذبية رقيقة.',
          image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=800&auto=format&fit=crop',
          notes: 'كُمثرى فرنسية، ورد دمشقي، مسك نقي، كشمير',
        },
      ];
    }
    return [
      {
        name: 'نوكتا الفضي - ليل روما (Roma Nocturne Silver)',
        slug: 'roma-nocturne-silver',
        price: 390,
        reason: 'عطر أروماتك حمضي منعش يمنحك الطاقة والانتعاش العصري الحاذق.',
        image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop',
        notes: 'جريب فروت، نعناع، ميرمية، نجيل الهند',
      },
    ];
  };

  const matches = getRecommendations();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-gold-950/80 border border-gold-500/30 text-gold-300 text-xs px-4 py-1.5 rounded-full">
          <Compass className="w-4 h-4 text-gold-400" />
          <span>مساعد اختيار العطر الذكي (Perfume Quiz)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">اكتشف توقيعك العطري في 3 خطوات</h1>
        <p className="text-xs sm:text-sm text-gray-400">
          صُممت هذه الحاسبة لمساعدتك في الحصول على التوليفة العطرية التي تلائم طبيعة استخدامك ورغبتك بصورة دقيقة.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-center gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all ${
              step >= i
                ? 'w-12 bg-gradient-to-r from-gold-500 to-amber-300'
                : 'w-8 bg-gray-800'
            }`}
          />
        ))}
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="bg-charcoal p-8 rounded-3xl border border-gold-500/20 shadow-2xl space-y-6 animate-fadeIn">
          <h2 className="text-xl font-bold text-white text-center">
            1. ما هي المناسبة الرئيسية لاستخدام العطر؟
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 'formal', label: 'أمسيات رسمية وحفلات', desc: 'حضور مهيب وفوحان ملفوف بالفخامة' },
              { id: 'daily', label: 'استخدام يومي ودوام', desc: 'انتعاش متزن وراقي لا يسبب إزعاجاً' },
              { id: 'gift', label: 'هدية شخصية لغالي', desc: 'تركيبة فاخرة ومحبوبة عالمياً' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  setOccasion(opt.id);
                  setStep(2);
                }}
                className="p-6 rounded-2xl bg-obsidian border border-gray-800 hover:border-gold-400 text-right space-y-2 group transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-gold-950/80 border border-gold-500/30 text-gold-400 flex items-center justify-center font-bold text-sm group-hover:bg-gold-500 group-hover:text-obsidian transition-colors">
                  ✦
                </div>
                <h3 className="font-bold text-white group-hover:text-gold-300 transition-colors">
                  {opt.label}
                </h3>
                <p className="text-xs text-gray-400">{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="bg-charcoal p-8 rounded-3xl border border-gold-500/20 shadow-2xl space-y-6 animate-fadeIn">
          <h2 className="text-xl font-bold text-white text-center">
            2. ما هي الطابع العطري الأحب لقلبك؟
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 'oud', label: 'عود، عنبر، وبخور دافئ', desc: 'طابع شرقي ملكي ثري ودافئ' },
              { id: 'floral', label: 'ورد دمشقي، مسك، وزهور', desc: 'نفحات زهرية مخملية ناعمة' },
              { id: 'fresh', label: 'حمضيات، نعناع، وتوابل', desc: 'انتعاش عصري حيوي ومفعم بالنشاط' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  setVibe(opt.id);
                  setStep(3);
                }}
                className="p-6 rounded-2xl bg-obsidian border border-gray-800 hover:border-gold-400 text-right space-y-2 group transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-gold-950/80 border border-gold-500/30 text-gold-400 flex items-center justify-center font-bold text-sm group-hover:bg-gold-500 group-hover:text-obsidian transition-colors">
                  🌿
                </div>
                <h3 className="font-bold text-white group-hover:text-gold-300 transition-colors">
                  {opt.label}
                </h3>
                <p className="text-xs text-gray-400">{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="bg-charcoal p-8 rounded-3xl border border-gold-500/20 shadow-2xl space-y-6 animate-fadeIn">
          <h2 className="text-xl font-bold text-white text-center">
            3. كيف تفضل درجة ثبات وفوحان العطر؟
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { id: 'beast', label: 'ثبات وفوحان صاروخي (Extrait)', desc: 'يدوم لأكثر من 24 ساعة وينتشر بالمكان' },
              { id: 'balanced', label: 'فوحان متزن على مسافة ذراع', desc: 'حضور هادئ وجذاب غير نفاذ' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  setStrength(opt.id);
                  setStep(4);
                }}
                className="p-6 rounded-2xl bg-obsidian border border-gray-800 hover:border-gold-400 text-right space-y-2 group transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-gold-950/80 border border-gold-500/30 text-gold-400 flex items-center justify-center font-bold text-sm group-hover:bg-gold-500 group-hover:text-obsidian transition-colors">
                  🔥
                </div>
                <h3 className="font-bold text-white group-hover:text-gold-300 transition-colors">
                  {opt.label}
                </h3>
                <p className="text-xs text-gray-400">{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 4: RECOMMENDATIONS RESULTS */}
      {step === 4 && (
        <div className="bg-charcoal p-8 rounded-3xl border border-gold-500/30 shadow-2xl space-y-8 animate-fadeIn">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto font-bold text-xl">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-black text-white">العطور المرشحة خصيصاً لك</h2>
            <p className="text-xs text-gray-300">
              استناداً لإجاباتك، إليك العطور الأكثر ملاءمة لطابعك الشخصي:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {matches.map((item, idx) => (
              <div
                key={idx}
                className="bg-obsidian rounded-2xl p-5 border border-gold-500/30 space-y-4 flex flex-col justify-between"
              >
                <div className="flex gap-4">
                  <div className="w-24 h-24 relative rounded-xl overflow-hidden border border-gray-800 flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] bg-gold-500/20 text-gold-300 px-2 py-0.5 rounded font-bold">
                      مطابقة 98%
                    </span>
                    <h3 className="text-base font-bold text-white">{item.name}</h3>
                    <p className="text-xs text-gold-300 font-black">{item.price} ر.س</p>
                    <p className="text-[11px] text-gray-400 line-clamp-2">النوتات: {item.notes}</p>
                  </div>
                </div>

                <div className="bg-gold-950/40 p-3 rounded-xl border border-gold-500/20 text-xs text-gray-300">
                  💡 <span className="font-bold text-gold-200">سبب الترشيح:</span> {item.reason}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      addItem({
                        id: item.slug,
                        name: item.name,
                        slug: item.slug,
                        price: item.price,
                        image: item.image,
                        size: '100ml',
                      })
                    }
                    className="flex-1 bg-gradient-to-r from-gold-500 to-amber-400 text-obsidian font-extrabold py-2.5 rounded-xl text-xs hover:brightness-110"
                  >
                    أضف للحقيبة الأن
                  </button>

                  <Link
                    href={`/perfumes/${item.slug}`}
                    className="bg-charcoal border border-gray-800 p-2.5 rounded-xl text-gray-300 hover:text-white"
                    title="معاينة"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 text-xs text-gold-400 hover:text-gold-300 font-bold"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة إجراء الاختبار من جديد</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
