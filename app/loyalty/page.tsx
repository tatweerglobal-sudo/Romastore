'use client';

import React from 'react';
import { Award, Crown, Gift, Sparkles, CheckCircle2 } from 'lucide-react';

export default function LoyaltyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-gold-950/80 border border-gold-500/30 text-gold-300 text-xs px-4 py-1.5 rounded-full">
          <Crown className="w-4 h-4 text-gold-400" />
          <span>نادي روما الملكي للولاء (Royal VIP Club)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">اكسب نقاطاً مع كل طلب واستبدلها بهدايا نادرة</h1>
        <p className="text-xs sm:text-sm text-gray-400">
          انضم لتجربة النخبة واكسب نقطة واحدة لكل ريال تنفقه، واستبدلها برصيد مجاني وعينات عود ملكية.
        </p>
      </div>

      {/* Points Card */}
      <div className="bg-gradient-to-r from-gold-900 via-charcoal to-emeraldLuxury-950 p-8 rounded-3xl border border-gold-500/40 shadow-2xl flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="space-y-2 text-right">
          <span className="text-xs text-gold-400 font-bold">عضويتك الحالية: VIP Gold 👑</span>
          <h2 className="text-3xl font-black text-white">رصيدك الحالي: 450 نقطة</h2>
          <p className="text-xs text-gray-300">يتبقى لك 50 نقطة فقط لفتح عينات العود الملكية المجانية!</p>
        </div>

        <button className="bg-gold-500 text-obsidian font-extrabold text-xs px-6 py-3.5 rounded-xl shadow-xl hover:bg-gold-400">
          استبدال النقاط بهدايا الآن
        </button>
      </div>

      {/* Rewards Tiers */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
        <div className="p-6 rounded-2xl bg-charcoal border border-gray-800 space-y-2">
          <div className="w-10 h-10 rounded-full bg-gold-950 text-gold-400 flex items-center justify-center font-bold">1</div>
          <h3 className="font-bold text-white text-sm">مستوى VIP Silver</h3>
          <p className="text-gray-400">عند الوصول لـ 300 نقطة: شحن مجاني دائم + عينات 10ml مجانية مع كل طلب.</p>
        </div>

        <div className="p-6 rounded-2xl bg-charcoal border border-gold-500/40 space-y-2">
          <div className="w-10 h-10 rounded-full bg-gold-500 text-obsidian flex items-center justify-center font-bold">2</div>
          <h3 className="font-bold text-gold-300 text-sm">مستوى VIP Gold</h3>
          <p className="text-gray-400">عند الوصول لـ 600 نقطة: حفر الاسم بالليزر مجاناً + دعوات للخزنة السرية.</p>
        </div>

        <div className="p-6 rounded-2xl bg-charcoal border border-emerald-500/40 space-y-2">
          <div className="w-10 h-10 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold">3</div>
          <h3 className="font-bold text-emerald-300 text-sm">مستوى VIP Royal</h3>
          <p className="text-gray-400">عند الوصول لـ 1000 نقطة: جلسة ابتكار عطر خاص 1-of-1 مجاناً!</p>
        </div>
      </div>

    </div>
  );
}
