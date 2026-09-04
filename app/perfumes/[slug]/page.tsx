import { notFound } from 'next/navigation';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import FragrancePyramid from '@/components/FragrancePyramid';
import RatingMeter from '@/components/RatingMeter';
import AudioStoryteller from '@/components/AudioStoryteller';
import ProjectionRadius from '@/components/ProjectionRadius';
import EngravingOption from '@/components/EngravingOption';
import VoiceGiftCard from '@/components/VoiceGiftCard';
import BottleViewer3D from '@/components/BottleViewer3D';
import ProductDetailClient from './ProductDetailClient';
import { Award, RotateCcw, ShieldCheck, Sparkles, Truck } from 'lucide-react';

export const revalidate = 0;

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  });

  if (!product) {
    notFound();
  }

  const images = product.images.split(',').map((i) => i.trim());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Top Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        
        {/* Left/Right Interactive 3D Viewer & Gallery */}
        <div className="space-y-4">
          <BottleViewer3D imageUrl={images[0]} name={product.name} />

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="w-20 h-20 relative rounded-xl overflow-hidden border-2 border-gold-500/40 flex-shrink-0 cursor-pointer"
                >
                  <Image src={img} alt={`${product.name} thumbnail`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}

          {/* Audio Storyteller Narrator */}
          <AudioStoryteller perfumeName={product.name} />
        </div>

        {/* Product Details & Actions */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-gold-400">
              <span className="bg-gold-950/80 px-3 py-1 rounded-full border border-gold-500/30">
                {product.category}
              </span>
              <span>•</span>
              <span>مخصص لـ: {product.gender}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              {product.name}
            </h1>

            <p className="text-sm text-gray-300 leading-relaxed pt-2">
              {product.description}
            </p>
          </div>

          {/* Longevity & Sillage Rating Meters */}
          <RatingMeter longevity={product.longevity} sillage={product.sillage} />

          {/* Projection Radius Simulator */}
          <ProjectionRadius sillageScore={product.sillage} />

          {/* Custom Engraving Option */}
          <EngravingOption />

          {/* Voice QR Gift Card Recorder */}
          <VoiceGiftCard />

          {/* Pricing & Interactive Client Action Box */}
          <ProductDetailClient product={product} />

          {/* Guarantees Box */}
          <div className="p-4 rounded-xl bg-emeraldLuxury-950/60 border border-gold-500/20 space-y-2 text-xs text-gray-300">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <RotateCcw className="w-4 h-4" />
              <span>ضمان تجربة العينة المجانية</span>
            </div>
            <p className="text-[11px] text-gray-400">
              تصلك مع هذا الطلب عينة تجريبية بحجم 10ml. استمتع بتجربة العطر على بشرتك قبل فتح الزجاجة الأصلية، وتتيح لك استرجاع المنتج كاملاً إن لم يرق لك.
            </p>
          </div>

        </div>

      </div>

      {/* FRAGRANCE PYRAMID SECTION */}
      <div className="pt-8">
        <FragrancePyramid
          topNotes={product.topNotes}
          heartNotes={product.heartNotes}
          baseNotes={product.baseNotes}
        />
      </div>

    </div>
  );
}
