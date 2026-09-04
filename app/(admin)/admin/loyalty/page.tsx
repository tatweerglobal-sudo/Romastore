import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ArrowRight, Crown, Award, Users, Sparkles } from 'lucide-react';

export const revalidate = 0;

export default async function AdminLoyaltyPage() {
  const members = [
    { id: '1', name: 'أحمد الإبراهيمي', phone: '0501234567', tier: 'VIP Royal 👑', points: 1250, ordersCount: 8 },
    { id: '2', name: 'سارة المنصور', phone: '0559876543', tier: 'VIP Gold ⭐️', points: 680, ordersCount: 5 },
    { id: '3', name: 'عبدالملك العتيبي', phone: '0561122334', tier: 'VIP Silver 🥈', points: 420, ordersCount: 3 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center justify-between border-b border-gray-800 pb-4">
        <div className="space-y-1">
          <Link href="/admin" className="text-xs text-gold-400 font-bold hover:underline flex items-center gap-1">
            <ArrowRight className="w-3.5 h-3.5" />
            <span>العودة للوحة الإحصائيات</span>
          </Link>
          <h1 className="text-3xl font-black text-white">إدارة أعضاء ونقاط نادي الولاء الملكي</h1>
        </div>
      </div>

      <div className="bg-charcoal rounded-2xl border border-gold-500/20 p-6 space-y-4 shadow-xl">
        <div className="flex justify-between items-center border-b border-gray-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Crown className="w-5 h-5 text-gold-400" />
            <span>أعضاء النادي النخبة المميزين ({members.length})</span>
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right text-gray-300">
            <thead className="bg-obsidian text-gray-400 font-bold uppercase border-b border-gray-800">
              <tr>
                <th className="p-3">اسم العضو الجوال</th>
                <th className="p-3">مستوى العضوية</th>
                <th className="p-3">رصيد النقاط</th>
                <th className="p-3">عدد الطلبات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {members.map((m) => (
                <tr key={m.id} className="hover:bg-obsidian/50">
                  <td className="p-3">
                    <span className="font-bold text-white text-sm block">{m.name}</span>
                    <span className="text-[11px] text-gray-400">{m.phone}</span>
                  </td>
                  <td className="p-3">
                    <span className="bg-gold-500/20 text-gold-300 px-3 py-1 rounded-full font-extrabold border border-gold-500/30">
                      {m.tier}
                    </span>
                  </td>
                  <td className="p-3 font-black text-gold-400 text-sm">{m.points} نقطة</td>
                  <td className="p-3 font-bold text-white">{m.ordersCount} طلبات</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
