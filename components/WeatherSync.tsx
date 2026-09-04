'use client';

import { useState, useEffect } from 'react';
import { Sun, Snowflake, CloudRain, MapPin, Sparkles } from 'lucide-react';

export default function WeatherSync() {
  const [city, setCity] = useState('الرياض');
  const [temp, setTemp] = useState(28);
  const [condition, setCondition] = useState<'hot' | 'cool' | 'mild'>('mild');

  useEffect(() => {
    // Simulate smart weather detection for user city
    const mockTemps = { الرياض: 36, جدة: 32, أبها: 18, القاهرة: 26, دبي: 34 };
    const randomCity = (['الرياض', 'جدة', 'أبها', 'القاهرة', 'دبي'] as const)[Math.floor(Math.random() * 5)];
    const t = mockTemps[randomCity];
    setCity(randomCity);
    setTemp(t);

    if (t >= 32) setCondition('hot');
    else if (t <= 20) setCondition('cool');
    else setCondition('mild');
  }, []);

  return (
    <div className="bg-gradient-to-r from-emeraldLuxury-950 via-charcoal to-emeraldLuxury-950 p-4 rounded-2xl border border-gold-500/30 text-xs text-white space-y-2 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gold-400" />
          <span className="font-bold text-gold-300">التكيّف التلقائي مع طقس مدينتك (Weather Sync)</span>
        </div>

        <div className="flex items-center gap-1.5 bg-obsidian px-3 py-1 rounded-full border border-gray-800 font-bold text-gold-400">
          {condition === 'hot' && <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin" />}
          {condition === 'cool' && <Snowflake className="w-3.5 h-3.5 text-cyan-400" />}
          {condition === 'mild' && <CloudRain className="w-3.5 h-3.5 text-emerald-400" />}
          <span>{city} • {temp}°C</span>
        </div>
      </div>

      <p className="text-[11px] text-gray-300">
        {condition === 'hot' && '☀️ طقس دافئ: ننصحك بعطور البرغموت والمسك البارد والانتعاش اليوم.'}
        {condition === 'cool' && '❄️ طقس بارد: ننصحك بنغمات العود والعنبر المعتق والدفء الأروماتك اليوم.'}
        {condition === 'mild' && '✨ طقس معتدل: كافة توليفات روما النيش متناسقة تماماً مع أجوائك اليوم.'}
      </p>
    </div>
  );
}
