'use client';

import { useState, useEffect } from 'react';
import { Smartphone, X, Sparkles } from 'lucide-react';

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      alert('لإضافة المتجر لشاشة هاتفك، اضغط على زر المشاركة في المتصفح ثم اختر "إضافة إلى الشاشة الرئيسية"');
      setShowPrompt(false);
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-5 left-5 right-5 md:left-auto md:right-8 z-50 max-w-sm bg-obsidian/95 backdrop-blur-md border border-gold-500/40 rounded-2xl p-4 shadow-[0_0_30px_rgba(217,140,25,0.3)] text-white animate-fadeIn">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gold-950 text-gold-400 border border-gold-500/30">
            <Smartphone className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-gold-300 flex items-center gap-1">
              <span>تثبيت تطبيق روما للعطور</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </h4>
            <p className="text-xs text-gray-300 mt-0.5 leading-relaxed">
              أضف المتجر لشاشة هاتفك الرئيسية لتصفح أسرع وعروض عطرية حصرية
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowPrompt(false)}
          className="text-gray-400 hover:text-white p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <button
        onClick={handleInstall}
        className="w-full mt-3 bg-gradient-to-r from-gold-500 via-amber-400 to-gold-600 text-obsidian font-black py-2.5 rounded-xl text-xs hover:brightness-110 shadow-lg transition-all"
      >
        إضافة لشاشة الهاتف الآن ✨
      </button>
    </div>
  );
}
