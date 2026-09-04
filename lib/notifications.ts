import { prisma } from '@/lib/prisma';

export interface NotificationPayload {
  orderId: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  totalAmount: number;
  status: string;
  trackingNumber?: string | null;
  shippingCarrier?: string | null;
  giftRecipientPhone?: string | null;
  giftRecipientName?: string | null;
}

export const DEFAULT_NOTIFICATIONS = [
  {
    event: 'ORDER_PAID',
    channel: 'WHATSAPP',
    isEnabled: true,
    templateAr: `مرحباً {customer_name} 🌸\nتم استلام مبلغ طلبك #{order_number} بنجاح لدى روما للعطور الفاخرة!\nإجمالي المبلغ: {total_amount} ر.س\n\nيمكنك معاينة وتحميل الفاتورة الرقمية المعتمدة هنا:\n{invoice_url}\n\nشكراً لثقتكم بعطورنا المتميزة! ✨`,
  },
  {
    event: 'ORDER_SHIPPED',
    channel: 'WHATSAPP',
    isEnabled: true,
    templateAr: `أهلاً {customer_name} 🚚✨\nعطرك الفاخر في طريقه إليك الآن!\nرقم الطلب: #{order_number}\nشركة الشحن: {shipping_carrier}\nرقم التتبع: {tracking_number}\n\nتتبع شحنتك المباشرة وفاتورتك من هنا:\n{tracking_url}`,
  },
  {
    event: 'ORDER_DELIVERED',
    channel: 'WHATSAPP',
    isEnabled: true,
    templateAr: `عزيزنا {customer_name} 💐\nتم تسليم طلبك #{order_number} بنجاح!\nنأمل أن عبير عطرنا قد أنعش حواسك ✨\n\nشاركنا تقييمك واحصل على 50 نقطة ولاء مجانية رصيد في حسابك:\n{store_url}/loyalty`,
  },
  {
    event: 'ABANDONED_CART',
    channel: 'WHATSAPP',
    isEnabled: true,
    templateAr: `أهلاً {customer_name} 🌸\nلاحظنا أنك تركت زجاجتك العطرية المتميزة في السلة!\nاستخدم كود الخصم الفوري ROMA5 لإكمال طلبك الآن واحصل على خصم فوري:\n{checkout_url}`,
  },
];

export async function dispatchOrderNotification(event: 'ORDER_PAID' | 'ORDER_SHIPPED' | 'ORDER_DELIVERED' | 'ABANDONED_CART', payload: NotificationPayload) {
  try {
    const setting = await prisma.notificationSetting.findUnique({
      where: { event },
    });

    if (setting && !setting.isEnabled) {
      console.log(`Notification for event ${event} is disabled.`);
      return;
    }

    const template = setting?.templateAr || DEFAULT_NOTIFICATIONS.find(n => n.event === event)?.templateAr || '';
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://roma-perfumes.com';

    const message = template
      .replace(/{customer_name}/g, payload.customerName)
      .replace(/{order_number}/g, payload.orderNumber)
      .replace(/{total_amount}/g, payload.totalAmount.toString())
      .replace(/{shipping_carrier}/g, payload.shippingCarrier || 'روما للخدمات اللوجستية')
      .replace(/{tracking_number}/g, payload.trackingNumber || 'RM-TRACK-889')
      .replace(/{invoice_url}/g, `${baseUrl}/invoice/${payload.orderId}`)
      .replace(/{tracking_url}/g, `${baseUrl}/track-order?order=${payload.orderNumber}`)
      .replace(/{checkout_url}/g, `${baseUrl}/checkout`)
      .replace(/{store_url}/g, baseUrl);

    // Format WhatsApp API URL / Console dispatch log
    const cleanPhone = payload.customerPhone.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

    console.log(`[AUTOMATED NOTIFICATION] Event: ${event} | Sent to: ${cleanPhone} | Link: ${whatsappUrl}`);
    
    return {
      success: true,
      event,
      whatsappUrl,
      message,
    };
  } catch (error) {
    console.error('Error dispatching notification:', error);
    return { success: false, error };
  }
}
