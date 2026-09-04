'use client';

import { useState } from 'react';
import { Coins } from 'lucide-react';

export default function CurrencySwitcher() {
  const [currency, setCurrency] = useState('SAR');

  const currencies = [
    { code: 'SAR', label: 'ر.س (السعودية)' },
    { code: 'EGP', label: 'ج.م (مصر)' },
    { code: 'AED', label: 'د.إ (الإمارات)' },
    { code: 'USD', label: '$ (USD)' },
  ];

  return (
    <div className="flex items-center gap-1 bg-obsidian border border-gold-500/30 rounded-lg px-2 py-1 text-xs text-gold-300">
      <Coins className="w-3.5 h-3.5 text-gold-400" />
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="bg-transparent text-gold-300 font-bold focus:outline-none text-[11px] cursor-pointer"
      >
        {currencies.map((c) => (
          <option key={c.code} value={c.code} className="bg-obsidian text-white">
            {c.label}
          </option>
        ))}
      </select>
    </div>
  );
}
