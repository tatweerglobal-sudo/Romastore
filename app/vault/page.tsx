'use client';

import { useState } from 'react';
import { KeyRound, Lock, Unlock, Sparkles, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function VIPVaultPage() {
  const [passcode, setPasscode] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const { addItem } = useCart();

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim().toUpperCase() === 'ROYAL777') {
      setUnlocked(true);
    } else {
      alert('رمز الدخول غير صحيح! الرمز السري لخزنة النخبة هو: ROYAL777');
    }
  };

  const vaultItems = [
    {
      name: 'دهن عود سيوفي إمبراطوري معتق 30 سنة (1-of-50 Edition)',
      slug: 'royal-aged-oud-30y',
      price: 1850,
      notes: 'عود سيوفي نقي نادراً ما يوجد بالأسواق، معتق من عام 1996.',
      image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop',
    },
    {
      name: 'إكسير العنبر الكهروماني الملكي (Private Reserve)',
      slug: 'amber-private-reserve',
      price: 1400,
      notes: 'عنبر كهروماني ثقيل مصنع يدوياً بمختبر روما الخاص.',
      image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-gold-950/80 border border-gold-500/30 text-gold-300 text-xs px-4 py-1.5 rounded-full">
          <Lock className="w-4 h-4 text-gold-400" />
          <span>الخزنة السرية لكبار الشخصيات (VIP Secret Vault)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">إصدارات نادرة وحصرية جداً</h1>
        <p className="text-xs sm:text-sm text-gray-400">
          هذه الخزنة محمية ولا تفتح إلا لأعضاء النادي الملكي باستخدام الرمز السري الخاص (Passkey: ROYAL777).
        </p>
      </div>

      {!unlocked ? (
        <form onSubmit={handleUnlock} className="max-w-md mx-auto bg-charcoal p-8 rounded-3xl border border-gold-500/30 space-y-4 text-center shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-gold-950/80 border border-gold-500/40 text-gold-400 flex items-center justify-center mx-auto">
            <KeyRound className="w-8 h-8" />
          </div>

          <h2 className="text-base font-bold text-white">أدخل رمز الدخول السري للخزنة</h2>

          <input
            type="text"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="أدخل الرمز السرّي (ROYAL777)"
            className="w-full bg-obsidian border border-gold-500/40 rounded-xl p-3.5 text-center text-gold-300 font-mono font-bold tracking-widest focus:outline-none"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-gold-500 via-amber-400 to-gold-600 text-obsidian font-extrabold py-3.5 rounded-xl text-xs hover:brightness-110 shadow-lg"
          >
            فتح الخزنة السرية الآن 🔓
          </button>
        </form>
      ) : (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between bg-emeraldLuxury-950 p-4 rounded-2xl border border-emerald-500/40 text-xs text-emerald-300">
            <span className="flex items-center gap-2 font-bold">
              <Unlock className="w-4 h-4 text-emerald-400" />
              <span>تم فتح الخزنة السرية بنجاح! الإصدارات التالية محدودة جداً:</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {vaultItems.map((v, i) => (
              <div key={i} className="bg-charcoal p-6 rounded-3xl border border-gold-500/30 space-y-4 shadow-xl">
                <div className="aspect-square relative rounded-2xl overflow-hidden border border-gray-800">
                  <img src={v.image} alt={v.name} className="object-cover w-full h-full" />
                  <span className="absolute top-3 right-3 bg-red-600 text-white font-extrabold text-[10px] px-3 py-1 rounded-full shadow-md">
                    نسخ محدودة 1-of-50
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">{v.name}</h3>
                  <p className="text-xs text-gray-400">{v.notes}</p>
                  <p className="text-lg font-black text-gold-300 pt-1">{v.price} ر.س</p>
                </div>

                <button
                  onClick={() =>
                    addItem({
                      id: v.slug,
                      name: v.name,
                      slug: v.slug,
                      price: v.price,
                      image: v.image,
                      size: '100ml',
                    })
                  }
                  className="w-full bg-gold-500 text-obsidian font-extrabold py-3 rounded-xl text-xs hover:bg-gold-400 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>اطلب قطعتك الحصرية من الخزنة</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
