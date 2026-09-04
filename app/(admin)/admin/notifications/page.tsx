'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageSquare, ShieldCheck, ArrowRight, ToggleLeft, ToggleRight, Save, Send, Sparkles, AlertCircle } from 'lucide-react';

export default function AdminNotificationsPage() {
  const [settings, setSettings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState<string | null>(null);
  const [templateText, setTemplateText] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/notifications');
      const data = await res.json();
      if (data.success) {
        setSettings(data.settings);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleToggle = async (item: any) => {
    try {
      const res = await fetch('/api/admin/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: item.event,
          isEnabled: !item.isEnabled,
          templateAr: item.templateAr,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSettings((prev) =>
          prev.map((s) => (s.event === item.event ? { ...s, isEnabled: !item.isEnabled } : s))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleStartEdit = (item: any) => {
    setEditingEvent(item.event);
    setTemplateText(item.templateAr);
    setMessage('');
  };

  const handleSaveTemplate = async (item: any) => {
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: item.event,
          isEnabled: item.isEnabled,
          templateAr: templateText,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('تم حفظ قالب التنبيه بنجاح! ✨');
        fetchSettings();
        setTimeout(() => setEditingEvent(null), 1000);
      }
    } catch (e) {
      setMessage('حدث خطأ أثناء الحفظ.');
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
            <span>لوحة التنبيهات والواتساب الآلي (Notification Hub)</span>
          </div>
          <h1 className="text-3xl font-black text-white">إدارة رسائل الواتساب والتنبيهات التلقائية</h1>
        </div>

        <Link
          href="/admin"
          className="inline-flex items-center gap-2 bg-charcoal border border-gray-800 text-gray-300 hover:text-white text-xs font-bold px-4 py-2.5 rounded-xl self-start sm:self-auto"
        >
          <ArrowRight className="w-4 h-4" />
          <span>الرجوع للوحة التحكم</span>
        </Link>
      </div>

      {/* Info Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emeraldLuxury-950 via-obsidian to-charcoal border border-gold-500/30 space-y-2">
        <h2 className="text-base font-bold text-gold-300 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-gold-400" />
          <span>المساعد الذكي لإرسال الفواتير وتتبع الشحنات بالواتساب</span>
        </h2>
        <p className="text-xs text-gray-300 max-w-3xl leading-relaxed">
          يقوم المتجر تلقائياً بإرسال رسالة واتساب وإيميل للعميل فور تأكيد الدفع، أو عند تغيير حالة الطلب إلى (تم الشحن) مع رقم التتبع، أو عند ترك العطر في السلة دون إكمال الشراء.
        </p>
      </div>

      {/* Settings Grid */}
      {loading ? (
        <div className="py-12 text-center text-gray-400 text-sm">جاري تحميل إعدادات التنبيهات...</div>
      ) : (
        <div className="space-y-6">
          {settings.map((item) => (
            <div
              key={item.event}
              className={`p-6 rounded-2xl border transition-all space-y-4 ${
                item.isEnabled
                  ? 'bg-charcoal border-gold-500/30'
                  : 'bg-obsidian/60 border-gray-800 opacity-60'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-400 flex items-center justify-center font-bold">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {item.event === 'ORDER_PAID' && '💳 التنبيه الفوري عند استلام المبلغ والدفع'}
                      {item.event === 'ORDER_SHIPPED' && '🚚 التنبيه الفوري عند تغيير الحالة إلى (تم الشحن)'}
                      {item.event === 'ORDER_DELIVERED' && '🎉 التنبيه والتأكيد عند التسليم للعميل'}
                      {item.event === 'ABANDONED_CART' && '🛒 التنبيه التلقائي لسلات الشراء المتروكة'}
                    </h3>
                    <span className="text-xs text-gray-400 font-mono">الحدث: {item.event}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleToggle(item)}
                    className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-xl border border-gray-700 bg-obsidian text-gray-300 hover:text-white"
                  >
                    <span>{item.isEnabled ? 'مُفعّل' : 'معطل'}</span>
                    {item.isEnabled ? (
                      <ToggleRight className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-gray-600" />
                    )}
                  </button>

                  <button
                    onClick={() => handleStartEdit(item)}
                    className="bg-gold-500 hover:bg-gold-400 text-obsidian text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md"
                  >
                    تعديل نص الرسالة
                  </button>
                </div>
              </div>

              {/* Template Editor or Preview */}
              {editingEvent === item.event ? (
                <div className="space-y-4 pt-2">
                  {message && (
                    <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold rounded-xl">
                      {message}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-gold-300 mb-1">
                      قالب الرسالة العربي (يدعم المتغيرات الديناميكية):
                    </label>
                    <textarea
                      rows={5}
                      value={templateText}
                      onChange={(e) => setTemplateText(e.target.value)}
                      className="w-full bg-obsidian border border-gray-800 rounded-xl p-4 text-white text-xs leading-relaxed font-mono focus:border-gold-400 outline-none"
                    />
                  </div>

                  <div className="bg-obsidian/80 p-4 rounded-xl border border-gray-800 text-[11px] text-gray-400 space-y-1">
                    <span className="font-bold text-gray-300 block">💡 المتغيرات المتاحة للاستخدام:</span>
                    <p>
                      <code className="text-gold-300 font-mono">{'{customer_name}'}</code> : اسم العميل |{' '}
                      <code className="text-gold-300 font-mono">{'{order_number}'}</code> : رقم الطلب |{' '}
                      <code className="text-gold-300 font-mono">{'{total_amount}'}</code> : إجمالي المبلغ |{' '}
                      <code className="text-gold-300 font-mono">{'{invoice_url}'}</code> : رابط الفاتورة الرقمية |{' '}
                      <code className="text-gold-300 font-mono">{'{tracking_number}'}</code> : رقم تتبع الشحنة
                    </p>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => setEditingEvent(null)}
                      className="px-4 py-2 bg-gray-800 text-gray-300 font-bold text-xs rounded-xl hover:bg-gray-700"
                    >
                      إلغاء
                    </button>
                    <button
                      onClick={() => handleSaveTemplate(item)}
                      disabled={saving}
                      className="px-6 py-2 bg-gold-500 hover:bg-gold-400 text-obsidian font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5"
                    >
                      <Save className="w-4 h-4" />
                      <span>{saving ? 'جاري الحفظ...' : 'حفظ القالب'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-obsidian p-4 rounded-xl border border-gray-800/80">
                  <span className="text-[11px] font-bold text-gray-400 block mb-1">معاينة النص الحالي:</span>
                  <pre className="text-xs text-emerald-300 whitespace-pre-wrap font-sans leading-relaxed">
                    {item.templateAr}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
