'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OrderStatusChanger({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleStatusChange = async (newStatus: string) => {
    let trackingNumber = '';
    let shippingCarrier = '';

    if (newStatus === 'SHIPPED') {
      const tracking = prompt('أدخل رقم تتبع الشحنة (أو اترك فارغاً للرقم التلقائي):', 'RM-TRACK-889');
      const carrier = prompt('أدخل اسم شركة الشحن (مثلاً: أرامكس، سمسا، DHL):', 'روما للخدمات اللوجستية');
      trackingNumber = tracking || 'RM-TRACK-889';
      shippingCarrier = carrier || 'روما للخدمات اللوجستية';
    }

    setStatus(newStatus);
    setLoading(true);

    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          trackingNumber,
          shippingCarrier,
        }),
      });

      if (res.ok) {
        router.refresh();
      } else {
        alert('حدث خطأ أثناء تعديل حالة الطلب');
      }
    } catch (e) {
      console.error(e);
      alert('خطأ في الاتصال');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-gray-400 font-bold">تغيير الحالة:</span>
      <select
        value={status}
        disabled={loading}
        onChange={(e) => handleStatusChange(e.target.value)}
        className="bg-obsidian border border-gold-500/40 rounded-xl px-3 py-1.5 text-gold-300 font-bold focus:outline-none"
      >
        <option value="PENDING">⏳ قيد المعالجة (PENDING)</option>
        <option value="PROCESSING">🎁 جاري التغليف (PROCESSING)</option>
        <option value="SHIPPED">🚚 تم الشحن (SHIPPED)</option>
        <option value="DELIVERED">✅ تم التوصيل (DELIVERED)</option>
        <option value="CANCELLED">❌ ملغى (CANCELLED)</option>
      </select>
    </div>
  );
}
