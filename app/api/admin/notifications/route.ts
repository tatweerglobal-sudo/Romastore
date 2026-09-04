import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { DEFAULT_NOTIFICATIONS } from '@/lib/notifications';

export async function GET() {
  try {
    let settings = await prisma.notificationSetting.findMany();

    if (settings.length === 0) {
      await prisma.notificationSetting.createMany({
        data: DEFAULT_NOTIFICATIONS,
      });
      settings = await prisma.notificationSetting.findMany();
    }

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { event, isEnabled, templateAr } = body;

    const updated = await prisma.notificationSetting.upsert({
      where: { event },
      update: {
        isEnabled,
        templateAr,
      },
      create: {
        event,
        isEnabled,
        templateAr,
      },
    });

    return NextResponse.json({ success: true, setting: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update notification setting' }, { status: 500 });
  }
}
