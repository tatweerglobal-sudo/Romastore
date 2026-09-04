'use client';

import React from 'react';
import { Sparkles, Heart, Anchor, Sun } from 'lucide-react';

interface FragrancePyramidProps {
  topNotes: string;
  heartNotes: string;
  baseNotes: string;
}

export default function FragrancePyramid({ topNotes, heartNotes, baseNotes }: FragrancePyramidProps) {
  const parseNotes = (notesStr: string) =>
    notesStr.split(',').map((n) => n.trim()).filter(Boolean);

  const topList = parseNotes(topNotes);
  const heartList = parseNotes(heartNotes);
  const baseList = parseNotes(baseNotes);

  return (
    <div className="bg-gradient-to-b from-charcoal to-emeraldLuxury-950 p-6 rounded-2xl border border-gold-500/20 shadow-xl space-y-6">
      <div className="text-center space-y-1">
        <h3 className="text-lg font-bold text-gold-300 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-gold-400" />
          <span>الهرم العطري التفاعلي (Fragrance Notes)</span>
        </h3>
        <p className="text-xs text-gray-400">تدرج التحول المدهش لمكونات العطر عبر الساعات</p>
      </div>

      <div className="space-y-4 max-w-xl mx-auto">
        
        {/* Top Notes - القمة */}
        <div className="relative group p-4 rounded-xl bg-gold-950/40 border border-gold-400/30 hover:border-gold-400 transition-all">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-gold-500/20 text-gold-300 flex items-center justify-center font-bold">
              <Sun className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gold-200">القمة العطرية (Top Notes)</h4>
              <span className="text-[11px] text-gold-400/80">الافتتاحية المنعشة (أول 15 - 30 دقيقة)</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pr-11">
            {topList.map((note, idx) => (
              <span
                key={idx}
                className="bg-gold-500/10 border border-gold-500/30 text-gold-200 text-xs px-3 py-1 rounded-full font-medium shadow-sm hover:scale-105 transition-transform"
              >
                🌿 {note}
              </span>
            ))}
          </div>
        </div>

        {/* Heart Notes - القلب */}
        <div className="relative group p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-400 transition-all mr-3">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
              <Heart className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-emerald-200">قلب العطر (Heart Notes)</h4>
              <span className="text-[11px] text-emerald-400/80">روح العطر وجوهره الأصيل (تستمر حتى 4 ساعات)</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pr-11">
            {heartList.map((note, idx) => (
              <span
                key={idx}
                className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-xs px-3 py-1 rounded-full font-medium shadow-sm hover:scale-105 transition-transform"
              >
                🌸 {note}
              </span>
            ))}
          </div>
        </div>

        {/* Base Notes - القاعدة */}
        <div className="relative group p-4 rounded-xl bg-obsidian border border-amber-500/30 hover:border-amber-400 transition-all mr-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
              <Anchor className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-200">قاعدة العطر (Base Notes)</h4>
              <span className="text-[11px] text-amber-400/80">الاستقرار والعمق والدفء (تستمر طوال اليوم والليل)</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pr-11">
            {baseList.map((note, idx) => (
              <span
                key={idx}
                className="bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs px-3 py-1 rounded-full font-medium shadow-sm hover:scale-105 transition-transform"
              >
                🪵 {note}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
