import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ArrowRight, Gift, Phone, MapPin, CreditCard } from 'lucide-react';
import OrderStatusChanger from './OrderStatusChanger';

export const revalidate = 0;

export default async function AdminOrdersPage() {
  let orders: any[] = [];
  try {
    orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: { product: true },
        },
      },
    });
  } catch (error) {
    console.error('Error fetching admin orders:', error);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-gold-400 text-xs font-bold mb-1">
            <Link href="/admin" className="hover:underline flex items-center gap-1">
              <ArrowRight className="w-3.5 h-3.5" />
              <span>العودة للوحة الإحصائيات</span>
            </Link>
          </div>
          <h1 className="text-3xl font-black text-white">إدارة طلبات الشحنات العطرية ({orders.length})</h1>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.length === 0 ? (
          <div className="text-center py-20 bg-charcoal rounded-2xl border border-gray-800">
            <p className="text-gray-400 text-xs">لا يوجد أي طلبات مسجلة بعد</p>
          </div>
        ) : (
          orders.map((ord) => (
            <div
              key={ord.id}
              className="bg-charcoal rounded-2xl border border-gold-500/20 p-6 space-y-4 shadow-xl"
            >
              
              {/* Order Header info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-gold-300">{ord.orderNumber}</span>
                    <span className="text-[11px] text-gray-400">
                      • {new Date(ord.createdAt).toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">{ord.customerName}</h3>
                </div>

                <div className="flex items-center gap-3">
                  <OrderStatusChanger orderId={ord.id} currentStatus={ord.status} />
                </div>
              </div>

              {/* Order Body */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                
                {/* Contact & Address */}
                <div className="bg-obsidian p-4 rounded-xl space-y-2 border border-gray-800">
                  <span className="font-bold text-gold-300 block mb-1">بيانات العميل والشحن:</span>
                  <p className="flex items-center gap-2 text-gray-300">
                    <Phone className="w-3.5 h-3.5 text-gold-400" />
                    <span>{ord.customerPhone}</span>
                  </p>
                  <p className="flex items-start gap-2 text-gray-300">
                    <MapPin className="w-3.5 h-3.5 text-gold-400 mt-0.5" />
                    <span>{ord.city} - {ord.address}</span>
                  </p>
                  <p className="flex items-center gap-2 text-gray-300">
                    <CreditCard className="w-3.5 h-3.5 text-gold-400" />
                    <span>طريقة الدفع: {ord.paymentMethod}</span>
                  </p>
                </div>

                {/* Items ordered */}
                <div className="bg-obsidian p-4 rounded-xl space-y-2 border border-gray-800 md:col-span-2 flex flex-col justify-between">
                  <div>
                    <span className="font-bold text-gold-300 block mb-2">العطور والتوزيعات المطلوبة:</span>
                    <div className="space-y-1.5">
                      {ord.items.map((it: any) => (
                        <div key={it.id} className="flex justify-between items-center text-gray-200 border-b border-gray-900 pb-1">
                          <span>{it.product.name} ({it.product.size})</span>
                          <span className="font-bold">الكمية: {it.quantity} • ({it.price * it.quantity} ر.س)</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-800 flex justify-between items-center text-sm font-bold text-white">
                    <span>المبلغ الكلي:</span>
                    <span className="text-gold-300 text-base">{ord.totalAmount} ر.س</span>
                  </div>
                </div>

              </div>

              {/* Gift Card Message view */}
              {ord.giftMessage && (
                <div className="p-3 bg-gold-950/40 rounded-xl border border-gold-500/30 text-xs space-y-1">
                  <span className="font-bold text-gold-300 flex items-center gap-1.5">
                    <Gift className="w-4 h-4 text-gold-400" />
                    <span>نص كرت الإهداء لطباعته وإرفاقه مع الصندوق:</span>
                  </span>
                  <p className="text-gray-200 italic pr-6 text-sm">"{ord.giftMessage}"</p>
                </div>
              )}

            </div>
          ))
        )}
      </div>

    </div>
  );
}
