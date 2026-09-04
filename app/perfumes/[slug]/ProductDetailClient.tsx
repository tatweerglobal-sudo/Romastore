'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Gift, Plus, Minus, Check, MessageCircle } from 'lucide-react';
import { ProductType } from '@/components/ProductCard';
import { generateSingleProductWhatsAppUrl } from '@/lib/whatsapp';

export default function ProductDetailClient({ product }: { product: ProductType }) {
  const { addItem, setGiftMessage } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.size);
  const [localGiftMessage, setLocalGiftMessage] = useState('');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const mainImage = product.images.split(',')[0] || '';
  const currentPrice = product.discountPrice ?? product.price;

  const handleAddToCart = () => {
    if (localGiftMessage.trim()) {
      setGiftMessage(localGiftMessage);
    }
    addItem(
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: currentPrice,
        image: mainImage,
        size: selectedSize,
      },
      quantity
    );
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  const whatsappDirectUrl = generateSingleProductWhatsAppUrl(
    product.name,
    selectedSize,
    currentPrice,
    quantity
  );

  return (
    <div className="p-6 rounded-2xl bg-charcoal border border-gold-500/20 space-y-6">
      
      {/* Price Display */}
      <div className="flex items-baseline justify-between border-b border-gray-800 pb-4">
        <div>
          <span className="text-xs text-gray-400 block">السعر الحالي:</span>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-black text-gold-300">{currentPrice} ر.س</span>
            {product.discountPrice && (
              <span className="text-sm text-gray-500 line-through">{product.price} ر.س</span>
            )}
          </div>
        </div>

        <div className="text-left">
          <span className="text-xs text-emerald-400 font-bold block">متوفر في المخزون ✨</span>
          <span className="text-[11px] text-gray-400">شحن مجاني وسريع</span>
        </div>
      </div>

      {/* Size Selector */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-300 block">اختر الحجم (Size):</label>
        <div className="flex gap-3">
          {[product.size, '50ml'].filter((v, i, a) => a.indexOf(v) === i).map((sz) => (
            <button
              key={sz}
              onClick={() => setSelectedSize(sz)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                selectedSize === sz
                  ? 'bg-gold-500 text-obsidian border-gold-400 shadow-md scale-105'
                  : 'bg-obsidian text-gray-300 border-gray-800 hover:border-gold-500/40'
              }`}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity & Gift Note */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-4">
          <label className="text-xs font-bold text-gray-300">الكمية:</label>
          <div className="flex items-center gap-3 bg-obsidian border border-gray-800 rounded-xl px-3 py-1.5">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 hover:text-gold-400 text-gray-300"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-sm font-extrabold text-white w-6 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 hover:text-gold-400 text-gray-300"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Optional Gift Note */}
        <div className="space-y-1.5 pt-2">
          <label className="text-xs font-bold text-gold-300 flex items-center gap-1.5">
            <Gift className="w-4 h-4 text-gold-400" />
            <span>رسالة إهداء مخصصة للطلب (اختياري):</span>
          </label>
          <input
            type="text"
            value={localGiftMessage}
            onChange={(e) => setLocalGiftMessage(e.target.value)}
            placeholder="مثال: إلى أغلى إنسان، كل عام وأنت بخير ❤️"
            className="w-full bg-obsidian border border-gold-500/30 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-gold-400"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        
        {/* Direct WhatsApp Order */}
        <a
          href={whatsappDirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white font-black py-4 rounded-xl shadow-xl hover:brightness-110 transition-all text-sm flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          <span>اطلب هذا العطر عبر واتساب فوراً • ({currentPrice * quantity} ر.س)</span>
        </a>

        {/* Add to Cart Drawer */}
        <button
          onClick={handleAddToCart}
          className={`w-full py-3.5 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 border transition-all ${
            addedSuccess
              ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
              : 'bg-obsidian border-gold-500/40 text-gold-300 hover:bg-gold-950/60'
          }`}
        >
          {addedSuccess ? (
            <>
              <Check className="w-4 h-4" />
              <span>تمت الإضافة لحقيبة المشتريات!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>إضافة للسلة التجميعية (لطلب أكثر من عطر)</span>
            </>
          )}
        </button>

      </div>
    </div>
  );
}
