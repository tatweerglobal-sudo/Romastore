import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const setting = await prisma.setting.findFirst();
    if (!setting) {
      const defaultSetting = await prisma.setting.create({
        data: {
          id: 'store-config',
          whatsappNumber: '966501234567',
          storeName: 'روما للعطور الفاخرة',
          announcement: 'شحن مجاني وسريع على كافة الطلبات مع عينة تجريبية مجانية لكل زجاجة',
        },
      });
      return NextResponse.json(defaultSetting);
    }
    return NextResponse.json(setting);
  } catch (error) {
    return NextResponse.json(
      {
        id: 'store-config',
        whatsappNumber: '966501234567',
        storeName: 'روما للعطور الفاخرة',
        announcement: 'شحن مجاني وسريع على كافة الطلبات مع عينة تجريبية مجانية لكل زجاجة',
      },
      { status: 200 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { whatsappNumber, storeName, announcement } = body;

    const setting = await prisma.setting.upsert({
      where: { id: 'store-config' },
      update: { whatsappNumber, storeName, announcement },
      create: {
        id: 'store-config',
        whatsappNumber: whatsappNumber || '966501234567',
        storeName: storeName || 'روما للعطور الفاخرة',
        announcement,
      },
    });

    return NextResponse.json(setting);
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 400 });
  }
}
