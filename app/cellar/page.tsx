'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Wine, Calendar, Clock, Award } from 'lucide-react';

export default function DigitalCellarPage() {
  const ownedPerfumes = [
    {
      id: '1',
      name: 'روما نيش - عود الملكية',
      purchaseDate: '2026/01/15',
      macerationStatus: 'ذروة التعتيق المثالية (100%)',
      recommendation: 'الطقس الحالي بارد - العطر جاهز لأعلى فوحان وثبات اليوم! ❄️',
      size: '100ml',
      image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: '2',
      name: 'إكسير المخمل الذهبي',
      purchaseDate: '2026-03-01',
      macerationStatus: 'جاري الاستقرار والتعتيق (85%)',
      recommendation: 'يفضل حفظه بعيداً عن الضوء لمدة 10 أيام أخرى لتضاعف الثبات.',
      size: '100ml',
      image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-gold-950/80 border border-gold-500/30 text-gold-300 text-xs px-4 py-1.5 rounded-full">
          <Wine className="w-4 h-4 text-gold-400" />
          <span>خزانة عطورك الرقمية (Digital Perfume Cellar)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">متابعة تعتيق وجاهزية عطورك</h1>
        <p className="text-xs sm:text-sm text-gray-400">
          تابع مرحلة التعتيق الزمني (Maceration) لعطورك المملوكة وتلقَّ التوصيات الذكية بموعد ارتدائها المثالي.
        </p>
      </div>

      <div className="space-y-4">
        {ownedPerfumes.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-3xl bg-charcoal border border-gold-500/20 shadow-xl flex flex-col sm:flex-row gap-6 items-center"
          >
            <div className="w-24 h-24 relative rounded-2xl overflow-hidden border border-gray-800 flex-shrink-0">
              <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
            </div>

            <div className="space-y-2 flex-1 text-right">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">{item.name}</h3>
                <span className="text-xs bg-emerald-950 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full font-bold">
                  {item.macerationStatus}
                </span>
              </div>

              <div className="flex gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gold-400" />
                  شراء: {item.purchaseDate}
                </span>
                <span>الحجم: {item.size}</span>
              </div>

              <div className="p-3 bg-obsidian rounded-xl border border-gray-800 text-xs text-gold-200">
                💡 <span className="font-bold">التوصية:</span> {item.recommendation}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
