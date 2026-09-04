'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CreditCard, ShieldCheck, Check, Settings, ToggleLeft, ToggleRight, ArrowRight, Zap, RefreshCw, Key, Lock, Globe } from 'lucide-react';

export default function AdminPaymentsPage() {
  const [gateways, setGateways] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGw, setSelectedGw] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const fetchGateways = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/payments');
      const data = await res.json();
      if (data.success) {
        setGateways(data.gateways);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGateways();
  }, []);

  const handleToggle = async (gw: any) => {
    try {
      const res = await fetch('/api/admin/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'toggle',
          gateway: { ...gw, isEnabled: !gw.isEnabled },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setGateways((prev) =>
          prev.map((g) => (g.code === gw.code ? { ...g, isEnabled: !gw.isEnabled } : g))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSetDefault = async (gw: any) => {
    try {
      const res = await fetch('/api/admin/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'setDefault',
          gateway: gw,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setGateways((prev) =>
          prev.map((g) => ({
            ...g,
            isDefault: g.code === gw.code,
            isEnabled: g.code === gw.code ? true : g.isEnabled,
          }))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveKeys = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGw) return;
    setSaving(true);
    setMessage('');

    try {
      const res = await fetch('/api/admin/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'updateKeys',
          gateway: selectedGw,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('تم حفظ إعدادات البوابة بنجاح! ✨');
        fetchGateways();
        setTimeout(() => setSelectedGw(null), 1200);
      } else {
        setMessage('حدث خطأ أثناء الحفظ.');
      }
    } catch (e) {
      setMessage('فشل الاتصال بالسيرفر.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>لوحة تحكم المسؤول (Roma Payment Switcher)</span>
          </div>
          <h1 className="text-3xl font-black text-white">إدارة وتبديل بوابات الدفع الفورية</h1>
        </div>

        <Link
          href="/admin"
          className="inline-flex items-center gap-2 bg-charcoal border border-gray-800 text-gray-300 hover:text-white text-xs font-bold px-4 py-2.5 rounded-xl self-start sm:self-auto"
        >
          <ArrowRight className="w-4 h-4" />
          <span>الرجوع للوحة التحكم</span>
        </Link>
      </div>

      {/* Overview Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emeraldLuxury-950 via-obsidian to-charcoal border border-gold-500/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-lg font-bold text-gold-300 flex items-center gap-2">
            <Zap className="w-5 h-5 text-gold-400" />
            <span>نظام التبديل الديناميكي لبوابات الدفع</span>
          </h2>
          <p className="text-xs text-gray-300 mt-1 max-w-2xl">
            يمكنك تفعيل أو إيقاف أي بوابة دفع (مدى، آبل باي، فودافون كاش، باي مب، فوري، تاب، تابي للتقسيط) بنقرة زر واحدة. العميل يرى البوابات المفعّلة فقط في صفحة الدفع تلقائياً!
          </p>
        </div>
        <button
          onClick={fetchGateways}
          className="bg-gold-500/20 hover:bg-gold-500/30 text-gold-300 text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 transition-colors border border-gold-500/30"
        >
          <RefreshCw className="w-4 h-4" />
          <span>تحديث البوابات</span>
        </button>
      </div>

      {/* Gateways Grid */}
      {loading ? (
        <div className="py-12 text-center text-gray-400 text-sm">جاري تحميل بوابات الدفع...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gateways.map((gw) => (
            <div
              key={gw.code}
              className={`p-6 rounded-2xl border transition-all space-y-4 ${
                gw.isEnabled
                  ? 'bg-charcoal border-gold-500/40 shadow-lg shadow-gold-500/5'
                  : 'bg-obsidian/60 border-gray-800 opacity-60'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{gw.icon || '💳'}</span>
                  <div>
                    <h3 className="text-sm font-black text-white flex items-center gap-2">
                      {gw.nameAr}
                    </h3>
                    <span className="text-[11px] text-gray-400 font-mono block">{gw.code}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleToggle(gw)}
                  className="text-gray-400 hover:text-white transition-colors"
                  title={gw.isEnabled ? 'إيقاف البوابة' : 'تفعيل البوابة'}
                >
                  {gw.isEnabled ? (
                    <ToggleRight className="w-8 h-8 text-emerald-400" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-gray-600" />
                  )}
                </button>
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap gap-2 text-[11px]">
                {gw.isDefault ? (
                  <span className="bg-gold-500 text-obsidian px-2.5 py-0.5 rounded-full font-bold">
                    ★ البوابة الافتراضية
                  </span>
                ) : (
                  <button
                    onClick={() => handleSetDefault(gw)}
                    className="bg-gray-800 hover:bg-gold-500/20 text-gray-300 hover:text-gold-300 px-2.5 py-0.5 rounded-full font-medium transition-colors border border-gray-700"
                  >
                    تعيين كبوابة أساسية
                  </button>
                )}

                {gw.isTestMode ? (
                  <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
                    وضع التجربة (Test Sandbox)
                  </span>
                ) : (
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                    مباشر (Live Production)
                  </span>
                )}
              </div>

              {/* Edit Credentials Button */}
              {gw.code !== 'COD' && (
                <div className="border-t border-gray-800 pt-4 flex justify-between items-center">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Key className="w-3.5 h-3.5" />
                    <span>مفاتيح الـ API: {gw.apiKey ? 'مكتملة ✅' : 'غير مدخلة'}</span>
                  </span>
                  <button
                    onClick={() => setSelectedGw(gw)}
                    className="text-xs font-bold text-gold-400 hover:text-gold-300 flex items-center gap-1 bg-gold-500/10 px-3 py-1.5 rounded-lg border border-gold-500/20 transition-all"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>إعداد المفاتيح</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Edit Credentials Modal */}
      {selectedGw && (
        <div className="fixed inset-0 bg-obsidian/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-charcoal border border-gold-500/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-gray-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedGw.icon || '💳'}</span>
                <div>
                  <h3 className="text-base font-bold text-white">إعداد مفاتيح: {selectedGw.nameAr}</h3>
                  <span className="text-xs text-gray-400">رمز البوابة: {selectedGw.code}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedGw(null)}
                className="text-gray-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {message && (
              <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold rounded-xl text-center">
                {message}
              </div>
            )}

            <form onSubmit={handleSaveKeys} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-bold mb-1">المفتاح العام (API Key / Public Key)</label>
                <input
                  type="text"
                  value={selectedGw.apiKey || ''}
                  onChange={(e) => setSelectedGw({ ...selectedGw, apiKey: e.target.value })}
                  placeholder="e.g. pk_test_xxxxxx or api_key_xxx"
                  className="w-full bg-obsidian border border-gray-800 rounded-xl px-4 py-2.5 text-white font-mono text-xs focus:border-gold-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">المفتاح السري (Secret Key / Auth Token)</label>
                <input
                  type="password"
                  value={selectedGw.secretKey || ''}
                  onChange={(e) => setSelectedGw({ ...selectedGw, secretKey: e.target.value })}
                  placeholder="e.g. sk_test_xxxxxx or secret_token_xxx"
                  className="w-full bg-obsidian border border-gray-800 rounded-xl px-4 py-2.5 text-white font-mono text-xs focus:border-gold-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">معرّف التاجر (Merchant ID)</label>
                <input
                  type="text"
                  value={selectedGw.merchantId || ''}
                  onChange={(e) => setSelectedGw({ ...selectedGw, merchantId: e.target.value })}
                  placeholder="e.g. merch_99210"
                  className="w-full bg-obsidian border border-gray-800 rounded-xl px-4 py-2.5 text-white font-mono text-xs focus:border-gold-400 outline-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="testMode"
                  checked={selectedGw.isTestMode}
                  onChange={(e) => setSelectedGw({ ...selectedGw, isTestMode: e.target.checked })}
                  className="accent-gold-500 w-4 h-4"
                />
                <label htmlFor="testMode" className="text-gray-300 font-bold">
                  تفعيل وضع التجربة والتست (Sandbox Test Mode)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setSelectedGw(null)}
                  className="px-4 py-2.5 bg-gray-800 text-gray-300 font-bold rounded-xl hover:bg-gray-700"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-gold-500 hover:bg-gold-400 text-obsidian font-bold rounded-xl transition-all shadow-lg"
                >
                  {saving ? 'جاري الحفظ...' : 'حفظ التعديلات'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
