'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Save, MessageCircle, ShieldCheck } from 'lucide-react';

export default function AdminSettingsPage() {
  const [whatsappNumber, setWhatsappNumber] = useState('966501234567');
  const [storeName, setStoreName] = useState('روما للعطور الفاخرة');
  const [loading, setLoading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Persist to localStorage / server setting
    localStorage.setItem('roma_admin_whatsapp', whatsappNumber);
    localStorage.setItem('roma_store_name', storeName);
    setLoading(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  useEffect(() => {
    const savedPhone = localStorage.getItem('roma_admin_whatsapp');
    if (savedPhone) setWhatsappNumber(savedPhone);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="flex items-center justify-between border-b border-gray-800 pb-4">
        <div className="space-y-1">
          <Link href="/admin" className="text-xs text-gold-400 font-bold hover:underline flex items-center gap-1">
            <ArrowRight className="w-3.5 h-3.5" />
            <span>العودة للوحة الإحصائيات</span>
          </Link>
          <h1 className="text-3xl font-black text-white">إعدادات الواتساب واستقبال الطلبات</h1>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-charcoal p-8 rounded-3xl border border-gold-500/20 space-y-6 shadow-2xl">
        <div className="flex items-center gap-3 p-4 bg-emeraldLuxury-950 rounded-2xl border border-emerald-500/30 text-xs text-emerald-300">
          <MessageCircle className="w-6 h-6 text-emerald-400 flex-shrink-0" />
          <p>
            تتيح لك هذه الصفحة تغيير رقم هاتف الواتساب المخصص لاستقبال الطلبات والفواتير التلقائية من العملاء في أي وقت.
          </p>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-gray-300 font-bold mb-1">اسم المتجر الأساسي *</label>
            <input
              type="text"
              required
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full bg-obsidian border border-gray-800 rounded-xl p-3.5 text-white focus:border-gold-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-bold mb-1">
              رقم هاتف الواتساب المخصص لاستقبال الطلبات (مع رمز الدولة بدون +) *
            </label>
            <input
              type="tel"
              required
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="مثال: 966501234567"
              className="w-full bg-obsidian border border-gray-800 rounded-xl p-3.5 text-white focus:border-gold-400 focus:outline-none font-mono text-sm text-gold-300"
            />
            <span className="text-[11px] text-gray-400 mt-1 block">
              تأكد من إدخال الرقم دولياً مثل: 966501234567 (السعودية) أو 201000000000 (مصر).
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl transition-all ${
            savedSuccess
              ? 'bg-emerald-600 text-white'
              : 'bg-gradient-to-r from-gold-500 to-amber-400 text-obsidian hover:brightness-110'
          }`}
        >
          <Save className="w-5 h-5" />
          <span>{savedSuccess ? 'تم حفظ الإعدادات بنجاح!' : 'حفظ التغييرات الآن'}</span>
        </button>
      </form>
    </div>
  );
}
