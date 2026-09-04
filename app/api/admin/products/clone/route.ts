import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { productId } = await req.json();

    const original = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!original) {
      return NextResponse.json({ success: false, error: 'Original product not found' }, { status: 404 });
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const clonedSlug = `${original.slug}-copy-${randomSuffix}`;

    const cloned = await prisma.product.create({
      data: {
        name: `${original.name} (نسخة)`,
        slug: clonedSlug,
        description: original.description,
        price: original.price,
        discountPrice: original.discountPrice,
        costPrice: original.costPrice,
        stock: original.stock,
        size: original.size,
        concentration: original.concentration,
        gender: original.gender,
        category: original.category,
        topNotes: original.topNotes,
        heartNotes: original.heartNotes,
        baseNotes: original.baseNotes,
        longevity: original.longevity,
        sillage: original.sillage,
        images: original.images,
        isFeatured: false,
        barcode: `EAN-${Math.floor(100000000000 + Math.random() * 900000000000)}`,
        badge: original.badge,
        variants: original.variants,
        originMap: original.originMap,
        isPreOrder: original.isPreOrder,
      },
    });

    return NextResponse.json({ success: true, product: cloned });
  } catch (error: any) {
    console.error('Error cloning product:', error);
    return NextResponse.json({ success: false, error: 'Failed to clone product' }, { status: 500 });
  }
}
