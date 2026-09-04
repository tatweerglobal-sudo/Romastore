'use client';

import { useState } from 'react';
import { Mic, Square, Play, QrCode, Check, RefreshCw } from 'lucide-react';

export default function VoiceGiftCard() {
  const [recording, setRecording] = useState(false);
  const [recorded, setRecorded] = useState(false);
  const [playing, setPlaying] = useState(false);

  const handleToggleRecord = () => {
    if (recording) {
      setRecording(false);
      setRecorded(true);
    } else {
      setRecording(true);
      setRecorded(false);
    }
  };

  return (
    <div className="p-4 rounded-2xl bg-charcoal border border-gold-500/20 space-y-3 text-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <QrCode className="w-4 h-4 text-gold-400" />
          <span className="font-bold text-gold-300">تسجيل كارت إهداء صوتي بحجم 15 ثانية (QR Voice Tag)</span>
        </div>
      </div>

      <div className="p-3 bg-obsidian rounded-xl border border-gray-800 space-y-3">
        {!recorded ? (
          <div className="flex items-center justify-between">
            <span className="text-gray-400">
              {recording ? 'جاري التسجيل الصوتي... 🔴' : 'اضغط على المايك لتسجيل رسالتك بصوتك'}
            </span>
            <button
              type="button"
              onClick={handleToggleRecord}
              className={`p-3 rounded-full font-bold transition-all ${
                recording
                  ? 'bg-red-600 text-white animate-pulse'
                  : 'bg-gold-500 text-obsidian hover:bg-gold-400'
              }`}
            >
              {recording ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-emerald-400 font-bold">
              <span className="flex items-center gap-1">
                <Check className="w-4 h-4" />
                <span>تم تسجيل رسالتك الصوتية بنجاح!</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  setRecorded(false);
                  setRecording(false);
                }}
                className="text-gray-400 hover:text-white p-1"
                title="إعادة التسجيل"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-3 p-2 bg-charcoal rounded-lg border border-gold-500/30">
              <button
                type="button"
                onClick={() => setPlaying(!playing)}
                className="p-2 rounded-full bg-gold-500 text-obsidian"
              >
                <Play className="w-3.5 h-3.5" />
              </button>
              <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div className={`h-full bg-gold-400 ${playing ? 'w-full transition-all duration-3000' : 'w-1/3'}`} />
              </div>
              <span className="text-[10px] text-gold-300 font-bold">00:15</span>
            </div>

            <p className="text-[10px] text-gray-400">
              سيتم طباعة كود QR فاخر يُطبع على بطاقة الإهداء يسمح لمن يستلم الهدية بمسحه والاستماع لصوتك!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
