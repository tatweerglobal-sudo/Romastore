import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ShoppingBag, TrendingUp, Package, Clock, Plus, ArrowLeft, ShieldCheck, AlertTriangle, Tag, Gift, Crown, Settings, FolderKanban, CreditCard, MessageSquare } from 'lucide-react';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  let totalSales = 0;
  let totalOrders = 0;
  let pendingOrdersCount = 0;
  let lowStockCount = 0;
  let recentOrders: any[] = [];

  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: { items: { include: { product: true } } },
    });

    totalOrders = orders.length;
    totalSales = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    pendingOrdersCount = orders.filter((o) => o.status === 'PENDING').length;

    const products = await prisma.product.findMany();
    lowStockCount = products.filter((p) => p.stock <= 5).length;
    recentOrders = orders.slice(0, 5);
  } catch (e) {
    console.error('Failed to load admin stats', e);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>لوحة تحكم المسؤول (Roma Admin)</span>
          </div>
          <h1 className="text-3xl font-black text-white">إحصائيات وإدارة المتجر الشاملة</h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-obsidian font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة عطر جديد</span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-charcoal border border-gray-800 text-gray-300 hover:text-white text-xs font-bold px-4 py-2.5 rounded-xl"
          >
            <span>معاينة الواجهة</span>
          </Link>
        </div>
      </div>

      {/* Analytics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Sales */}
        <div className="bg-charcoal p-6 rounded-2xl border border-gold-500/20 space-y-2">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>إجمالي المبيعات</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-gold-300">{totalSales} ر.س</p>
          <span className="text-[11px] text-emerald-400 block">تحديث فوري للأرباح</span>
        </div>

        {/* Total Orders */}
        <div className="bg-charcoal p-6 rounded-2xl border border-gold-500/20 space-y-2">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>إجمالي الطلبات</span>
            <div className="w-8 h-8 rounded-lg bg-gold-950 text-gold-400 flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white">{totalOrders}</p>
          <span className="text-[11px] text-gray-400 block">طلب مكتمل وقيد التنفيذ</span>
        </div>

        {/* Pending Orders */}
        <div className="bg-charcoal p-6 rounded-2xl border border-gold-500/20 space-y-2">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>طلبات قيد الانتظار</span>
            <div className="w-8 h-8 rounded-lg bg-amber-950 text-amber-400 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-amber-400">{pendingOrdersCount}</p>
          <span className="text-[11px] text-amber-300 block">تحتاج تجهيز وشحن</span>
        </div>

        {/* Low Stock Items */}
        <div className="bg-charcoal p-6 rounded-2xl border border-gold-500/20 space-y-2">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>تنبيهات المخزون</span>
            <div className="w-8 h-8 rounded-lg bg-red-950 text-red-400 flex items-center justify-center font-bold">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-red-400">{lowStockCount}</p>
          <span className="text-[11px] text-gray-400 block">عطور ذات كمية منخفضة</span>
        </div>

      </div>

      {/* Admin Navigation Quick Links (All 6 Modules) */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-white">أقسام لوحة التحكم</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/admin/orders"
            className="p-5 rounded-2xl bg-gradient-to-r from-emeraldLuxury-950 to-charcoal border border-emerald-500/30 flex justify-between items-center hover:border-emerald-400 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                  إدارة الطلبات
                </h3>
                <p className="text-xs text-gray-400">تتبع الطلبات وتحديث حالات الشحن</p>
              </div>
            </div>
            <ArrowLeft className="w-4 h-4 text-emerald-400 group-hover:-translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/admin/products"
            className="p-5 rounded-2xl bg-gradient-to-r from-gold-950/60 to-charcoal border border-gold-500/30 flex justify-between items-center hover:border-gold-400 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-400 flex items-center justify-center">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-gold-300 transition-colors">
                  إدارة المنتجات والعطور
                </h3>
                <p className="text-xs text-gray-400">إضافة وتعديل العطور والمخزون</p>
              </div>
            </div>
            <ArrowLeft className="w-4 h-4 text-gold-400 group-hover:-translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/admin/categories"
            className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/60 to-charcoal border border-blue-500/30 flex justify-between items-center hover:border-blue-400 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <FolderKanban className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                  إدارة التصنيفات والأقسام
                </h3>
                <p className="text-xs text-gray-400">إضافة وإعادة ترتيب أقسام المتجر</p>
              </div>
            </div>
            <ArrowLeft className="w-4 h-4 text-blue-400 group-hover:-translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/admin/coupons"
            className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/60 to-charcoal border border-purple-500/30 flex justify-between items-center hover:border-purple-400 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                  الكوبونات وأكواد الخصم
                </h3>
                <p className="text-xs text-gray-400">إنشاء كوبونات الخصم والنسب</p>
              </div>
            </div>
            <ArrowLeft className="w-4 h-4 text-purple-400 group-hover:-translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/admin/loyalty"
            className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/60 to-charcoal border border-amber-500/30 flex justify-between items-center hover:border-amber-400 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                  نادي الولاء ومكافآت VIP
                </h3>
                <p className="text-xs text-gray-400">إدارة مستويات العضويات والنقاط</p>
              </div>
            </div>
            <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/admin/payments"
            className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-charcoal border border-emerald-500/30 flex justify-between items-center hover:border-emerald-400 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                  إدارة وتبديل بوابات الدفع
                </h3>
                <p className="text-xs text-gray-400">تفعيل مدى، آبل باي، فودافون كاش، وتابي</p>
              </div>
            </div>
            <ArrowLeft className="w-4 h-4 text-emerald-400 group-hover:-translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/admin/notifications"
            className="p-5 rounded-2xl bg-gradient-to-r from-teal-950/60 to-charcoal border border-teal-500/30 flex justify-between items-center hover:border-teal-400 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors">
                  تنبيهات الواتساب والتسويق
                </h3>
                <p className="text-xs text-gray-400">تخصيص الرسائل الآلية والسلات المتروكة</p>
              </div>
            </div>
            <ArrowLeft className="w-4 h-4 text-teal-400 group-hover:-translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/admin/settings"
            className="p-5 rounded-2xl bg-gradient-to-r from-gray-900 to-charcoal border border-gray-700 flex justify-between items-center hover:border-gray-500 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-800 text-gray-300 flex items-center justify-center">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-gray-300 transition-colors">
                  إعدادات المتجر العامة
                </h3>
                <p className="text-xs text-gray-400">رقم الواتساب، العملة، الشحن المجاني</p>
              </div>
            </div>
            <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-charcoal rounded-2xl border border-gold-500/20 p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-gray-800 pb-3">
          <h2 className="text-lg font-bold text-white">آخر الطلبات المسجلة</h2>
          <Link href="/admin/orders" className="text-xs text-gold-400 font-bold hover:underline">
            عرض كافة الطلبات ({totalOrders})
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right text-gray-300">
            <thead className="bg-obsidian text-gray-400 font-bold uppercase border-b border-gray-800">
              <tr>
                <th className="p-3">رقم الطلب</th>
                <th className="p-3">اسم العميل</th>
                <th className="p-3">الهاتف والمدينة</th>
                <th className="p-3">المبلغ والتاريخ</th>
                <th className="p-3">حالة الطلب</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {recentOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-obsidian/50">
                  <td className="p-3 font-bold text-gold-300">{ord.orderNumber}</td>
                  <td className="p-3 font-bold text-white">{ord.customerName}</td>
                  <td className="p-3">{ord.customerPhone} • {ord.city}</td>
                  <td className="p-3 font-extrabold text-white">{ord.totalAmount} ر.س</td>
                  <td className="p-3">
                    <span className="bg-gold-500/20 text-gold-300 px-2.5 py-1 rounded-full font-bold">
                      {ord.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
