'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Sparkles, Star, Eye, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { generateSingleProductWhatsAppUrl } from '@/lib/whatsapp';

export interface ProductType {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number | null;
  stock: number;
  size: string;
  concentration: string;
  gender: string;
  category: string;
  topNotes: string;
  heartNotes: string;
  baseNotes: string;
  longevity: number;
  sillage: number;
  images: string;
  isFeatured?: boolean;
}

export default function ProductCard({ product }: { product: ProductType }) {
  const { addItem } = useCart();
  const imageList = product.images.split(',').map((img) => img.trim());
  const mainImage = imageList[0] || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop';
  const currentPrice = product.discountPrice ?? product.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: currentPrice,
      image: mainImage,
      size: product.size,
    });
  };

  const whatsappUrl = generateSingleProductWhatsAppUrl(
    product.name,
    product.size,
    currentPrice
  );

  return (
    <div className="group relative bg-charcoal rounded-2xl border border-gold-500/20 hover:border-gold-400/60 overflow-hidden transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(217,140,25,0.15)] flex flex-col justify-between active:scale-[0.98]">
      
      {/* Top Image Container */}
      <div className="relative aspect-square w-full bg-obsidian overflow-hidden">
        <Image
          src={mainImage}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1 z-10">
          {product.discountPrice && (
            <span className="bg-gradient-to-r from-red-600 to-amber-600 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full shadow-md">
              وفر {Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-gold-500/90 text-obsidian font-bold text-[10px] px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>ميزة خاصة</span>
            </span>
          )}
        </div>

        <div className="absolute bottom-3 left-3 bg-obsidian/80 backdrop-blur-md text-gold-300 text-[10px] px-2.5 py-1 rounded-full border border-gold-500/30 font-bold">
          {product.concentration}
        </div>

        {/* Hover Quick View Overlay */}
        <Link
          href={`/perfumes/${product.slug}`}
          className="absolute inset-0 bg-obsidian/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-xs font-bold text-white z-20 backdrop-blur-[2px]"
        >
          <div className="bg-gold-500 text-obsidian px-4 py-2 rounded-full flex items-center gap-1.5 shadow-xl hover:scale-105 transition-transform">
            <Eye className="w-4 h-4" />
            <span>عرض العطر والهرم العطري</span>
          </div>
        </Link>
      </div>

      {/* Product Details */}
      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-gray-400">
            <span>{product.category} • {product.gender}</span>
            <div className="flex items-center text-amber-400 gap-1 font-bold">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>{product.longevity}.0</span>
            </div>
          </div>

          <Link href={`/perfumes/${product.slug}`} className="block">
            <h3 className="text-base font-bold text-white group-hover:text-gold-300 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-gray-400 line-clamp-1">
            ✨ النوتات: {product.topNotes}
          </p>
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-3 border-t border-gray-800 space-y-2">
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              {product.discountPrice ? (
                <>
                  <span className="text-xs text-gray-500 line-through">
                    {product.price} ر.س
                  </span>
                  <span className="text-base font-black text-gold-300">
                    {product.discountPrice} ر.س
                  </span>
                </>
              ) : (
                <span className="text-base font-black text-gold-300">
                  {product.price} ر.س
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-gold-500/20 hover:bg-gold-500 text-gold-300 hover:text-obsidian border border-gold-500/40 px-3 py-2 rounded-xl font-bold transition-all duration-300 flex items-center gap-1.5 text-xs shadow-md"
              title="إضافة للسلة التجميعية"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>السلة</span>
            </button>
          </div>

          {/* Direct WhatsApp Purchase Button under every product card */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:brightness-110 text-white font-extrabold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <MessageCircle className="w-4 h-4 text-emerald-200 fill-emerald-200" />
            <span>اطلب هذا العطر عبر واتساب فوراً</span>
          </a>

        </div>
      </div>
    </div>
  );
}
