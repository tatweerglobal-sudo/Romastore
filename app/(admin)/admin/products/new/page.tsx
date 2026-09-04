'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, ArrowRight, Wand2, Calculator, ShieldCheck, Printer, Eye, Plus, 
  Trash2, Barcode, Layers, Package, Upload, Image as ImageIcon, Check, Box, 
  Globe, Flame, Crown, Feather, Compass, RefreshCw, Zap
} from 'lucide-react';

export default function AdminNewProductPage() {
  const router = useRouter();

  // Basic Product Info
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('عطور نيش');
  const [gender, setGender] = useState('للجنسين');
  const [concentration, setConcentration] = useState('Extrait de Parfum');
  const [size, setSize] = useState('100ml');

  // Pricing & Profit Calculation
  const [price, setPrice] = useState('350');
  const [discountPrice, setDiscountPrice] = useState('');
  const [costPrice, setCostPrice] = useState('80');
  const [stock, setStock] = useState('20');

  // Pyramid Notes
  const [topNotes, setTopNotes] = useState('برغموت إيطالي, فلفل وردي');
  const [heartNotes, setHeartNotes] = useState('ياسمين ملكي, زعفران نقي');
  const [baseNotes, setBaseNotes] = useState('عنبر دافئ, خشب الصندل, عود كمبودي');

  // Performance Ratings
  const [longevity, setLongevity] = useState(5);
  const [sillage, setSillage] = useState(5);

  // Images Gallery & Upload
  const [imageList, setImageList] = useState<string[]>([
    'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop'
  ]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [customImageUrl, setCustomImageUrl] = useState('');

  // Barcode & Badges
  const [barcode, setBarcode] = useState(`EAN-${Math.floor(100000000000 + Math.random() * 900000000000)}`);
  const [badge, setBadge] = useState('👑 إصدار محدود');

  // Multi-size Variants
  const [variants, setVariants] = useState<{ size: string; price: number; stock: number }[]>([
    { size: '50ml', price: 240, stock: 15 },
    { size: '100ml', price: 350, stock: 20 },
    { size: '200ml', price: 580, stock: 8 },
  ]);

  // Origins Map
  const [selectedOrigins, setSelectedOrigins] = useState<string[]>(['إيطاليا (برغموت)', 'فرنسا (ياسمين)', 'كمبوديا (عود)']);

  // Laser Engraving & Pre-order
  const [allowEngraving, setAllowEngraving] = useState(true);
  const [isPreOrder, setIsPreOrder] = useState(false);
  const [preOrderDate, setPreOrderDate] = useState('');

  // 3D View Interactive Tilt State
  const [is3DMode, setIs3DMode] = useState(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Loading States
  const [loading, setLoading] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [showLabelPrint, setShowLabelPrint] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Computations
  const mainImage = imageList[selectedImageIndex] || imageList[0] || '';
  const numPrice = parseFloat(discountPrice || price) || 0;
  const numCost = parseFloat(costPrice) || 0;
  const netProfit = numPrice - numCost;
  const profitMargin = numPrice > 0 ? Math.round((netProfit / numPrice) * 100) : 0;

  // Image Upload Handlers
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const base64Url = event.target.result as string;
          setImageList((prev) => [...prev, base64Url]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddUrlImage = () => {
    if (!customImageUrl.trim()) return;
    setImageList((prev) => [...prev, customImageUrl.trim()]);
    setCustomImageUrl('');
  };

  const handleRemoveImage = (indexToRemove: number) => {
    if (imageList.length <= 1) {
      alert('يجب الإبقاء على صورة واحدة على الأقل للعطر');
      return;
    }
    setImageList((prev) => prev.filter((_, i) => i !== indexToRemove));
    if (selectedImageIndex >= imageList.length - 1) {
      setSelectedImageIndex(0);
    }
  };

  // AI formulation Trigger
  const handleGenerateAI = async () => {
    if (!name) {
      alert('يرجى كتابة اسم العطر أولاً ليقوم الذكاء الاصطناعي بتوليد الفكرة والوصف والنوتات الهرمية!');
      return;
    }

    setAiGenerating(true);
    try {
      const res = await fetch('/api/admin/products/generate-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, category, gender }),
      });
      const data = await res.json();

      if (data.success) {
        setDescription(data.description);
        setTopNotes(data.topNotes);
        setHeartNotes(data.heartNotes);
        setBaseNotes(data.baseNotes);
        if (data.suggestedPrice) setPrice(data.suggestedPrice.toString());
        if (data.suggestedCost) setCostPrice(data.suggestedCost.toString());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setAiGenerating(false);
    }
  };

  const handleAddIngredient = (noteType: 'top' | 'heart' | 'base', note: string) => {
    if (noteType === 'top') {
      setTopNotes((prev) => (prev ? `${prev}, ${note}` : note));
    } else if (noteType === 'heart') {
      setHeartNotes((prev) => (prev ? `${prev}, ${note}` : note));
    } else {
      setBaseNotes((prev) => (prev ? `${prev}, ${note}` : note));
    }
  };

  const handleAddVariant = () => {
    setVariants((prev) => [...prev, { size: '100ml', price: 350, stock: 10 }]);
  };

  const handleRemoveVariant = (index: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMouseMove3D = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!is3DMode) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30; // -15 to +15 deg
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -30;
    setTilt({ x, y });
  };

  const handleMouseLeave3D = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !topNotes || !heartNotes || !baseNotes || imageList.length === 0) {
      alert('يرجى التأكد من ملء الحقول الأساسية وتوفير صورة واحدة للعطر على الأقل');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          slug,
          description,
          price,
          discountPrice: discountPrice || null,
          costPrice: costPrice || null,
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
          images: imageList.join(','),
          barcode,
          badge,
          variants,
          originMap: selectedOrigins,
          isPreOrder,
          preOrderDate: isPreOrder ? preOrderDate : null,
        }),
      });

      if (res.ok) {
        router.push('/admin/products');
        router.refresh();
      } else {
        const err = await res.json();
        alert(err.error || 'حدث خطأ أثناء إضافة العطر');
      }
    } catch (e) {
      alert('خطأ في الاتصال بالسيرفر');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-gold-400 text-xs font-bold mb-1">
            <Crown className="w-4 h-4 text-gold-400" />
            <span>منصة رفع وتجسيم العطور الملكية الشاملة (Roma 3D Product Creator)</span>
          </div>
          <h1 className="text-3xl font-black text-white">إضافة وتوليد عطر جديد</h1>
        </div>

        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 bg-charcoal border border-gray-800 text-gray-300 hover:text-white text-xs font-bold px-4 py-2.5 rounded-xl self-start sm:self-auto hover:border-gold-500/40 transition-all"
        >
          <ArrowRight className="w-4 h-4" />
          <span>الرجوع لقائمة العطور</span>
        </Link>
      </div>

      {/* Main Grid: Left Column Form (8 Cols), Right Column Interactive 3D Preview (4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form Controls */}
        <form onSubmit={handleSubmit} className="lg:col-span-8 space-y-8">
          
          {/* AI Formulation Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emeraldLuxury-950 via-obsidian to-charcoal border border-gold-500/40 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-black text-gold-300 flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-gold-400 animate-spin" />
                  <span>مولد التركيبات بالذكاء الاصطناعي (AI Formulation)</span>
                </h3>
                <p className="text-xs text-gray-300 mt-1">
                  ادخل اسم العطر فقط لإنشاء القصة العطرية، الهرم، والسعر العادل تلقائياً بنقرة واحدة!
                </p>
              </div>

              <button
                type="button"
                onClick={handleGenerateAI}
                disabled={aiGenerating}
                className="bg-gradient-to-r from-gold-500 via-amber-400 to-gold-600 hover:brightness-110 text-obsidian font-black text-xs px-5 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 flex-shrink-0"
              >
                <Sparkles className="w-4 h-4" />
                <span>{aiGenerating ? 'جاري التوليد...' : 'توليد بالذكاء الاصطناعي ✨'}</span>
              </button>
            </div>
          </div>

          {/* Section 0: Dedicated Image Upload Center */}
          <div className="bg-charcoal p-6 rounded-2xl border border-gold-500/30 space-y-4 shadow-lg">
            <div className="flex items-center justify-between border-b border-gray-800 pb-2">
              <h3 className="text-base font-bold text-gold-300 flex items-center gap-2">
                <Upload className="w-4 h-4 text-gold-400" />
                <span>0. مركز رفع ورابط صور العطر والزجاجة (Media Upload)</span>
              </h3>
              <span className="text-[11px] text-gray-400">
                {imageList.length} صور مضافة
              </span>
            </div>

            {/* Drop Zone Box */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gold-500/40 hover:border-gold-400 bg-obsidian/70 p-6 rounded-2xl text-center cursor-pointer transition-all hover:bg-obsidian group"
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold text-white">اضغط هنا لرفع صور العطر مباشرة من جهازك</h4>
                <p className="text-[11px] text-gray-400">
                  يدعم صور JPG, PNG, WEBP high-res (سيتم تحويلها وتجسيمها في المعاينة 3D فورياً)
                </p>
              </div>
            </div>

            {/* Alternative URL Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={customImageUrl}
                onChange={(e) => setCustomImageUrl(e.target.value)}
                placeholder="أو ضع رابط صورة مباشر من الإنترنت (https://...)"
                className="flex-1 bg-obsidian border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:border-gold-400 outline-none"
              />
              <button
                type="button"
                onClick={handleAddUrlImage}
                className="bg-gold-500/20 text-gold-300 border border-gold-500/40 hover:bg-gold-500 hover:text-obsidian px-4 py-2 rounded-xl text-xs font-bold transition-all"
              >
                إضافة رابط الصورة
              </button>
            </div>

            {/* Thumbnails Gallery Strip */}
            {imageList.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-gray-800">
                <span className="text-[11px] font-bold text-gray-300 block">معرض الصور (انقر لتحديد الصورة الرئيسية للعرض و الـ 3D):</span>
                <div className="flex flex-wrap gap-3">
                  {imageList.map((img, idx) => (
                    <div
                      key={idx}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                        selectedImageIndex === idx ? 'border-gold-400 ring-2 ring-gold-400/40 scale-105' : 'border-gray-800 opacity-70 hover:opacity-100'
                      }`}
                      onClick={() => setSelectedImageIndex(idx)}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                      {selectedImageIndex === idx && (
                        <span className="absolute top-1 right-1 bg-gold-500 text-obsidian text-[9px] font-black px-1.5 py-0.5 rounded">
                          رئيسية
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage(idx);
                        }}
                        className="absolute bottom-1 left-1 bg-red-500/80 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                        title="حذف الصورة"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section 1: Basic Information */}
          <div className="bg-charcoal p-6 rounded-2xl border border-gold-500/20 space-y-4">
            <h3 className="text-base font-bold text-gold-300 border-b border-gray-800 pb-2 flex items-center gap-2">
              <Package className="w-4 h-4 text-gold-400" />
              <span>1. البيانات الأساسية والعلامة التجارية</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-bold mb-1">اسم العطر الفاخر *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!slug) setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
                  }}
                  placeholder="مثال: روما عود رويال (Roma Oud Royale)"
                  className="w-full bg-obsidian border border-gray-800 rounded-xl p-3 text-white focus:border-gold-400 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">قسم المتجر</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-obsidian border border-gray-800 rounded-xl p-3 text-white focus:border-gold-400 outline-none"
                  >
                    <option value="عطور نيش">عطور نيش (Niche)</option>
                    <option value="عطور شرقية">عطور شرقية ملكية</option>
                    <option value="مجموعات فاخرة">مجموعات الهدايا والطقوس</option>
                    <option value="زيوت خاصة">زيوت عطرية نادرة 100%</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">فئة الاستخدام (الجنس)</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-obsidian border border-gray-800 rounded-xl p-3 text-white focus:border-gold-400 outline-none"
                  >
                    <option value="للجنسين">للجنسين (Unisex)</option>
                    <option value="رجالي">رجالي (Men)</option>
                    <option value="نسائي">نسائي (Women)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">التركيز الكيميائي للعطر</label>
                  <select
                    value={concentration}
                    onChange={(e) => setConcentration(e.target.value)}
                    className="w-full bg-obsidian border border-gray-800 rounded-xl p-3 text-white focus:border-gold-400 outline-none"
                  >
                    <option value="Extrait de Parfum">Extrait de Parfum (30% زيت نقي)</option>
                    <option value="Eau de Parfum">Eau de Parfum (20% زيت)</option>
                    <option value="Pure Oil">زيت عطري معتق 100%</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">الوصف التسويقي والقصة الإبداعية</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="اصف سحر العطر، الشعور بالإلهام، وشعف المكونات..."
                  className="w-full bg-obsidian border border-gray-800 rounded-xl p-3 text-white leading-relaxed focus:border-gold-400 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Pricing & Multi-Size Variants Table */}
          <div className="bg-charcoal p-6 rounded-2xl border border-gold-500/20 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-2">
              <h3 className="text-base font-bold text-gold-300 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-gold-400" />
                <span>2. التسعير والأحجام المتعددة (Multi-Size Variants)</span>
              </h3>
              <span className="text-[11px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full font-bold">
                صافي الربح التقديري: {netProfit} ر.س ({profitMargin}%)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="block text-gray-300 font-bold mb-1">السعر الأساسي (ر.س) *</label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-obsidian border border-gray-800 rounded-xl p-3 text-white font-mono focus:border-gold-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">سعر العرض (خصم)</label>
                <input
                  type="number"
                  value={discountPrice}
                  onChange={(e) => setDiscountPrice(e.target.value)}
                  placeholder="مثال: 290"
                  className="w-full bg-obsidian border border-gray-800 rounded-xl p-3 text-white font-mono focus:border-gold-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">تكلفة التصنيع الشاملة</label>
                <input
                  type="number"
                  value={costPrice}
                  onChange={(e) => setCostPrice(e.target.value)}
                  placeholder="مثال: 80"
                  className="w-full bg-obsidian border border-gray-800 rounded-xl p-3 text-white font-mono focus:border-gold-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">المخزون الإجمالي *</label>
                <input
                  type="number"
                  required
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full bg-obsidian border border-gray-800 rounded-xl p-3 text-white font-mono focus:border-gold-400 outline-none"
                />
              </div>
            </div>

            {/* Multi-Size Variants Table */}
            <div className="pt-2 space-y-2 border-t border-gray-800 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-300">خيارات السعات والأحجام المتوفرة (Variants):</span>
                <button
                  type="button"
                  onClick={handleAddVariant}
                  className="text-[11px] bg-gold-500/20 text-gold-300 border border-gold-500/30 px-3 py-1 rounded-lg font-bold hover:bg-gold-500 hover:text-obsidian transition-all flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>إضافة حجم آخر</span>
                </button>
              </div>

              <div className="space-y-2">
                {variants.map((v, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-obsidian p-3 rounded-xl border border-gray-800">
                    <input
                      type="text"
                      value={v.size}
                      onChange={(e) => {
                        const updated = [...variants];
                        updated[idx].size = e.target.value;
                        setVariants(updated);
                      }}
                      placeholder="السعة e.g. 50ml"
                      className="w-24 bg-charcoal border border-gray-800 rounded-lg p-2 text-white font-mono"
                    />
                    <input
                      type="number"
                      value={v.price}
                      onChange={(e) => {
                        const updated = [...variants];
                        updated[idx].price = parseFloat(e.target.value) || 0;
                        setVariants(updated);
                      }}
                      placeholder="السعر (ر.س)"
                      className="w-28 bg-charcoal border border-gray-800 rounded-lg p-2 text-white font-mono"
                    />
                    <input
                      type="number"
                      value={v.stock}
                      onChange={(e) => {
                        const updated = [...variants];
                        updated[idx].stock = parseInt(e.target.value, 10) || 0;
                        setVariants(updated);
                      }}
                      placeholder="المخزون"
                      className="w-24 bg-charcoal border border-gray-800 rounded-lg p-2 text-white font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveVariant(idx)}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Fragrance Pyramid & Origins Map */}
          <div className="bg-charcoal p-6 rounded-2xl border border-gold-500/20 space-y-4">
            <h3 className="text-base font-bold text-gold-300 border-b border-gray-800 pb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-gold-400" />
              <span>3. مصمم الهرم العطري والمنشأ الجغرافي للمكونات</span>
            </h3>

            {/* Fast Ingredient Chips */}
            <div className="bg-obsidian/80 p-3 rounded-xl border border-gray-800 space-y-2 text-[11px]">
              <span className="font-bold text-gray-300 block">إضافة سريعة لمكونات ملكية بنقرة واحدة:</span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleAddIngredient('top', 'برغموت إيطالي')}
                  className="bg-gold-500/10 hover:bg-gold-500/20 text-gold-300 px-2.5 py-1 rounded-lg border border-gold-500/30"
                >
                  + 🍋 برغموت إيطالي (قمة)
                </button>
                <button
                  type="button"
                  onClick={() => handleAddIngredient('heart', 'ياسمين دمشقي')}
                  className="bg-gold-500/10 hover:bg-gold-500/20 text-gold-300 px-2.5 py-1 rounded-lg border border-gold-500/30"
                >
                  + 🌹 ياسمين دمشقي (قلب)
                </button>
                <button
                  type="button"
                  onClick={() => handleAddIngredient('base', 'عود كمبودي معتق')}
                  className="bg-gold-500/10 hover:bg-gold-500/20 text-gold-300 px-2.5 py-1 rounded-lg border border-gold-500/30"
                >
                  + 🪵 عود كمبودي (قاعدة)
                </button>
                <button
                  type="button"
                  onClick={() => handleAddIngredient('base', 'عنبر دافئ')}
                  className="bg-gold-500/10 hover:bg-gold-500/20 text-gold-300 px-2.5 py-1 rounded-lg border border-gold-500/30"
                >
                  + ✨ عنبر دافئ (قاعدة)
                </button>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-amber-300 font-bold mb-1">قمة العطر (Top Notes) *</label>
                <input
                  type="text"
                  required
                  value={topNotes}
                  onChange={(e) => setTopNotes(e.target.value)}
                  placeholder="برغموت إيطالي, فلفل وردي"
                  className="w-full bg-obsidian border border-gray-800 rounded-xl p-3 text-white focus:border-gold-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-amber-300 font-bold mb-1">قلب العطر (Heart Notes) *</label>
                <input
                  type="text"
                  required
                  value={heartNotes}
                  onChange={(e) => setHeartNotes(e.target.value)}
                  placeholder="ياسمين ملكي, زعفران نقي"
                  className="w-full bg-obsidian border border-gray-800 rounded-xl p-3 text-white focus:border-gold-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-amber-300 font-bold mb-1">قاعدة العطر الثابتة (Base Notes) *</label>
                <input
                  type="text"
                  required
                  value={baseNotes}
                  onChange={(e) => setBaseNotes(e.target.value)}
                  placeholder="عود كمبودي, خشب الصندل, عنبر دافئ"
                  className="w-full bg-obsidian border border-gray-800 rounded-xl p-3 text-white focus:border-gold-400 outline-none"
                />
              </div>
            </div>

            {/* Geographical Origin Badges */}
            <div className="pt-2 space-y-2 border-t border-gray-800 text-xs">
              <span className="font-bold text-gray-300 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-gold-400" />
                الدول والمناطق الجغرافية لاستخلاص المكونات:
              </span>
              <div className="flex flex-wrap gap-2">
                {['إيطاليا (برغموت)', 'فرنسا (ورد جوري)', 'بلغاريا (لافندر)', 'كمبوديا (عود)', 'الهند (صندل)'].map((origin) => {
                  const active = selectedOrigins.includes(origin);
                  return (
                    <button
                      type="button"
                      key={origin}
                      onClick={() => {
                        if (active) {
                          setSelectedOrigins(selectedOrigins.filter((o) => o !== origin));
                        } else {
                          setSelectedOrigins([...selectedOrigins, origin]);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1 ${
                        active
                          ? 'bg-gold-500 text-obsidian border-gold-400 shadow-md'
                          : 'bg-obsidian text-gray-400 border-gray-800 hover:border-gray-700'
                      }`}
                    >
                      {active && <Check className="w-3 h-3" />}
                      <span>{origin}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 4: Performance Sliders */}
          <div className="bg-charcoal p-6 rounded-2xl border border-gold-500/20 space-y-4">
            <h3 className="text-base font-bold text-gold-300 border-b border-gray-800 pb-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-gold-400" />
              <span>4. أشرطة أداء العطر (الثبات والفوحان العلمي)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-gray-300">درجة الثبات (Longevity):</span>
                  <span className="text-gold-300">{longevity} / 5 نجوم (حتى 48 ساعة)</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={longevity}
                  onChange={(e) => setLongevity(parseInt(e.target.value, 10))}
                  className="w-full accent-gold-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-gray-300">درجة الفوحان (Sillage):</span>
                  <span className="text-gold-300">{sillage} / 5 نجوم (شديد الانتشار)</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={sillage}
                  onChange={(e) => setSillage(parseInt(e.target.value, 10))}
                  className="w-full accent-gold-500"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Barcode & Luxury Badges */}
          <div className="bg-charcoal p-6 rounded-2xl border border-gold-500/20 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-800 pb-2">
              <h3 className="text-base font-bold text-gold-300 flex items-center gap-2">
                <Barcode className="w-4 h-4 text-gold-400" />
                <span>5. الكود الموحد والشارات والخدمات الملكية</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowLabelPrint(true)}
                className="text-xs bg-gold-500/20 text-gold-300 border border-gold-500/30 px-3 py-1 rounded-xl font-bold flex items-center gap-1 hover:bg-gold-500 hover:text-obsidian transition-all"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>معاينة ملصق العلبة</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-gray-300 font-bold mb-1">كود الباركوود الموحد (EAN-13)</label>
                <input
                  type="text"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  className="w-full bg-obsidian border border-gray-800 rounded-xl p-3 text-white font-mono focus:border-gold-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">وسام العطر في المتجر (Badge)</label>
                <select
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  className="w-full bg-obsidian border border-gray-800 rounded-xl p-3 text-white focus:border-gold-400 outline-none"
                >
                  <option value="👑 إصدار محدود">👑 إصدار محدود (Limited Edition)</option>
                  <option value="🔥 الأكثر مبيعاً">🔥 الأكثر مبيعاً (Best Seller)</option>
                  <option value="💎 حُصري VIP">💎 حُصري VIP</option>
                  <option value="🌿 طبيعي 100%">🌿 زيوت طبيعية 100%</option>
                </select>
              </div>
            </div>

            {/* Engraving & Options */}
            <div className="pt-2 flex items-center gap-6 text-xs">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-300">
                <input
                  type="checkbox"
                  checked={allowEngraving}
                  onChange={(e) => setAllowEngraving(e.target.checked)}
                  className="w-4 h-4 accent-gold-500 rounded"
                />
                <span>تفعيل خيار حفر اسم العميل بالليزر على الزجاجة</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-gold-500 via-amber-400 to-gold-600 text-obsidian font-black py-4 rounded-2xl shadow-2xl hover:brightness-110 transition-all text-sm flex items-center justify-center gap-2"
            >
              {loading ? 'جاري حفظ وحفظ العطر التفاعلي...' : 'تأكيد ونشر العطر بالمتجر الفوري ✨'}
            </button>
          </div>

        </form>

        {/* Right Column: 3D Interactive Perfume Bottle Simulator & Mobile Preview */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-charcoal p-6 rounded-3xl border border-gold-500/40 space-y-4 sticky top-24 shadow-2xl">
            
            {/* Header with 3D Toggle */}
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <span className="text-xs font-bold text-gold-300 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-gold-400 animate-spin" />
                المعاينة التفاعلية 3D Lux
              </span>
              
              <button
                type="button"
                onClick={() => setIs3DMode(!is3DMode)}
                className={`text-[10px] px-2.5 py-1 rounded-full font-bold transition-all border ${
                  is3DMode ? 'bg-gold-500 text-obsidian border-gold-400' : 'bg-gray-800 text-gray-400 border-gray-700'
                }`}
              >
                {is3DMode ? 'وضع 3D نشط 🧊' : 'عرض مسطح 2D'}
              </button>
            </div>

            {/* 3D Glass Bottle View Container */}
            <div
              onMouseMove={handleMouseMove3D}
              onMouseLeave={handleMouseLeave3D}
              className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-b from-obsidian via-gray-950 to-obsidian border border-gold-500/30 p-4 space-y-4 cursor-grab shadow-2xl transition-all"
              style={{
                perspective: '1000px',
              }}
            >
              {/* 3D Card Object */}
              <div
                className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-900 border border-gold-500/30 transition-transform duration-100 ease-out shadow-2xl"
                style={{
                  transform: is3DMode
                    ? `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`
                    : 'none',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Product Main Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mainImage}
                  alt="3D Perfume Bottle"
                  className="w-full h-full object-cover select-none"
                />

                {/* 3D Glass Light Reflection Overlay */}
                {is3DMode && (
                  <div
                    className="absolute inset-0 pointer-events-none opacity-40 bg-gradient-to-tr from-transparent via-white to-transparent transition-opacity duration-300"
                    style={{
                      transform: `translate3d(${tilt.x * 2}px, ${tilt.y * 2}px, 20px)`,
                    }}
                  />
                )}

                {/* Floating 3D Badge */}
                <span
                  className="absolute top-3 right-3 bg-gold-500 text-obsidian font-black text-[10px] px-2.5 py-1 rounded-full shadow-lg border border-gold-300"
                  style={{ transform: is3DMode ? 'translateZ(30px)' : 'none' }}
                >
                  {badge}
                </span>

                {/* Floating Concentration Label */}
                <span
                  className="absolute bottom-3 left-3 bg-obsidian/90 backdrop-blur-md text-gold-300 text-[10px] px-3 py-1 rounded-full border border-gold-500/40 font-bold"
                  style={{ transform: is3DMode ? 'translateZ(25px)' : 'none' }}
                >
                  {concentration} • {size}
                </span>
              </div>

              {/* Product Info below 3D card */}
              <div className="space-y-1 text-right">
                <span className="text-[10px] text-gold-400 font-bold block">
                  {category} • {gender}
                </span>
                <h4 className="text-sm font-black text-white line-clamp-1">
                  {name || 'اسم العطر سينشأ هنا...'}
                </h4>
                <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
                  {description || 'الوصف التسويقي للعبوة العطرية...' }
                </p>
              </div>

              {/* Price & Engraving Badge */}
              <div className="pt-3 border-t border-gray-800 flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-gray-400 block font-bold">السعر التنافسي:</span>
                  <span className="text-lg font-black text-gold-300 font-mono">
                    {numPrice} ر.س
                  </span>
                </div>
                {allowEngraving && (
                  <span className="text-[10px] bg-gold-500/20 text-gold-300 border border-gold-500/30 px-2 py-1 rounded-lg font-bold">
                    ✨ حفر بالليزر
                  </span>
                )}
              </div>

              {is3DMode && (
                <p className="text-[10px] text-center text-gray-500 italic pt-1">
                  💡 حرّك الماوس فوق الصورة لتجربة التأثير ثلاثي الأبعاد (3D Tilt & Glass Reflection)
                </p>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Bottle Label Print Modal */}
      {showLabelPrint && (
        <div className="fixed inset-0 bg-obsidian/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-charcoal border border-gold-500/40 rounded-3xl p-8 max-w-md w-full space-y-6 text-center shadow-2xl">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <h3 className="text-base font-bold text-white">معاينة ملصق العلبة الملكية</h3>
              <button onClick={() => setShowLabelPrint(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            {/* Sticker Printable Box */}
            <div className="p-6 bg-white text-black rounded-2xl border-2 border-black space-y-3 text-center">
              <h2 className="text-xl font-black">{name || 'اسم العطر'}</h2>
              <span className="text-xs font-bold border border-black px-3 py-1 rounded-full inline-block">
                ROMA LUXURY PERFUMES
              </span>
              <p className="text-[10px] text-gray-700 font-bold">{concentration} • {size}</p>
              <div className="pt-2 border-t border-gray-300">
                <span className="font-mono font-bold text-sm block">{barcode}</span>
              </div>
            </div>

            <button
              onClick={() => {
                if (typeof window !== 'undefined') window.print();
              }}
              className="w-full bg-gold-500 text-obsidian font-bold py-3 rounded-xl text-xs hover:bg-gold-400 transition-colors"
            >
              طباعة الملصق الآن
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
