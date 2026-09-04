'use client';

import { useState } from 'react';
import { Mic, MicOff, Search, Sparkles } from 'lucide-react';

export default function VoiceSearch({ onSearch }: { onSearch?: (query: string) => void }) {
  const [listening, setListening] = useState(false);
  const [text, setText] = useState('');

  const handleToggleVoice = () => {
    if (listening) {
      setListening(false);
    } else {
      setListening(true);
      // Simulate Web Speech API input
      setTimeout(() => {
        const sampleVoices = ['عطور عود ثقيلة', 'عنبر وفانيليا', 'ورد دمشقي نسائي', 'عطور نيش فخمة'];
        const chosen = sampleVoices[Math.floor(Math.random() * sampleVoices.length)];
        setText(chosen);
        if (onSearch) onSearch(chosen);
        setListening(false);
      }, 2000);
    }
  };

  return (
    <div className="relative flex items-center w-full">
      <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
      <input
        type="text"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          if (onSearch) onSearch(e.target.value);
        }}
        placeholder={listening ? 'جاري الاستماع لصوتك... 🎙️' : 'ابحث باسم العطر أو انطق بصوتك...'}
        className="w-full bg-obsidian border border-gold-500/30 rounded-xl pr-10 pl-10 py-2.5 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-gold-400"
      />
      <button
        type="button"
        onClick={handleToggleVoice}
        className={`absolute left-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-all ${
          listening ? 'bg-red-600 text-white animate-pulse' : 'text-gold-400 hover:text-white'
        }`}
        title="البحث الصوتي الذكي"
      >
        {listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
      </button>
    </div>
  );
}
