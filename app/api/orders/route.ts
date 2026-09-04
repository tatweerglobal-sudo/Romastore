import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { dispatchOrderNotification } from '@/lib/notifications';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');

  try {
    if (search) {
      const orders = await prisma.order.findMany({
        where: {
          OR: [
            { orderNumber: { contains: search } },
            { customerPhone: { contains: search } },
            { customerName: { contains: search } },
          ],
        },
        include: {
          items: {
            include: { product: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json(orders);
    }

    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: { product: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerPhone,
      address,
      city,
      totalAmount,
      paymentMethod,
      giftMessage,
      includeSample,
      items,
    } = body;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `ROMA-${randomSuffix}`;

    const newOrder = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        customerPhone,
        address,
        city: city || 'الرياض',
        totalAmount: parseFloat(totalAmount),
        paymentMethod: paymentMethod || 'COD',
        giftMessage: giftMessage || null,
        includeSample: includeSample !== false,
        items: {
          create: items.map((it: any) => ({
            productId: it.productId,
            quantity: parseInt(it.quantity, 10),
            price: parseFloat(it.price),
          })),
        },
      },
      include: {
        items: true,
      },
    });

    // Trigger Automated WhatsApp & Invoice Notification
    dispatchOrderNotification('ORDER_PAID', {
      orderId: newOrder.id,
      orderNumber: newOrder.orderNumber,
      customerName: newOrder.customerName,
      customerPhone: newOrder.customerPhone,
      totalAmount: newOrder.totalAmount,
      status: newOrder.status,
    }).catch((e) => console.error('Notification dispatch error:', e));

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: error.message || 'Failed to create order' }, { status: 400 });
  }
}
