'use client';

import { useState } from 'react';
import { Crown, Calendar, User, Phone, CheckCircle2, MessageCircle } from 'lucide-react';
import { generateSingleProductWhatsAppUrl } from '@/lib/whatsapp';

export default function BespokeBookingPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredNotes, setPreferredNotes] = useState('عود، عنبر، ياسمين، مسك');
  const [submitted, setSubmitted] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('برجاء ملء الاسم ورقم الجوال لطلب الاستشارة الحصرية');
      return;
    }

    const whatsappUrl = generateSingleProductWhatsAppUrl(
      `جلسة ابتكار عطر خاص 1-of-1 (العميل: ${name}) - النغمات المفضلة: ${preferredNotes}`,
      'فريدة لا تتكرر',
      1200
    );

    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-gold-950/80 border border-gold-500/30 text-gold-300 text-xs px-4 py-1.5 rounded-full">
          <Crown className="w-4 h-4 text-gold-400" />
          <span>خدمة كبار الشخصيات الحصرية (Bespoke 1-of-1 Perfumery)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">جلسة ابتكار عطر خاص مسجل باسمك</h1>
        <p className="text-xs sm:text-sm text-gray-400">
          احجز جلسة افتراضية خاصة مع خبير عطور روما لتركيب صيغة عطرية استثنائية فريدة 1-of-1 مسجلة باسمك حصرياً.
        </p>
      </div>

      <form onSubmit={handleBooking} className="bg-charcoal p-8 rounded-3xl border border-gold-500/30 space-y-6 shadow-2xl">
        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-gray-300 font-bold mb-1">الاسم الكامل *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: سُمو الشيخ عبدالملك المنصور"
              className="w-full bg-obsidian border border-gray-800 rounded-xl p-3.5 text-white focus:border-gold-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-bold mb-1">رقم الجوال لتحديد الموعد عبر الواتساب *</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="050xxxxxxx"
              className="w-full bg-obsidian border border-gray-800 rounded-xl p-3.5 text-white focus:border-gold-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-bold mb-1">النغمات والمكونات المفضل تضمينها بالتركيبة</label>
            <textarea
              rows={3}
              value={preferredNotes}
              onChange={(e) => setPreferredNotes(e.target.value)}
              placeholder="اكتب هنا المكونات أو الطابع الذي تود حفر بصمتك به..."
              className="w-full bg-obsidian border border-gray-800 rounded-xl p-3.5 text-white focus:border-gold-400 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-gold-500 via-amber-400 to-gold-600 text-obsidian font-black py-4 rounded-xl shadow-xl hover:brightness-110 text-xs flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-5 h-5 fill-obsidian" />
          <span>إرسال طلب حجز الجلسة الخاصة بالواتساب</span>
        </button>
      </form>

    </div>
  );
}
