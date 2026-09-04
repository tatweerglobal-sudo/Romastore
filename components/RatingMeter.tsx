'use client';

import React from 'react';
import { Clock, Wind, Star } from 'lucide-react';

interface RatingMeterProps {
  longevity: number; // 1-5
  sillage: number;   // 1-5
}

export default function RatingMeter({ longevity, sillage }: RatingMeterProps) {
  const getLongevityText = (score: number) => {
    if (score >= 5) return 'ثبات فائق ممتد (+24 ساعة)';
    if (score >= 4) return 'ثبات يدوم طوال اليوم (12 - 18 ساعة)';
    if (score >= 3) return 'ثبات متوسط (6 - 8 ساعات)';
    return 'ثبات خفيف يومي';
  };

  const getSillageText = (score: number) => {
    if (score >= 5) return 'فوّاح جداً (يملأ المكان بحضورك)';
    if (score >= 4) return 'فوحان قوي وملحوظ بامتياز';
    if (score >= 3) return 'فوحان متزن على مسافة ذراع';
    return 'فوحان هادئ وقريب من البشرة';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-charcoal/90 border border-gold-500/20">
      {/* Longevity Meter */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 text-gold-300 font-bold">
            <Clock className="w-4 h-4 text-gold-400" />
            <span>مقياس الثبات (Longevity)</span>
          </span>
          <span className="text-gold-400 font-extrabold">{longevity} / 5</span>
        </div>

        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={`h-2.5 flex-1 rounded-full transition-all ${
                level <= longevity
                  ? 'bg-gradient-to-r from-gold-500 to-amber-300 shadow-[0_0_8px_rgba(245,177,62,0.5)]'
                  : 'bg-gray-800'
              }`}
            />
          ))}
        </div>
        <p className="text-[11px] text-gray-300 font-medium">{getLongevityText(longevity)}</p>
      </div>

      {/* Sillage Meter */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 text-emerald-300 font-bold">
            <Wind className="w-4 h-4 text-emerald-400" />
            <span>مقياس الفوحان (Sillage)</span>
          </span>
          <span className="text-emerald-400 font-extrabold">{sillage} / 5</span>
        </div>

        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={`h-2.5 flex-1 rounded-full transition-all ${
                level <= sillage
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-300 shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                  : 'bg-gray-800'
              }`}
            />
          ))}
        </div>
        <p className="text-[11px] text-gray-300 font-medium">{getSillageText(sillage)}</p>
      </div>
    </div>
  );
}
