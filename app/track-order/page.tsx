'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, AlertCircle } from 'lucide-react';

interface OrderDetails {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  address: string;
  city: string;
  totalAmount: number;
  paymentMethod: string;
  status: string;
  giftMessage?: string | null;
  createdAt: string;
  items: {
    id: string;
    product: {
      name: string;
      images: string;
      size: string;
    };
    quantity: number;
    price: number;
  }[];
}

function TrackOrderForm() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('orderNumber') || '';

  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (searchVal: string) => {
    if (!searchVal.trim()) return;
    setLoading(true);
    setSearched(true);
    setOrder(null);

    try {
      const res = await fetch(`/api/orders?search=${encodeURIComponent(searchVal)}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setOrder(data[0]);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  const getStatusBadge = (st: string) => {
    switch (st) {
      case 'PENDING':
        return { label: 'قيد المعالجة والتجهيز ⏳', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
      case 'PROCESSING':
        return { label: 'جاري تغليف الهرم العطري 🎁', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' };
      case 'SHIPPED':
        return { label: 'تم تسليم الشحنة لشركة الشحن 🚚', color: 'bg-purple-500/20 text-purple-300 border-purple-500/40' };
      case 'DELIVERED':
        return { label: 'تم التوصيل بنجاح ✅', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
      default:
        return { label: st, color: 'bg-gray-800 text-gray-300 border-gray-700' };
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Input Box */}
      <div className="bg-charcoal p-4 rounded-2xl border border-gold-500/20 flex gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="أدخل رقم الطلب أو رقم الجوال..."
            className="w-full bg-obsidian border border-gray-800 rounded-xl pr-10 pl-4 py-3 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-gold-400"
          />
        </div>
        <button
          onClick={() => handleSearch(query)}
          className="bg-gold-500 hover:bg-gold-400 text-obsidian font-bold text-xs px-6 py-3 rounded-xl transition-all"
        >
          {loading ? 'جاري البحث...' : 'تتبع الآن'}
        </button>
      </div>

      {/* Result View */}
      {searched && !loading && (
        <>
          {order ? (
            <div className="bg-charcoal p-6 rounded-2xl border border-gold-500/20 space-y-6">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-800 pb-4 gap-2">
                <div>
                  <span className="text-[10px] text-gray-400 block">رقم الطلب:</span>
                  <h3 className="text-lg font-black text-gold-300">{order.orderNumber}</h3>
                </div>

                <div className={`px-4 py-1.5 rounded-full border text-xs font-bold ${getStatusBadge(order.status).color}`}>
                  {getStatusBadge(order.status).label}
                </div>
              </div>

              {/* Progress Steps */}
              <div className="grid grid-cols-4 gap-2 text-center text-[11px] pt-2">
                <div className="space-y-1">
                  <div className="w-8 h-8 rounded-full bg-gold-500 text-obsidian font-bold flex items-center justify-center mx-auto">1</div>
                  <span className="text-gold-300 font-bold block">مُأكد</span>
                </div>
                <div className="space-y-1">
                  <div className={`w-8 h-8 rounded-full font-bold flex items-center justify-center mx-auto ${order.status !== 'PENDING' ? 'bg-gold-500 text-obsidian' : 'bg-gray-800 text-gray-500'}`}>2</div>
                  <span className="text-gray-300 block">تجهيز</span>
                </div>
                <div className="space-y-1">
                  <div className={`w-8 h-8 rounded-full font-bold flex items-center justify-center mx-auto ${['SHIPPED', 'DELIVERED'].includes(order.status) ? 'bg-gold-500 text-obsidian' : 'bg-gray-800 text-gray-500'}`}>3</div>
                  <span className="text-gray-300 block">مشحون</span>
                </div>
                <div className="space-y-1">
                  <div className={`w-8 h-8 rounded-full font-bold flex items-center justify-center mx-auto ${order.status === 'DELIVERED' ? 'bg-emerald-500 text-white' : 'bg-gray-800 text-gray-500'}`}>4</div>
                  <span className="text-gray-300 block">مستلم</span>
                </div>
              </div>

              {/* Order Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-obsidian p-4 rounded-xl border border-gray-800">
                <div>
                  <span className="text-gray-500 block">اسم المستلم:</span>
                  <span className="font-bold text-white">{order.customerName}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">رقم التواصل:</span>
                  <span className="font-bold text-white">{order.customerPhone}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">عنوان الشحن:</span>
                  <span className="font-bold text-white">{order.city} - {order.address}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">طريقة الدفع ومبلغ الطلب:</span>
                  <span className="font-bold text-gold-300">{order.totalAmount} ر.س ({order.paymentMethod})</span>
                </div>
              </div>

              {/* View Invoice Link */}
              <div className="flex justify-end pt-1">
                <a
                  href={`/invoice/${order.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-gold-400 hover:underline flex items-center gap-1 bg-gold-500/10 border border-gold-500/30 px-4 py-2 rounded-xl"
                >
                  <span>📄 عرض وتحميل الفاتورة الرقمية (PDF)</span>
                </a>
              </div>

              {/* Items */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-gray-300 block">العطور المطلوبة:</span>
                <div className="space-y-2">
                  {order.items.map((it) => (
                    <div key={it.id} className="flex justify-between items-center bg-obsidian p-3 rounded-lg text-xs">
                      <span className="font-bold text-white">{it.product.name} ({it.product.size})</span>
                      <span className="text-gray-400">الكمية: {it.quantity} • {it.price} ر.س</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="text-center py-12 bg-charcoal rounded-2xl border border-gray-800 space-y-2">
              <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
              <h3 className="text-base font-bold text-white">لم نجد طلب بهذا الرقم</h3>
              <p className="text-xs text-gray-400">يرجى التأكد من كتابة الرقم بالشكل الصحيح أو التواصل مع الدعم الفني.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-white">تتبع حالة شحنتك العطرية</h1>
        <p className="text-xs text-gray-400">أدخل رقم الطلب الخاص بك (مثال: ROMA-9842) أو رقم الجوال</p>
      </div>

      <Suspense fallback={<div className="text-center py-12 text-xs text-gold-400">جاري تحميل حقل التتبع...</div>}>
        <TrackOrderForm />
      </Suspense>
    </div>
  );
}
