'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Plus, Folder, Sparkles, Trash2 } from 'lucide-react';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([
    { id: '1', name: 'عطور نيش', slug: 'niche', count: 12, description: 'عطور معتقة نادرة بتوقيع فرنسي شرقي' },
    { id: '2', name: 'عطور شرقية', slug: 'oriental', count: 8, description: 'زيوت عود وعنبر ومسك ملكي خالص' },
    { id: '3', name: 'مجموعات فاخرة', slug: 'collections', count: 5, description: 'صناديق الهدايا والتوزيعات الفخمة' },
    { id: '4', name: 'الخزنة السرية', slug: 'vault', count: 3, description: 'إصدارات محدودة للغاية لكبار الشخصيات' },
  ]);

  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;
    const newCat = {
      id: Date.now().toString(),
      name: newCatName,
      slug: newCatName.toLowerCase().replace(/\s+/g, '-'),
      count: 0,
      description: newCatDesc || 'تصنيف جديد',
    };
    setCategories([...categories, newCat]);
    setNewCatName('');
    setNewCatDesc('');
    alert('تمت إضافة التصنيف بنجاح ✨');
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت تأكد من حذف هذا التصنيف؟')) {
      setCategories(categories.filter((c) => c.id !== id));
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
          <h1 className="text-3xl font-black text-white">إدارة تصنيفات وتشكيلات المتجر</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Add Form */}
        <form onSubmit={handleAddCategory} className="lg:col-span-5 bg-charcoal p-6 rounded-2xl border border-gold-500/20 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-gold-300 border-b border-gray-800 pb-2">
            إضافة تصنيف عطري جديد
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-gray-300 font-bold mb-1">اسم التصنيف *</label>
              <input
                type="text"
                required
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="مثال: عطور الصيف الباردة"
                className="w-full bg-obsidian border border-gray-800 rounded-xl p-3 text-white focus:border-gold-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-1">وصف التصنيف</label>
              <textarea
                rows={2}
                value={newCatDesc}
                onChange={(e) => setNewCatDesc(e.target.value)}
                placeholder="اكتب وصفاً موجزاً للتشكيلة..."
                className="w-full bg-obsidian border border-gray-800 rounded-xl p-3 text-white focus:border-gold-400 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gold-500 hover:bg-gold-400 text-obsidian font-extrabold py-3 rounded-xl text-xs shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>حفظ التصنيف الجديد</span>
          </button>
        </form>

        {/* Categories Table */}
        <div className="lg:col-span-7 bg-charcoal rounded-2xl border border-gold-500/20 p-6 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white border-b border-gray-800 pb-2">
            التصنيفات الحالية ({categories.length})
          </h3>

          <div className="space-y-3">
            {categories.map((cat) => (
              <div key={cat.id} className="p-4 rounded-xl bg-obsidian border border-gray-800 flex justify-between items-center text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Folder className="w-4 h-4 text-gold-400" />
                    <span className="font-bold text-white text-sm">{cat.name}</span>
                    <span className="bg-gold-500/20 text-gold-300 px-2 py-0.5 rounded text-[10px]">
                      {cat.count} عطور
                    </span>
                  </div>
                  <p className="text-gray-400 text-[11px] pr-6">{cat.description}</p>
                </div>

                <button
                  onClick={() => handleDelete(cat.id)}
                  className="p-2 text-red-400 hover:bg-red-950 rounded-lg"
                  title="حذف"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
