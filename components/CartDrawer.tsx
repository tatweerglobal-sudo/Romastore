'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ShoppingBag, Plus, Minus, Trash2, Gift, MessageCircle, ShieldCheck, User, Phone, MapPin } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { generateCartWhatsAppUrl } from '@/lib/whatsapp';
import CartProgressBar from '@/components/CartProgressBar';

export default function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    updateQuantity,
    removeItem,
    subtotal,
    totalItems,
    giftMessage,
    setGiftMessage,
  } = useCart();

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [city, setCity] = useState('الرياض');
  const [address, setAddress] = useState('');

  if (!isOpen) return null;

  const firstImage = (imgStr: string) => imgStr.split(',')[0] || '';

  const handleWhatsAppCheckout = () => {
    if (!customerName || !customerPhone || !address) {
      alert('برجاء ملء البيانات الأساسية (الاسم الكامل، الجوال، والعنوان)');
      return;
    }

    const whatsappUrl = generateCartWhatsAppUrl(
      items,
      {
        name: customerName,
        phone: customerPhone,
        city,
        address,
        giftNote: giftMessage || undefined,
      }
    );

    window.open(whatsappUrl, '_blank');
    setShowCheckoutModal(false);
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden text-white">
      {/* Backdrop */}
      <div
        onClick={() => {
          setIsOpen(false);
          setShowCheckoutModal(false);
        }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-x-0 bottom-0 sm:inset-y-0 sm:left-0 max-w-full flex pl-0 sm:pl-10 z-50">
        <div className="w-full sm:w-screen sm:max-w-md max-h-[90vh] sm:max-h-full rounded-t-3xl sm:rounded-none bg-obsidian border-t sm:border-t-0 sm:border-r border-gold-500/30 shadow-[0_-10px_40px_rgba(0,0,0,0.9)] flex flex-col transition-transform duration-300">
          
          {/* Mobile Bottom Sheet Drag Handle */}
          <div className="sm:hidden w-12 h-1.5 bg-gray-700 rounded-full mx-auto my-2.5 opacity-60"></div>

          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-gold-500/20 flex items-center justify-between bg-emeraldLuxury-950/80">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-gold-400" />
              <h2 className="text-base sm:text-lg font-bold text-white">حقيبة المشتريات التجميعية</h2>
              <span className="bg-gold-500/20 border border-gold-500/30 text-gold-300 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                {totalItems} عطور
              </span>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                setShowCheckoutModal(false);
              }}
              className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* VIP Reward Progress Bar */}
            {items.length > 0 && <CartProgressBar subtotal={subtotal} />}

            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-20 h-20 rounded-full bg-gold-950/50 border border-gold-500/30 flex items-center justify-center mx-auto text-gold-400">
                  <ShoppingBag className="w-10 h-10 opacity-60" />
                </div>
                <h3 className="text-base font-bold text-gray-200">حقيبة المشتريات فارغة</h3>
                <p className="text-xs text-gray-400 max-w-xs mx-auto">
                  استكشف تشكيلتنا النادرة من عطور النيش والزيوت الشرقية الملكية
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-600 to-gold-500 text-obsidian font-bold px-6 py-2.5 rounded-full shadow-lg hover:brightness-110 transition-all text-xs"
                >
                  <span>تصفح العطور الأن</span>
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-xl bg-charcoal border border-gray-800 hover:border-gold-500/30 transition-all relative"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden relative bg-gray-900 border border-gray-800 flex-shrink-0">
                    {firstImage(item.image) ? (
                      <Image
                        src={firstImage(item.image)}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gold-500 font-bold">R</div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-bold text-white line-clamp-1">{item.name}</h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-500 hover:text-red-400 p-1"
                          title="حذف من السلة"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[11px] text-gold-400 font-medium">الحجم: {item.size}</p>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm font-extrabold text-gold-300">
                        {item.price * item.quantity} ر.س
                      </span>

                      <div className="flex items-center gap-2 bg-obsidian border border-gray-800 rounded-lg px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-gold-400"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-gold-400"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Gift Message Option */}
            {items.length > 0 && (
              <div className="p-4 rounded-xl bg-gold-950/30 border border-gold-500/20 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-gold-300">
                  <Gift className="w-4 h-4 text-gold-400" />
                  <span>إضافة بطاقة إهداء مخصصة للطلب (مجاناً)</span>
                </div>
                <textarea
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  placeholder="اكتب هنا الرسالة التي تود طباعتها داخل صندوق الهدايا..."
                  rows={2}
                  className="w-full bg-obsidian border border-gold-500/30 rounded-lg p-2.5 text-xs text-gray-200 focus:outline-none focus:border-gold-400 placeholder:text-gray-600"
                />
              </div>
            )}
          </div>

          {/* Footer Checkout Controls */}
          {items.length > 0 && (
            <div className="p-5 border-t border-gold-500/20 bg-emeraldLuxury-950/95 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-300">
                  <span>المجموع الفرعي:</span>
                  <span className="font-bold text-white">{subtotal} ر.س</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>الشحن والعينات المجانية:</span>
                  <span className="font-bold text-emerald-400">مجاناً 🎁</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-gray-800">
                  <span>الإجمالي المطلـوب:</span>
                  <span className="text-gold-300 text-base">{subtotal} ر.س</span>
                </div>
              </div>

              {!showCheckoutModal ? (
                <div className="space-y-2">
                  <button
                    onClick={() => setShowCheckoutModal(true)}
                    className="w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white font-extrabold py-3.5 rounded-xl shadow-xl hover:brightness-110 transition-all text-sm flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5 fill-white" />
                    <span>إرسال الفاتورة والطلب عبر الواتساب</span>
                  </button>

                  <Link
                    href="/checkout"
                    onClick={() => setIsOpen(false)}
                    className="w-full bg-charcoal border border-gray-800 text-gray-300 font-bold py-2 rounded-xl text-xs text-center block hover:text-white"
                  >
                    أو استخدام نموذج الدفع بالمتجر
                  </Link>
                </div>
              ) : (
                /* Customer Details Form Modal inside Cart */
                <div className="bg-obsidian p-4 rounded-xl border border-gold-500/40 space-y-3 animate-fadeIn text-xs">
                  <div className="flex items-center justify-between text-gold-300 font-bold border-b border-gray-800 pb-2">
                    <span>بيانات الشحن لاستقبال الطلب بالواتساب:</span>
                    <button onClick={() => setShowCheckoutModal(false)} className="text-gray-400 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1">الاسم الكامل *</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="عبدالله المنصور"
                      className="w-full bg-charcoal border border-gray-800 rounded-lg p-2 text-white focus:border-gold-400 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-gray-400 mb-1">رقم الجوال *</label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="050xxxxxxx"
                        className="w-full bg-charcoal border border-gray-800 rounded-lg p-2 text-white focus:border-gold-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">المدينة *</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="الرياض"
                        className="w-full bg-charcoal border border-gray-800 rounded-lg p-2 text-white focus:border-gold-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1">العنوان التفصيلي *</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="حي العليا، طريق التخصصي..."
                      className="w-full bg-charcoal border border-gray-800 rounded-lg p-2 text-white focus:border-gold-400 focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={handleWhatsAppCheckout}
                    className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white font-extrabold py-3 rounded-xl shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>توليد الفاتورة وفتح الواتساب الآن 🚀</span>
                  </button>
                </div>
              )}

              <p className="text-[10px] text-center text-gray-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-gold-400" />
                <span>دفع آمن 100% وحماية كبار العملاء</span>
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
