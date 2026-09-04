'use client';

import { useState } from 'react';
import { Sparkles, Type, Check } from 'lucide-react';

interface EngravingOptionProps {
  onEngravingChange?: (text: string) => void;
}

export default function EngravingOption({ onEngravingChange }: EngravingOptionProps) {
  const [enabled, setEnabled] = useState(false);
  const [engravingText, setEngravingText] = useState('');

  const handleChange = (val: string) => {
    setEngravingText(val);
    if (onEngravingChange) onEngravingChange(val);
  };

  return (
    <div className="p-4 rounded-2xl bg-obsidian border border-gold-500/30 space-y-3 text-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-gold-400" />
          <span className="font-bold text-gold-300">حفر اسمك أو تاريخك بالليزر على الغطاء الذهبي (مجاناً)</span>
        </div>
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
          className="w-4 h-4 accent-gold-500 rounded cursor-pointer"
        />
      </div>

      {enabled && (
        <div className="space-y-2 animate-fadeIn pt-1">
          <div className="relative">
            <Type className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              maxLength={25}
              value={engravingText}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="اكتب الاسم أو التاريخ للحفر (مثال: عبدالملك • 2026)"
              className="w-full bg-charcoal border border-gold-500/40 rounded-xl pr-9 pl-3 py-2 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold-400"
            />
          </div>
          
          {/* Live Preview on Bottle Cap */}
          {engravingText && (
            <div className="p-3 bg-gradient-to-r from-gold-950 to-charcoal rounded-xl border border-gold-500/30 text-center space-y-1">
              <span className="text-[10px] text-gray-400 block">معاينة الحفر بالليزر على غطاء الزجاجة:</span>
              <div className="font-serif font-extrabold text-gold-300 tracking-widest text-sm uppercase">
                ✧ {engravingText} ✧
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
