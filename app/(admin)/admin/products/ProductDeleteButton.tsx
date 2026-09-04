'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

export default function ProductDeleteButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('هل أنت تأكد من رغبتك في حذف هذا العطر بشكل نهائي؟')) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        router.refresh();
      } else {
        alert('حدث خطأ أثناء الحذف');
      }
    } catch (e) {
      console.error(e);
      alert('خطأ في الاتصال بالسيرفر');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-2 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/60 hover:text-white transition-colors"
      title="حذف العطر"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
