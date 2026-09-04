'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShieldCheck, Truck, Gift, CheckCircle2, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  const { items, subtotal, giftMessage, setGiftMessage, clearCart } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [city, setCity] = useState('الرياض');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [includeSample, setIncludeSample] = useState(true);

  const [availableGateways, setAvailableGateways] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCreated, setOrderCreated] = useState<{ id: string; orderNumber: string } | null>(null);

  // Load active gateways dynamically
  useState(() => {
    fetch('/api/admin/payments')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.gateways.length > 0) {
          const active = data.gateways.filter((g: any) => g.isEnabled);
          setAvailableGateways(active);
          const defaultGw = active.find((g: any) => g.isDefault);
          if (defaultGw) {
            setPaymentMethod(defaultGw.code);
          }
        }
      })
      .catch(() => {});
  });

  const firstImage = (imgStr: string) => imgStr.split(',')[0] || '';

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !customerPhone || !address) {
      alert('برجاء ملء كافة البيانات الأساسية (الاسم، رقم الهاتف، والعنوان)');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          customerPhone,
          address,
          city,
          paymentMethod,
          giftMessage: giftMessage || null,
          includeSample,
          totalAmount: subtotal,
          items: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setOrderCreated({ id: data.id, orderNumber: data.orderNumber });
        clearCart();
      } else {
        alert(data.error || 'حدث خطأ أثناء حفظ الطلب، برجاء المحاولة لاحقاً');
      }
    } catch (err) {
      console.error(err);
      alert('حدث خطأ في الاتصال بالشبكة');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderCreated) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-2xl animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs bg-gold-950 text-gold-300 px-3 py-1 rounded-full border border-gold-500/30">
            تم استلام الطلب بنجاح ✨
          </span>
          <h1 className="text-3xl font-black text-white">شكراً لثقتكم بدار روما للعطور</h1>
          <p className="text-xs text-gray-300">
            رقم طلبك الخاص هو: <span className="font-extrabold text-gold-400 text-base">{orderCreated.orderNumber}</span>
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-charcoal border border-gold-500/20 text-xs text-right space-y-3">
          <p className="text-gray-300 leading-relaxed">
            تم إصدار الفاتورة الرقمية وإرسال رسالة التأكيد عبر الواتساب. يصلك الطرد الفاخر برفقة العينة التجريبية المجانية.
          </p>
          <div className="border-t border-gray-800 pt-3 flex flex-wrap justify-between text-gray-400 gap-2">
            <span>وسيلة الدفع: <strong className="text-emerald-400">{paymentMethod}</strong></span>
            <Link href={`/invoice/${orderCreated.id}`} className="text-gold-400 font-bold hover:underline">
              📄 مشاهدة وتحميل الفاتورة PDF
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Link
            href={`/invoice/${orderCreated.id}`}
            className="flex-1 bg-gold-500 text-obsidian font-bold py-3 rounded-xl text-xs hover:bg-gold-400 transition-colors"
          >
            عرض وتنزيل الفاتورة الرسمية
          </Link>
          <Link
            href="/"
            className="flex-1 bg-charcoal border border-gray-800 text-gray-200 font-bold py-3 rounded-xl text-xs hover:text-white"
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
        <ShoppingBag className="w-16 h-16 text-gold-500 opacity-40 mx-auto" />
        <h2 className="text-xl font-bold text-white">حقيبة المشتريات فارغة</h2>
        <p className="text-xs text-gray-400">يرجى إضافة عطور لحقيبتك أولاً لمتابعة إتمام الطلب</p>
        <Link
          href="/perfumes"
          className="inline-block bg-gold-500 text-obsidian font-bold text-xs px-6 py-3 rounded-xl"
        >
          تصفح العطور الأن
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-white">إتمام الطلب الشراء السريع</h1>
        <p className="text-xs text-gray-400">أدخل بياناتك وشحنك في خطوة واحدة دون الحاجة لتسجيل حساب</p>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Customer Information (Right Column in RTL) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Personal Info */}
          <div className="bg-charcoal p-6 rounded-2xl border border-gold-500/20 space-y-4">
            <h3 className="text-base font-bold text-gold-300 border-b border-gray-800 pb-2">
              1. بيانات العميل والشحن
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-bold mb-1">الاسم الكامل *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="مثال: عبدالملك العتيبي"
                  className="w-full bg-obsidian border border-gray-800 rounded-xl p-3 text-white focus:border-gold-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">رقم الجوال *</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="050xxxxxxx"
                    className="w-full bg-obsidian border border-gray-800 rounded-xl p-3 text-white focus:border-gold-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">المدينة *</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-obsidian border border-gray-800 rounded-xl p-3 text-white focus:border-gold-400 focus:outline-none"
                  >
                    <option value="الرياض">الرياض</option>
                    <option value="جدة">جدة</option>
                    <option value="الدمام">الدمام</option>
                    <option value="مكة المكرمة">مكة المكرمة</option>
                    <option value="المدينة المنورة">المدينة المنورة</option>
                    <option value="الخبر">الخبر</option>
                    <option value="القاهرة">القاهرة</option>
                    <option value="الإسكندرية">الإسكندرية</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">العنوان التفصيلي (الحي، الشارع، رقم المنزل) *</label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="حي النخيل، شارع التخصصي، عمائر النخلة..."
                  className="w-full bg-obsidian border border-gray-800 rounded-xl p-3 text-white focus:border-gold-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Payment Options Dynamic */}
          <div className="bg-charcoal p-6 rounded-2xl border border-gold-500/20 space-y-4">
            <h3 className="text-base font-bold text-gold-300 border-b border-gray-800 pb-2">
              2. اختيار طريقة الدفع المتاحة
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {(availableGateways.length > 0 ? availableGateways : [
                { code: 'COD', nameAr: 'الدفع عند الاستلام', icon: '💵' },
                { code: 'MADA', nameAr: 'بطاقة مدى (Mada)', icon: '💳' },
                { code: 'APPLE_PAY', nameAr: 'آبل باي (Apple Pay)', icon: '🍏' },
                { code: 'TABBY', nameAr: 'تقسيط تابي Tabby', icon: '🛍️' },
              ]).map((gw) => (
                <button
                  type="button"
                  key={gw.code}
                  onClick={() => setPaymentMethod(gw.code)}
                  className={`p-4 rounded-xl border text-right transition-all flex items-center gap-3 ${
                    paymentMethod === gw.code
                      ? 'bg-gold-950/60 border-gold-400 text-white shadow-md'
                      : 'bg-obsidian border-gray-800 text-gray-400 hover:border-gold-500/30'
                  }`}
                >
                  <span className="text-2xl">{gw.icon || '💳'}</span>
                  <div>
                    <span className="font-bold block text-white">{gw.nameAr}</span>
                    <span className="text-[10px] text-emerald-400 block font-medium">مُفعّل ومحمي 🔒</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Sample Inclusion */}
          <div className="p-4 rounded-2xl bg-emeraldLuxury-950/80 border border-emerald-500/30 flex items-center justify-between">
            <div className="space-y-1 text-xs">
              <span className="font-bold text-emerald-300 block">إرفاق عينة تجريبية مجانية (10ml)</span>
              <span className="text-[11px] text-gray-300 block">
                تسمح لك بتجربة الرائحة أولاً واسترجاع الزجاجة مغلقة مجاناً إن لم تناسبك.
              </span>
            </div>
            <input
              type="checkbox"
              checked={includeSample}
              onChange={(e) => setIncludeSample(e.target.checked)}
              className="w-5 h-5 accent-gold-500 rounded cursor-pointer"
            />
          </div>

        </div>

        {/* Order Summary (Left Column in RTL) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-charcoal p-6 rounded-2xl border border-gold-500/20 space-y-4 sticky top-24">
            <h3 className="text-base font-bold text-gold-300 border-b border-gray-800 pb-2">
              ملخص الشحنة ({items.length} عطور)
            </h3>

            {/* Items list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 text-xs border-b border-gray-800 pb-2">
                  <div className="w-12 h-12 relative rounded-lg overflow-hidden border border-gray-800 flex-shrink-0">
                    <Image src={firstImage(item.image)} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white line-clamp-1">{item.name}</h4>
                    <p className="text-gray-400">الكمية: {item.quantity} • الحجم: {item.size}</p>
                  </div>
                  <span className="font-bold text-gold-300">{item.price * item.quantity} ر.س</span>
                </div>
              ))}
            </div>

            {/* Gift Message preview */}
            {giftMessage && (
              <div className="p-3 bg-gold-950/40 border border-gold-500/20 rounded-xl text-xs space-y-1">
                <span className="font-bold text-gold-300 flex items-center gap-1">
                  <Gift className="w-3.5 h-3.5" />
                  بطاقة الإهداء المرفقة:
                </span>
                <p className="text-gray-300 italic">"{giftMessage}"</p>
              </div>
            )}

            {/* Price Calculations */}
            <div className="space-y-2 text-xs pt-2 border-t border-gray-800">
              <div className="flex justify-between text-gray-300">
                <span>المجموع:</span>
                <span>{subtotal} ر.س</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>رسوم الشحن والتأمين:</span>
                <span className="text-emerald-400 font-bold">مجاناً</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-gray-800">
                <span>المبلغ الإجمالي المطلـوب:</span>
                <span className="text-gold-300">{subtotal} ر.س</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-gold-500 via-amber-400 to-gold-600 text-obsidian font-black py-4 rounded-xl shadow-xl hover:brightness-110 transition-all text-sm flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>جاري إرسال الطلب...</span>
              ) : (
                <>
                  <span>تأكيد الطلب والشحن الفوري</span>
                  <ArrowLeft className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-[10px] text-center text-gray-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
              <span>ضمان حماية المشتري والدفع عند الاستلام متاح</span>
            </p>
          </div>
        </div>

      </form>
    </div>
  );
}
