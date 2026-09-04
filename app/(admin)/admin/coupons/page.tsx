'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Plus, Tag, Sparkles, Trash2, CheckCircle } from 'lucide-react';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState([
    { id: '1', code: 'ROMA10', discountPercent: 10, isActive: true, usageCount: 24 },
    { id: '2', code: 'VIP2026', discountPercent: 15, isActive: true, usageCount: 12 },
    { id: '3', code: 'ROYAL50', discountPercent: 20, isActive: true, usageCount: 8 },
  ]);

  const [code, setCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState('10');

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;
    const newCoupon = {
      id: Date.now().toString(),
      code: code.trim().toUpperCase(),
      discountPercent: parseInt(discountPercent, 10),
      isActive: true,
      usageCount: 0,
    };
    setCoupons([...coupons, newCoupon]);
    setCode('');
    alert('تم إنشاء كود الخصم بنجاح ✨');
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت تأكد من إلغاء كود الخصم هذا؟')) {
      setCoupons(coupons.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center justify-between border-b border-gray-800 pb-4">
        <div className="space-y-1">
          <Link href="/admin" className="text-xs text-gold-400 font-bold hover:underline flex items-center gap-1">
            <ArrowRight className="w-3.5 h-3.5" />
            <span>العودة للوحة الإحصائيات</span>
          </Link>
          <h1 className="text-3xl font-black text-white">إدارة كوبونات وقسائم الخصم</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Create Coupon Form */}
        <form onSubmit={handleAddCoupon} className="lg:col-span-5 bg-charcoal p-6 rounded-2xl border border-gold-500/20 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-gold-300 border-b border-gray-800 pb-2">
            إنشاء كود خصم جديد
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-gray-300 font-bold mb-1">رمز الكوبون (Coupon Code) *</label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="مثال: WELCOME20"
                className="w-full bg-obsidian border border-gray-800 rounded-xl p-3 text-gold-300 font-mono font-bold tracking-wider uppercase focus:border-gold-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-1">نسبة الخصم (%) *</label>
              <input
                type="number"
                required
                min={1}
                max={90}
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                className="w-full bg-obsidian border border-gray-800 rounded-xl p-3 text-white focus:border-gold-400 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-gold-500 to-amber-400 text-obsidian font-extrabold py-3.5 rounded-xl text-xs shadow-lg hover:brightness-110 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>إنشاء ونشر الكوبون</span>
          </button>
        </form>

        {/* Coupons List */}
        <div className="lg:col-span-7 bg-charcoal rounded-2xl border border-gold-500/20 p-6 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white border-b border-gray-800 pb-2">
            الكوبونات المفعّلة ({coupons.length})
          </h3>

          <div className="space-y-3">
            {coupons.map((c) => (
              <div key={c.id} className="p-4 rounded-xl bg-obsidian border border-gray-800 flex justify-between items-center text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-950 text-gold-400 flex items-center justify-center font-bold">
                    <Tag className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono font-extrabold text-gold-300 text-sm block">{c.code}</span>
                    <span className="text-gray-400 text-[11px]">خصم {c.discountPercent}% • تم الاستخدام {c.usageCount} مرة</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full font-bold">
                    مفعّل ✨
                  </span>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="p-2 text-red-400 hover:bg-red-950 rounded-lg"
                    title="حذف الكوبون"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
