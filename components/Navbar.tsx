'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingBag, Sparkles, LayoutDashboard, Menu, X, Brain, Wine, Lock, Crown, Gift, Coins } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import CurrencySwitcher from '@/components/CurrencySwitcher';

export default function Navbar() {
  const { totalItems, setIsOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-emeraldLuxury-950/90 backdrop-blur-md border-b border-gold-500/20 text-white">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-gold-900 via-gold-600 to-gold-900 text-gold-100 text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-200" />
        <span>شحن مجاني وسريع على كافة الطلبات • عينة تجريبية مجانية مع كل عطر • الدفع عند الاستلام COD</span>
        <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-200" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-full border border-gold-400/40 bg-gold-950/50 flex items-center justify-center text-gold-400 font-bold text-xl group-hover:border-gold-400 group-hover:scale-105 transition-all shadow-[0_0_15px_rgba(217,140,25,0.2)]">
                R
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white group-hover:text-gold-300 transition-colors">
                  روما <span className="text-gold-400 font-light">للعطور</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase text-gold-400/80 -mt-1">
                  Roma Luxury Perfumes
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-gray-200">
            <Link href="/" className="hover:text-gold-400 transition-colors py-1">
              الرئيسية
            </Link>
            <Link href="/perfumes" className="hover:text-gold-400 transition-colors py-1">
              العطور الملكية
            </Link>
            <Link href="/neuro" className="hover:text-gold-400 transition-colors py-1 flex items-center gap-1">
              <Brain className="w-3.5 h-3.5 text-gold-400" />
              <span>المزاج العصبي</span>
            </Link>
            <Link href="/quiz" className="flex items-center gap-1 text-gold-300 hover:text-gold-200 bg-gold-500/10 px-2.5 py-1 rounded-full border border-gold-500/30">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>حاسبة العطور</span>
            </Link>
            <Link href="/cellar" className="hover:text-gold-400 transition-colors py-1">
              خزانتك الرقمية
            </Link>
            <Link href="/vault" className="text-amber-300 hover:text-gold-200 transition-colors py-1 flex items-center gap-1 font-bold">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>الخزنة السرية</span>
            </Link>
            <Link href="/loyalty" className="hover:text-gold-400 transition-colors py-1">
              نادي الولاء
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Currency Switcher */}
            <div className="hidden sm:block">
              <CurrencySwitcher />
            </div>

            {/* Admin Link */}
            <Link
              href="/admin"
              className="hidden sm:flex items-center gap-1 text-xs text-emerald-300 bg-emerald-900/60 hover:bg-emerald-800/80 px-2.5 py-1.5 rounded-lg border border-emerald-500/30 transition-all"
              title="لوحة تحكم المسؤول"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>لوحة التحكم</span>
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2.5 rounded-full bg-charcoal/80 border border-gold-500/30 text-gold-300 hover:text-white hover:border-gold-400 transition-all flex items-center justify-center group"
              aria-label="سلة المشتريات"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-500 text-obsidian text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-md">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-obsidian/95 border-b border-gold-500/20 px-4 pt-2 pb-6 space-y-3 text-xs">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-gray-200 hover:text-gold-400 font-medium border-b border-gray-800"
          >
            الرئيسية
          </Link>
          <Link
            href="/perfumes"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-gray-200 hover:text-gold-400 font-medium border-b border-gray-800"
          >
            تصفح كافة العطور الملكية
          </Link>
          <Link
            href="/neuro"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-gold-300 font-bold border-b border-gray-800"
          >
            🧠 عطورك حسب المزاج والحالة النفسية
          </Link>
          <Link
            href="/quiz"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-gold-300 font-bold border-b border-gray-800"
          >
            ✨ حاسبة ومساعد اختيار العطر
          </Link>
          <Link
            href="/cellar"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-gray-200 hover:text-gold-400 font-medium border-b border-gray-800"
          >
            🍷 خزانة عطورك الرقمية والتعتيق
          </Link>
          <Link
            href="/vault"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-amber-300 font-bold border-b border-gray-800"
          >
            🔐 الخزنة السرية لكبار الشخصيات (ROYAL777)
          </Link>
          <Link
            href="/mystery-box"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-gold-400 font-bold border-b border-gray-800"
          >
            🎁 صندوق الغموض والمفاجآت الملكي
          </Link>
          <Link
            href="/bespoke"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-gold-400 font-bold border-b border-gray-800"
          >
            👑 حجز جلسة ابتكار عطر خاص 1-of-1
          </Link>
          <Link
            href="/loyalty"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-gray-200 hover:text-gold-400 font-medium border-b border-gray-800"
          >
            🏆 نادي روما الملكي للولاء والنقاط
          </Link>
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-emerald-400 font-bold"
          >
            🛡️ لوحة التحكم (Admin Dashboard)
          </Link>
        </div>
      )}
    </header>
  );
}
