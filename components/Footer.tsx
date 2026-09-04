import Link from 'next/link';
import { ShieldCheck, Truck, RotateCcw, Award, PhoneCall, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-obsidian border-t border-gold-500/20 text-gray-400 text-sm">
      {/* Guarantees Bar */}
      <div className="border-b border-gold-500/10 bg-emeraldLuxury-950/60 py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-gold-950/80 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="text-white font-bold text-base">عطور أصيلة 100%</h4>
            <p className="text-xs text-gray-400">مكونات نادرة وفريدة معتقة بأعلى المعايير العالمية</p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-gold-950/80 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h4 className="text-white font-bold text-base">عينة تجريبية مجانية</h4>
            <p className="text-xs text-gray-400">جرب العينة المرفقة أولاً، واسترجع الزجاجة مغلقة إن لم تناسبك</p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-gold-950/80 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="text-white font-bold text-base">شحن سريع آمن</h4>
            <p className="text-xs text-gray-400">توصيل لجميع المدن خلال 24 - 48 ساعة فقط</p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-gold-950/80 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-white font-bold text-base">دفع عند الاستلام</h4>
            <p className="text-xs text-gray-400">خيارات دفع مرنة وآمنة عند باب منزلكم</p>
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Description */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-gold-400/40 bg-gold-950 flex items-center justify-center text-gold-400 font-bold">
              R
            </div>
            <span className="text-xl font-bold text-white">روما للعطور الفاخرة</span>
          </div>
          <p className="text-xs leading-relaxed text-gray-400">
            دار روما للعطور الفاخرة صُممت لتقديم تجربة عطرية استثنائية تحاكي مشاعر الفخامة والرقي، بمزيج من النوتات الشرقية النادرة واللمسات الأوربية الساحرة.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold text-base border-r-2 border-gold-400 pr-2">روابط سريعة</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/" className="hover:text-gold-300 transition-colors">الرئيسية</Link></li>
            <li><Link href="/perfumes" className="hover:text-gold-300 transition-colors">تشكيلة العطور الملكية</Link></li>
            <li><Link href="/quiz" className="hover:text-gold-300 transition-colors">حاسبة واختبار العطر المناسب</Link></li>
            <li><Link href="/track-order" className="hover:text-gold-300 transition-colors">متابعة حالة الشحنة</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold text-base border-r-2 border-gold-400 pr-2">خدمة العملاء</h4>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center gap-2">
              <PhoneCall className="w-3.5 h-3.5 text-gold-400" />
              <span>+966 50 123 4567</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-gold-400" />
              <span>support@roma-perfumes.com</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-gold-400" />
              <span>الرياض - المملكة العربية السعودية</span>
            </li>
          </ul>
        </div>

        {/* Payment Methods & Admin Access */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold text-base border-r-2 border-gold-400 pr-2">طرق الدفع المتاحة</h4>
          <p className="text-xs text-gray-400">
            نوفر لكم خيارات الدفع عند الاستلام (COD)، بطاقات مدى، الفيزا، والتقسيط عبر تابي/تمارا.
          </p>
          <div className="pt-2 flex flex-wrap gap-2 text-[10px] text-gray-300">
            <span className="bg-charcoal px-2.5 py-1 rounded border border-gray-800">الدفع عند الاستلام</span>
            <span className="bg-charcoal px-2.5 py-1 rounded border border-gray-800">مدى Mada</span>
            <span className="bg-charcoal px-2.5 py-1 rounded border border-gray-800">Visa / Mastercard</span>
            <span className="bg-charcoal px-2.5 py-1 rounded border border-gray-800">Tabby</span>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-900 bg-obsidian/90 py-4 text-center text-xs text-gray-400">
        <p>© {new Date().getFullYear()} روما للعطور الفاخرة (Roma Luxury Perfumes). جميع الحقوق محفوظة.</p>
      </div>
    </footer>
  );
}
