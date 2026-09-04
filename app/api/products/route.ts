import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      slug,
      description,
      price,
      discountPrice,
      costPrice,
      stock,
      size,
      concentration,
      gender,
      category,
      topNotes,
      heartNotes,
      baseNotes,
      longevity,
      sillage,
      images,
      barcode,
      badge,
      variants,
      originMap,
      isPreOrder,
      preOrderDate,
      layeringProductIds,
    } = body;

    const generatedBarcode = barcode || `EAN-${Math.floor(100000000000 + Math.random() * 900000000000)}`;
    const finalSlug = slug || name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Math.floor(100 + Math.random() * 900);

    const newProduct = await prisma.product.create({
      data: {
        name,
        slug: finalSlug,
        description,
        price: parseFloat(price),
        discountPrice: discountPrice ? parseFloat(discountPrice) : null,
        costPrice: costPrice ? parseFloat(costPrice) : null,
        stock: parseInt(stock, 10) || 10,
        size: size || '100ml',
        concentration: concentration || 'Extrait de Parfum',
        gender: gender || 'للجنسين',
        category: category || 'عطور نيش',
        topNotes,
        heartNotes,
        baseNotes,
        longevity: parseInt(longevity, 10) || 5,
        sillage: parseInt(sillage, 10) || 5,
        images,
        barcode: generatedBarcode,
        badge: badge || null,
        variants: variants ? (typeof variants === 'string' ? variants : JSON.stringify(variants)) : null,
        originMap: originMap ? (typeof originMap === 'string' ? originMap : JSON.stringify(originMap)) : null,
        isPreOrder: Boolean(isPreOrder),
        preOrderDate: preOrderDate ? new Date(preOrderDate) : null,
        layeringProductIds: layeringProductIds || null,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: error.message || 'Failed to create product' }, { status: 400 });
  }
}
