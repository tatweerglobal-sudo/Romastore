import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { ShieldCheck, Printer, Share2, CheckCircle2, Download, Package, Calendar, MapPin, Phone, CreditCard, Sparkles } from 'lucide-react';

export const revalidate = 0;

export default async function InvoicePage({ params }: { params: { id: string } }) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  const invoiceDate = new Date(order.createdAt).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const qrVerificationUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
    `ROMA-INVOICE-${order.orderNumber}-${order.totalAmount}`
  )}`;

  return (
    <div className="min-h-screen bg-obsidian text-gray-200 py-10 px-4 sm:px-6 lg:px-8 selection:bg-gold-500 selection:text-obsidian">
      
      {/* Print Action Bar (Hidden on print) */}
      <div className="max-w-4xl mx-auto mb-6 flex flex-wrap justify-between items-center gap-4 print:hidden">
        <Link
          href="/"
          className="text-xs text-gold-400 hover:underline font-bold flex items-center gap-1"
        >
          ← العودة للمتجر الرئيسية
        </Link>

        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              `فاتورة شراء عطور روما الملكية - رقم الطلب #${order.orderNumber}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md"
          >
            <Share2 className="w-4 h-4" />
            <span>مشاركة عبر الواتساب</span>
          </a>

          <button
            onClick={() => {
              if (typeof window !== 'undefined') window.print();
            }}
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-obsidian font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-lg"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة الفاتورة / تنزيل PDF</span>
          </button>
        </div>
      </div>

      {/* Main Luxury Invoice Card */}
      <div className="max-w-4xl mx-auto bg-charcoal rounded-3xl border border-gold-500/30 p-8 sm:p-12 shadow-2xl space-y-8 relative overflow-hidden print:border-none print:shadow-none print:p-0 print:bg-white print:text-black">
        
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full filter blur-3xl pointer-events-none print:hidden"></div>

        {/* Invoice Top Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-gray-800 pb-8 print:border-gray-300">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-2 print:text-emerald-700">
              <ShieldCheck className="w-4 h-4" />
              <span>فاتورة شراء رقمية معتمدة (Roma Royal Certified Invoice)</span>
            </div>
            <h1 className="text-3xl font-black text-white print:text-black tracking-tight">
              روما للعطور الفاخرة
            </h1>
            <p className="text-xs text-gold-400 font-bold mt-1 print:text-gold-700">ROMA LUXURY PERFUMES</p>
          </div>

          <div className="text-left sm:text-right space-y-1">
            <span className="inline-block bg-gold-500/20 text-gold-300 border border-gold-500/30 px-3 py-1 rounded-full text-xs font-black print:border-gray-400 print:text-black">
              طلب مكوّد #{order.orderNumber}
            </span>
            <p className="text-xs text-gray-400 print:text-gray-600 flex items-center gap-1 justify-end">
              <Calendar className="w-3.5 h-3.5" />
              <span>تاريخ الإصدار: {invoiceDate}</span>
            </p>
          </div>
        </div>

        {/* Customer & Merchant Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-obsidian/60 p-6 rounded-2xl border border-gray-800/80 print:bg-gray-50 print:border-gray-300">
          <div className="space-y-2">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-wider block print:text-gold-800">بيانات المستلم:</span>
            <p className="text-base font-bold text-white print:text-black">{order.customerName}</p>
            <p className="text-xs text-gray-300 print:text-gray-700 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-gray-400" />
              <span>{order.customerPhone}</span>
            </p>
            <p className="text-xs text-gray-300 print:text-gray-700 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-gray-400" />
              <span>{order.address} - {order.city}</span>
            </p>
          </div>

          <div className="space-y-2 text-right sm:border-r sm:border-gray-800 sm:pr-6 print:border-gray-300">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-wider block print:text-gold-800">تفاصيل وسيلة الدفع:</span>
            <p className="text-sm font-bold text-white print:text-black flex items-center gap-1.5 justify-end">
              <CreditCard className="w-4 h-4 text-emerald-400" />
              <span>{order.paymentMethod === 'COD' ? 'الدفع عند الاستلام' : order.paymentMethod}</span>
            </p>
            <p className="text-xs text-emerald-400 font-bold print:text-emerald-700">حالة الدفع: مؤكد ومسجل ✅</p>
            {order.trackingNumber && (
              <p className="text-xs text-gold-300 font-bold print:text-black">
                رقم التتبع: {order.trackingNumber} ({order.shippingCarrier || 'الخدمات اللوجستية'})
              </p>
            )}
          </div>
        </div>

        {/* Items Table */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white print:text-black flex items-center gap-2">
            <Package className="w-4 h-4 text-gold-400" />
            <span>بيانات عطور الطلب والتغليف</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-right text-gray-300 print:text-black">
              <thead className="bg-obsidian text-gray-400 font-bold uppercase border-b border-gray-800 print:bg-gray-100 print:text-black print:border-gray-400">
                <tr>
                  <th className="p-3">العطر / المزيج</th>
                  <th className="p-3">الحجم والتركيز</th>
                  <th className="p-3 text-center">الكمية</th>
                  <th className="p-3 text-left">السعر الفردي</th>
                  <th className="p-3 text-left">الإجمالي</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 print:divide-gray-300">
                {order.items.map((item) => (
                  <tr key={item.id} className="hover:bg-obsidian/40 print:hover:bg-transparent">
                    <td className="p-3 font-bold text-white print:text-black">
                      {item.product.name}
                    </td>
                    <td className="p-3 text-gray-400 print:text-gray-700">
                      {item.product.size} • {item.product.concentration}
                    </td>
                    <td className="p-3 text-center font-bold">{item.quantity}</td>
                    <td className="p-3 text-left font-mono">{item.price} ر.س</td>
                    <td className="p-3 text-left font-black text-gold-300 print:text-black font-mono">
                      {item.price * item.quantity} ر.س
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Gift Note Banner if Exists */}
        {order.giftMessage && (
          <div className="p-4 bg-gold-500/10 border border-gold-500/30 rounded-2xl space-y-1 print:border-gray-400 print:bg-gray-50">
            <span className="text-xs font-bold text-gold-300 block print:text-gold-800">🎁 بطاقة الإهداء الخاصة:</span>
            <p className="text-xs italic text-gray-200 print:text-black">"{order.giftMessage}"</p>
          </div>
        )}

        {/* Summary Breakdown & Authenticity QR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end pt-4 border-t border-gray-800 print:border-gray-300">
          
          {/* QR Code Verification */}
          <div className="flex items-center gap-4 bg-obsidian p-4 rounded-2xl border border-gray-800 print:border-gray-300 print:bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrVerificationUrl} alt="QR Authenticity Code" className="w-20 h-20 rounded-lg bg-white p-1" />
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-emerald-400 block print:text-emerald-800">
                رمز التحقق الإمبراطوري ✅
              </span>
              <p className="text-[10px] text-gray-400 print:text-gray-600">
                امسح الرمز للكشف عن أصالة الشراء وتتبع الضمان الذهبي لعطور روما.
              </p>
            </div>
          </div>

          {/* Pricing Totals */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-gray-400 print:text-gray-700">
              <span>المجموع الفرعي:</span>
              <span className="font-mono text-white print:text-black font-bold">{order.totalAmount} ر.س</span>
            </div>
            <div className="flex justify-between text-gray-400 print:text-gray-700">
              <span>الشحن والتوصيل الفاخر:</span>
              <span className="text-emerald-400 font-bold">مجاني (Free VIP Shipping)</span>
            </div>
            <div className="flex justify-between text-base font-black text-white pt-2 border-t border-gray-800 print:border-gray-400 print:text-black">
              <span className="text-gold-300 print:text-black">المبلغ الإجمالي النهائي:</span>
              <span className="text-gold-300 font-mono text-lg print:text-black">{order.totalAmount} ر.س</span>
            </div>
          </div>

        </div>

        {/* Footer Note */}
        <div className="text-center pt-6 text-[11px] text-gray-500 print:text-gray-600 border-t border-gray-800/60 print:border-gray-300">
          شكراً لتسوقكم من روما للعطور الفاخرة ✨ العينات التجريبية والضمان الذهبي مرفقان مع طردكم الفاخر.
        </div>

      </div>

    </div>
  );
}
