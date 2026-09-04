import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getActivePaymentGateways, INITIAL_GATEWAYS } from '@/lib/payments';

export async function GET() {
  try {
    const gateways = await getActivePaymentGateways();
    return NextResponse.json({ success: true, gateways });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to load gateways' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, gateway } = body;

    if (action === 'toggle') {
      const updated = await prisma.paymentGateway.update({
        where: { code: gateway.code },
        data: { isEnabled: gateway.isEnabled },
      });
      return NextResponse.json({ success: true, gateway: updated });
    }

    if (action === 'setDefault') {
      await prisma.paymentGateway.updateMany({
        data: { isDefault: false },
      });
      const updated = await prisma.paymentGateway.update({
        where: { code: gateway.code },
        data: { isDefault: true, isEnabled: true },
      });
      return NextResponse.json({ success: true, gateway: updated });
    }

    if (action === 'updateKeys') {
      const updated = await prisma.paymentGateway.upsert({
        where: { code: gateway.code },
        update: {
          apiKey: gateway.apiKey,
          secretKey: gateway.secretKey,
          merchantId: gateway.merchantId,
          publicKey: gateway.publicKey,
          isTestMode: gateway.isTestMode,
          isEnabled: gateway.isEnabled,
        },
        create: {
          code: gateway.code,
          nameAr: gateway.nameAr,
          nameEn: gateway.nameEn,
          apiKey: gateway.apiKey,
          secretKey: gateway.secretKey,
          merchantId: gateway.merchantId,
          publicKey: gateway.publicKey,
          isTestMode: gateway.isTestMode,
          isEnabled: gateway.isEnabled,
        },
      });
      return NextResponse.json({ success: true, gateway: updated });
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error updating payment gateway:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
