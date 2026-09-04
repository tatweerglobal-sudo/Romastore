'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play, ShoppingBag, Sparkles, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function UnboxingReels() {
  const { addItem } = useCart();

  const reels = [
    {
      id: '1',
      title: 'فتح صندوق عود الملكية الإمبراطوري 🔥',
      username: '@sarah_perfumes',
      likes: '12.4K',
      image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop',
      productName: 'روما نيش - عود الملكية',
      slug: 'roma-royal-oud',
      price: 520,
    },
    {
      id: '2',
      title: 'تجربة إكسير المخمل الذهبي ورسالة الإهداء 🎁',
      username: '@faisal_vip',
      likes: '8.9K',
      image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop',
      productName: 'إكسير المخمل الذهبي',
      slug: 'velvet-amber-elixir',
      price: 450,
    },
    {
      id: '3',
      title: 'أنوثة مفرطة مع عطر زهر الإمبراطورة ✨',
      username: '@nora_beauty',
      likes: '15.2K',
      image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=800&auto=format&fit=crop',
      productName: 'سولاريس الأخضر - زهر الإمبراطورة',
      slug: 'empress-rose-solaris',
      price: 490,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div>
          <div className="flex items-center gap-1.5 text-gold-400 text-xs font-bold mb-1">
            <Sparkles className="w-4 h-4" />
            <span>تجارب وتجربة العملاء (Unboxing Reels)</span>
          </div>
          <h2 className="text-2xl font-black text-white">فيديوهات فتح الصندوق الملكي</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {reels.map((reel) => (
          <div
            key={reel.id}
            className="group relative aspect-[9/14] rounded-2xl overflow-hidden border border-gold-500/30 shadow-2xl bg-charcoal flex flex-col justify-between p-4"
          >
            <Image
              src={reel.image}
              alt={reel.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
            />

            {/* Top Bar */}
            <div className="relative z-10 flex justify-between items-center text-xs">
              <span className="bg-obsidian/80 backdrop-blur-md px-2.5 py-1 rounded-full text-gold-300 font-bold border border-gold-500/30">
                {reel.username}
              </span>
              <span className="flex items-center gap-1 bg-obsidian/80 backdrop-blur-md px-2 py-1 rounded-full text-red-400 text-[10px] font-bold">
                <Heart className="w-3 h-3 fill-red-400" />
                <span>{reel.likes}</span>
              </span>
            </div>

            {/* Center Play Icon */}
            <div className="relative z-10 w-12 h-12 rounded-full bg-gold-500/90 text-obsidian flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 fill-obsidian ml-0.5" />
            </div>

            {/* Bottom Content & Purchase Button */}
            <div className="relative z-10 space-y-2 bg-obsidian/90 backdrop-blur-md p-3 rounded-xl border border-gold-500/20">
              <h4 className="text-xs font-bold text-white line-clamp-1">{reel.title}</h4>
              
              <div className="flex items-center justify-between pt-1 border-t border-gray-800">
                <span className="text-xs font-extrabold text-gold-300">{reel.price} ر.س</span>
                <button
                  onClick={() =>
                    addItem({
                      id: reel.slug,
                      name: reel.productName,
                      slug: reel.slug,
                      price: reel.price,
                      image: reel.image,
                      size: '100ml',
                    })
                  }
                  className="bg-gold-500 text-obsidian text-[11px] font-extrabold px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-gold-400"
                >
                  <ShoppingBag className="w-3 h-3" />
                  <span>اشترِ العطر</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
