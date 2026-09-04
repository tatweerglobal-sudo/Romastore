'use client';

import { useState } from 'react';
import ProductCard, { ProductType } from '@/components/ProductCard';
import { Search, Filter, Sparkles } from 'lucide-react';

export default function PerfumeFilterClient({ initialProducts }: { initialProducts: ProductType[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [selectedGender, setSelectedGender] = useState<string>('الكل');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['الكل', 'عطور نيش', 'عطور شرقية', 'مجموعات فاخرة'];
  const genders = ['الكل', 'رجالي', 'نسائي', 'للجنسين'];

  const filteredProducts = initialProducts.filter((product) => {
    const matchesCategory = selectedCategory === 'الكل' || product.category === selectedCategory;
    const matchesGender = selectedGender === 'الكل' || product.gender === selectedGender;
    const matchesSearch =
      searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.topNotes.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.heartNotes.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.baseNotes.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesGender && matchesSearch;
  });

  return (
    <div className="space-y-8">
      
      {/* Controls Bar */}
      <div className="bg-charcoal/90 p-5 rounded-2xl border border-gold-500/20 shadow-xl space-y-4 md:space-y-0 md:flex md:items-center md:justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث باسم العطر أو النوتات (عود، برغموت، عنبر...)"
            className="w-full bg-obsidian border border-gold-500/30 rounded-xl pr-10 pl-4 py-2.5 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-gold-400"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-gray-400 font-bold flex items-center gap-1 pl-2">
            <Filter className="w-3.5 h-3.5 text-gold-400" />
            <span>التصنيف:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-gold-500 text-obsidian font-bold shadow-md'
                  : 'bg-obsidian border border-gray-800 text-gray-300 hover:border-gold-500/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gender Filters */}
        <div className="flex items-center gap-2 text-xs border-r border-gray-800 pr-4">
          {genders.map((gen) => (
            <button
              key={gen}
              onClick={() => setSelectedGender(gen)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedGender === gen
                  ? 'bg-emerald-600 text-white font-bold shadow-md'
                  : 'bg-obsidian border border-gray-800 text-gray-300 hover:border-emerald-500/40'
              }`}
            >
              {gen}
            </button>
          ))}
        </div>

      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-charcoal/50 rounded-2xl border border-gray-800 space-y-3">
          <Sparkles className="w-10 h-10 text-gold-500 mx-auto opacity-50" />
          <h3 className="text-lg font-bold text-white">لم يتم العثور على عطور تطابق بحثك</h3>
          <p className="text-xs text-gray-400">جرب البحث بكلمات أخرى أو اختر تصنيفاً مختلفاً</p>
          <button
            onClick={() => {
              setSelectedCategory('الكل');
              setSelectedGender('الكل');
              setSearchQuery('');
            }}
            className="bg-gold-500 text-obsidian text-xs font-bold px-4 py-2 rounded-lg hover:bg-gold-400"
          >
            إعادة ضبط الفلاتر
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
}
