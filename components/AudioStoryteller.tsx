'use client';

import { useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Sparkles } from 'lucide-react';

export default function AudioStoryteller({ perfumeName }: { perfumeName: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-r from-gold-950/60 via-charcoal to-gold-950/60 border border-gold-500/30 text-xs space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-gold-400" />
          <span className="font-bold text-gold-200">التعليق الصوتي السينمائي (Audio Story)</span>
        </div>

        <button
          onClick={toggleAudio}
          className="flex items-center gap-1.5 bg-gold-500 hover:bg-gold-400 text-obsidian px-3.5 py-1.5 rounded-full font-bold transition-all shadow-md"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span>إيقاف الصوتي</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              <span>استمع لقصة نغمات العطر 🎧</span>
            </>
          )}
        </button>
      </div>

      {isPlaying && (
        <div className="p-3 bg-obsidian/90 rounded-xl border border-gold-500/30 text-[11px] text-gray-300 leading-relaxed space-y-1.5 animate-fadeIn">
          <div className="flex items-center gap-2 text-gold-400 font-bold">
            <Volume2 className="w-4 h-4 animate-bounce" />
            <span>راوي روما السينمائي:</span>
          </div>
          <p className="italic text-gold-100">
            "يفتتح {perfumeName} بنفحات عطرية منعشة تشع بالفخامة، ثم يغوص في قلب مخملي زكي، ليستقر في النهاية على قاعدة ثرية من أندر أنواط العود والعنبر المعتق..."
          </p>
        </div>
      )}
    </div>
  );
}
