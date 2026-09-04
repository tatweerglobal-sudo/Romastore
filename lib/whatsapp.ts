export interface CartItem {
  id: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  city?: string;
  giftNote?: string;
}

export const DEFAULT_WHATSAPP_NUMBER = '966501234567';

export function formatWhatsAppNumber(phone: string): string {
  return phone.replace(/[^0-9]/g, '');
}

export function generateSingleProductWhatsAppUrl(
  productName: string,
  size: string,
  price: number,
  quantity: number = 1,
  adminPhone: string = DEFAULT_WHATSAPP_NUMBER
): string {
  const cleanPhone = formatWhatsAppNumber(adminPhone);
  const message =
    `✨ *طلب شراء جديد عبر الواتساب - متجر روما للعطور* ✨\n` +
    `-----------------------------------\n` +
    `🏷️ *العطر المطلـوب:* ${productName}\n` +
    `📏 *الحجم:* ${size}\n` +
    `🔢 *الكمية:* ${quantity}\n` +
    `💵 *السعر الإجمالي:* ${price * quantity} ر.س\n` +
    `-----------------------------------\n` +
    `أرجو تزويدي بتفاصيل الشحن والتأكيد.`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function generateCartWhatsAppUrl(
  items: CartItem[],
  customer: CustomerDetails,
  adminPhone: string = DEFAULT_WHATSAPP_NUMBER
): string {
  const cleanPhone = formatWhatsAppNumber(adminPhone);
  let total = 0;

  const itemsText = items
    .map((item, idx) => {
      const subtotal = item.price * item.quantity;
      total += subtotal;
      return `${idx + 1}. *${item.name}* (${item.size}) × ${item.quantity} = ${subtotal} ر.س`;
    })
    .join('\n');

  const message =
    `✨ *فاتورة طلب شراء جديد من متجر روما للعطور* ✨\n` +
    `-----------------------------------\n` +
    `👤 *الاسم:* ${customer.name}\n` +
    `📞 *الهاتف:* ${customer.phone}\n` +
    `📍 *العنوان:* ${customer.city || 'الرياض'} - ${customer.address}\n` +
    (customer.giftNote ? `🎁 *بطاقة إهداء:* ${customer.giftNote}\n` : '') +
    `-----------------------------------\n` +
    `📦 *المنتجات المطلوبة:*\n${itemsText}\n` +
    `-----------------------------------\n` +
    `💰 *الإجمالي المستحق:* ${total} ر.س\n` +
    `🚚 *طريقة الدفع:* عند الاستلام COD\n` +
    `-----------------------------------\n` +
    `أرجو تأكيد تجهيز الشحنة وموعد التوصيل.`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
