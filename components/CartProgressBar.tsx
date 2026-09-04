'use client';

import React from 'react';
import { Gift, Sparkles, ShieldCheck } from 'lucide-react';

interface CartProgressBarProps {
  subtotal: number;
}

export default function CartProgressBar({ subtotal }: CartProgressBarProps) {
  const freeShippingThreshold = 300;
  const freeSampleThreshold = 500;
  const vipGoldThreshold = 800;

  const currentMax = vipGoldThreshold;
  const progressPercent = Math.min(100, (subtotal / currentMax) * 100);

  const getMessage = () => {
    if (subtotal < freeShippingThreshold) {
      return `أضف ${freeShippingThreshold - subtotal} ر.س أخرى للحصول على شحن مجاني 🚚`;
    }
    if (subtotal < freeSampleThreshold) {
      return `أضف ${freeSampleThreshold - subtotal} ر.س أخرى لفتح عينة عود ملكية مجانية 🎁`;
    }
    if (subtotal < vipGoldThreshold) {
      return `أضف ${vipGoldThreshold - subtotal} ر.س أخرى لفتح ترقية عضوية VIP الذهبية 👑`;
    }
    return `تهانينا! حققت أعلى ترقية وشحن مجاني وعينات ملكية 🏆`;
  };

  return (
    <div className="p-3.5 rounded-xl bg-gold-950/40 border border-gold-500/30 text-xs space-y-2">
      <div className="flex items-center justify-between text-gold-300 font-bold">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>مستوى مكافآت الطلب:</span>
        </span>
        <span className="text-[10px] text-amber-300">{Math.round(progressPercent)}%</span>
      </div>

      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-gold-500 via-amber-400 to-gold-600 transition-all duration-500 shadow-[0_0_10px_rgba(245,177,62,0.6)]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <p className="text-[11px] text-gray-300 text-center font-medium">
        {getMessage()}
      </p>
    </div>
  );
}
