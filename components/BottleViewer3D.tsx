'use client';

import { useState } from 'react';
import Image from 'next/image';
import { RotateCw, Sparkles, Eye } from 'lucide-react';

export default function BottleViewer3D({ imageUrl, name }: { imageUrl: string; name: string }) {
  const [rotation, setRotation] = useState(0);

  const handleRotate = () => {
    setRotation((prev) => (prev + 45) % 360);
  };

  return (
    <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-charcoal border border-gold-500/30 shadow-2xl group flex items-center justify-center">
      <div
        className="w-full h-full relative transition-transform duration-500 ease-out"
        style={{ transform: `rotateY(${rotation}deg)` }}
      >
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* 360 Rotation Control */}
      <button
        onClick={handleRotate}
        className="absolute bottom-4 right-4 bg-obsidian/80 backdrop-blur-md text-gold-300 border border-gold-500/40 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xl hover:bg-gold-500 hover:text-obsidian transition-all z-20"
      >
        <RotateCw className="w-3.5 h-3.5" />
        <span>تدوير 360° ({rotation}°)</span>
      </button>
    </div>
  );
}
