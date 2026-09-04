'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Brain, ShoppingBag, Lock, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function BottomNav() {
  const pathname = usePathname();
  const { totalItems, setIsOpen } = useCart();

  const navItems = [
    { href: '/', label: 'الرئيسية', icon: Home },
    { href: '/perfumes', label: 'العطور', icon: Compass },
    { href: '/neuro', label: 'المزاج', icon: Brain, isSpecial: true },
    { href: '/vault', label: 'الخزنة', icon: Lock },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pb-3 pt-1 pointer-events-none">
      <div className="max-w-md mx-auto bg-charcoal/90 backdrop-blur-xl border border-gold-500/30 rounded-2xl p-2 shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center justify-around pointer-events-auto relative overflow-hidden">
        
        {/* Subtle Gold Shimmer Bar */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent"></div>

        {/* Dynamic Navigation Items */}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all duration-200 active:scale-90 ${
                isActive
                  ? 'text-gold-300 bg-gold-500/15 font-bold shadow-inner'
                  : 'text-gray-400 hover:text-gray-200 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-gold-400 scale-110' : ''} transition-transform`} />
                {item.isSpecial && (
                  <Sparkles className="w-2.5 h-2.5 text-gold-400 absolute -top-1 -right-1 animate-pulse" />
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
            </Link>
          );
        })}

        {/* Cart Drawer Trigger Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="flex flex-col items-center justify-center py-1.5 px-3 rounded-xl text-gold-300 hover:text-white transition-all duration-200 active:scale-90 relative"
          aria-label="حقيبة المشتريات"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-gold-400" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-gradient-to-r from-gold-500 to-amber-400 text-obsidian text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce shadow-md">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1 font-bold">الحقيبة</span>
        </button>

      </div>
    </div>
  );
}
