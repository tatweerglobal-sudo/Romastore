import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { dispatchOrderNotification } from '@/lib/notifications';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status, trackingNumber, shippingCarrier } = body;

    const updatedOrder = await prisma.order.update({
      where: { id: params.id },
      data: {
        status,
        trackingNumber: trackingNumber || undefined,
        shippingCarrier: shippingCarrier || undefined,
      },
    });

    if (status === 'SHIPPED') {
      dispatchOrderNotification('ORDER_SHIPPED', {
        orderId: updatedOrder.id,
        orderNumber: updatedOrder.orderNumber,
        customerName: updatedOrder.customerName,
        customerPhone: updatedOrder.customerPhone,
        totalAmount: updatedOrder.totalAmount,
        status: updatedOrder.status,
        trackingNumber: updatedOrder.trackingNumber,
        shippingCarrier: updatedOrder.shippingCarrier,
      }).catch((e) => console.error('Shipped notification dispatch error:', e));
    }

    if (status === 'DELIVERED') {
      dispatchOrderNotification('ORDER_DELIVERED', {
        orderId: updatedOrder.id,
        orderNumber: updatedOrder.orderNumber,
        customerName: updatedOrder.customerName,
        customerPhone: updatedOrder.customerPhone,
        totalAmount: updatedOrder.totalAmount,
        status: updatedOrder.status,
      }).catch((e) => console.error('Delivered notification dispatch error:', e));
    }

    return NextResponse.json(updatedOrder);
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 400 });
  }
}
