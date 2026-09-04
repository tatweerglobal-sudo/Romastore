import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const coupons = [
      { id: '1', code: 'ROMA10', discountPercent: 10, isActive: true, usageCount: 24 },
      { id: '2', code: 'VIP2026', discountPercent: 15, isActive: true, usageCount: 12 },
      { id: '3', code: 'ROYAL50', discountPercent: 20, isActive: true, usageCount: 8 },
    ];
    return NextResponse.json(coupons);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch coupons' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, discountPercent } = body;
    return NextResponse.json(
      { id: Date.now().toString(), code, discountPercent, isActive: true, usageCount: 0 },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to create coupon' }, { status: 400 });
  }
}
