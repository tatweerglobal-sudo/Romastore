import { prisma } from '@/lib/prisma';

export interface PaymentGatewayConfig {
  id: string;
  code: string;
  nameAr: string;
  nameEn: string;
  icon?: string | null;
  isEnabled: boolean;
  isDefault: boolean;
  isTestMode: boolean;
  apiKey?: string | null;
  secretKey?: string | null;
  merchantId?: string | null;
  publicKey?: string | null;
}

export const INITIAL_GATEWAYS = [
  {
    code: 'COD',
    nameAr: 'الدفع عند الاستلام (COD)',
    nameEn: 'Cash on Delivery',
    icon: '💵',
    isEnabled: true,
    isDefault: true,
    isTestMode: false,
  },
  {
    code: 'MADA',
    nameAr: 'بطاقة مدى (Mada)',
    nameEn: 'Mada Debit Card',
    icon: '💳',
    isEnabled: true,
    isDefault: false,
    isTestMode: true,
  },
  {
    code: 'APPLE_PAY',
    nameAr: 'آبل باي (Apple Pay)',
    nameEn: 'Apple Pay Instant',
    icon: '🍏',
    isEnabled: true,
    isDefault: false,
    isTestMode: true,
  },
  {
    code: 'PAYMOB',
    nameAr: 'باي مب (Paymob - Visa/Mastercard)',
    nameEn: 'Paymob Egypt & Gulf',
    icon: '⚡',
    isEnabled: true,
    isDefault: false,
    isTestMode: true,
  },
  {
    code: 'TAP',
    nameAr: 'تاب للمدفوعات (Tap Payments)',
    nameEn: 'Tap Payments GCC',
    icon: '🌐',
    isEnabled: true,
    isDefault: false,
    isTestMode: true,
  },
  {
    code: 'VODAFONE_CASH',
    nameAr: 'فودافون كاش / إنستاباي (Vodafone & InstaPay)',
    nameEn: 'Vodafone Cash & InstaPay',
    icon: '📱',
    isEnabled: true,
    isDefault: false,
    isTestMode: false,
  },
  {
    code: 'FAWRY',
    nameAr: 'فوري باي (Fawry Pay)',
    nameEn: 'Fawry Express Payment',
    icon: '🟡',
    isEnabled: false,
    isDefault: false,
    isTestMode: true,
  },
  {
    code: 'TABBY',
    nameAr: 'تقسيط تابي على 4 دفعات (Tabby)',
    nameEn: 'Tabby Buy Now Pay Later',
    icon: '🛍️',
    isEnabled: true,
    isDefault: false,
    isTestMode: true,
  },
  {
    code: 'TAMARA',
    nameAr: 'تقسيط تمارا (Tamara)',
    nameEn: 'Tamara BNPL',
    icon: '✨',
    isEnabled: false,
    isDefault: false,
    isTestMode: true,
  },
];

export async function getActivePaymentGateways() {
  try {
    let gateways = await prisma.paymentGateway.findMany({
      orderBy: { code: 'asc' },
    });

    if (gateways.length === 0) {
      await prisma.paymentGateway.createMany({
        data: INITIAL_GATEWAYS,
      });
      gateways = await prisma.paymentGateway.findMany({
        orderBy: { code: 'asc' },
      });
    }

    return gateways;
  } catch (error) {
    console.error('Error fetching payment gateways:', error);
    return INITIAL_GATEWAYS.map((g, idx) => ({ ...g, id: `gw-${idx}` }));
  }
}
