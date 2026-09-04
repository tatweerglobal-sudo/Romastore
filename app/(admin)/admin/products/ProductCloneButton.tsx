'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Copy } from 'lucide-react';

export default function ProductCloneButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClone = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/products/clone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });

      if (res.ok) {
        router.refresh();
      } else {
        alert('حدث خطأ أثناء نسخ العطر');
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
      onClick={handleClone}
      disabled={loading}
      className="p-1.5 rounded-lg bg-gold-500/10 border border-gold-500/30 text-gold-300 hover:bg-gold-500 hover:text-obsidian transition-colors text-xs font-bold flex items-center gap-1"
      title="استنساخ ونسخ العطر بنقرة واحدة"
    >
      <Copy className="w-3.5 h-3.5" />
      <span>{loading ? '...' : 'نسخ'}</span>
    </button>
  );
}
