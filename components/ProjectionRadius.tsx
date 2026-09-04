'use client';

import React from 'react';
import { Compass, Sparkles } from 'lucide-react';

interface ProjectionRadiusProps {
  sillageScore: number; // 1 to 5
}

export default function ProjectionRadius({ sillageScore }: ProjectionRadiusProps) {
  const getRadiusMeters = (score: number) => {
    if (score >= 5) return { meters: '5+ أمتار', label: 'فوحان نفاذ صاروخي يسبقك للمكان' };
    if (score >= 4) return { meters: '3 - 4 أمتار', label: 'فوحان قوي يملأ الغرفة بحضورك' };
    if (score >= 3) return { meters: '1.5 - 2 متر', label: 'فوحان متزن على مسافة ذراع' };
    return { meters: '1 متر', label: 'فوحان هادئ وقريب من البشرة' };
  };

  const radiusInfo = getRadiusMeters(sillageScore);

  return (
    <div className="p-4 rounded-2xl bg-charcoal border border-gold-500/20 text-xs space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-bold text-gold-300 flex items-center gap-1.5">
          <Compass className="w-4 h-4 text-gold-400" />
          <span>محاكي مدى قطر الفوحان (Scent Projection Radius)</span>
        </span>
        <span className="bg-gold-500/20 text-gold-300 font-extrabold px-2.5 py-0.5 rounded-full border border-gold-500/30">
          {radiusInfo.meters}
        </span>
      </div>

      {/* Visual Concentric Circles Simulation */}
      <div className="relative h-28 bg-obsidian rounded-xl border border-gray-800 flex items-center justify-center overflow-hidden">
        {/* Outer Ring */}
        <div className={`absolute rounded-full border border-gold-500/20 animate-ping opacity-20 ${sillageScore >= 4 ? 'w-24 h-24' : 'w-16 h-16'}`} />
        <div className={`absolute rounded-full border border-amber-400/30 ${sillageScore >= 5 ? 'w-24 h-24' : sillageScore >= 3 ? 'w-16 h-16' : 'w-10 h-10'}`} />
        
        {/* Center Bottle Avatar */}
        <div className="w-8 h-8 rounded-full bg-gold-500 text-obsidian font-bold flex items-center justify-center shadow-[0_0_15px_rgba(217,140,25,0.6)] z-10 text-[10px]">
          R
        </div>

        <div className="absolute bottom-2 right-2 text-[10px] text-gray-400">
          قطر انتشار الرائحة حولك
        </div>
      </div>

      <p className="text-[11px] text-gray-300 font-medium text-center">
        ✨ {radiusInfo.label}
      </p>
    </div>
  );
}
