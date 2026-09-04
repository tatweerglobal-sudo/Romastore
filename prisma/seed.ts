import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed for Roma Luxury Perfumes...');

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();

  const products = [
    {
      name: 'روما نيش - عود الملكية (Roma Royal Oud)',
      slug: 'roma-royal-oud',
      description: 'تحفة عطرية استثنائية تجسد الفخامة والأصالة. يفتتح العطر بنفحات الهيل التوابلي الفاخر، ثم ينبض بقلب من الورد الجوري وحب الهيل، ويستقر على قاعدة ثرية من العود الكمبودي المعتق والعنبر الشمسي الذي يدوم لأيام.',
      price: 680,
      discountPrice: 520,
      stock: 15,
      size: '100ml',
      concentration: 'Extrait de Parfum',
      gender: 'للجنسين',
      category: 'عطور نيش',
      topNotes: 'برغموت إيطالي, هيل غواتيمالي, فلفل وردي',
      heartNotes: 'ورد جوري نقي, زعفران إيراني, بخور ملكي',
      baseNotes: 'عود كمبودي معتق, عنبر كهروماني, مسك أبيض, خشب الصندل',
      longevity: 5,
      sillage: 5,
      images: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop,https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop',
      isFeatured: true,
    },
    {
      name: 'إكسير المخمل الذهبي (Velvet Amber Elixir)',
      slug: 'velvet-amber-elixir',
      description: 'عطر دافئ وساحر يغلفك بلمسة مخملية ناعمة. يمتزج فيه العنبر الذهبي بالفانيليا المدغشقرية مع لمسات خفيفة من التبغ الفاخر ليعطيك حضوراً لا يُنسى في المناسبات الرسمية والأمسيات.',
      price: 540,
      discountPrice: 450,
      stock: 22,
      size: '100ml',
      concentration: 'Eau de Parfum',
      gender: 'للجنسين',
      category: 'عطور شرقية',
      topNotes: 'قرفة Ceylon, جوزة الطيب, برتقال صقلي',
      heartNotes: 'عنبر دافئ, زهرة اللابدانوم, تبغ ناعم',
      baseNotes: 'فانيليا مدغشقر, خشب الأرز, مسك بلوري',
      longevity: 5,
      sillage: 4,
      images: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop,https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop',
      isFeatured: true,
    },
    {
      name: 'سولاريس الأخضر - زهر الإمبراطورة (Empress Rose Solaris)',
      slug: 'empress-rose-solaris',
      description: 'باقة من أنقى الأزهار النادرة والمقطوفة في الفجر. ينساب بنعومة وأنوثة مفرطة بفضل الورد الدمشقي، مع نغمات من الكُمثرى المنعشة والمسك النقي الناصع.',
      price: 490,
      discountPrice: null,
      stock: 18,
      size: '100ml',
      concentration: 'Eau de Parfum',
      gender: 'نسائي',
      category: 'عطور نيش',
      topNotes: 'كُمثرى فرنسية, برغموت, ليشي زهرية',
      heartNotes: 'ورد دمشقي, زنبق الوادي, الفاوانيا الناعمة',
      baseNotes: 'مسك نقي, خشب الكشمير, عنبر خفيف',
      longevity: 4,
      sillage: 4,
      images: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=800&auto=format&fit=crop,https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop',
      isFeatured: true,
    },
    {
      name: 'نوكتا الفضي - ليل روما (Roma Nocturne Silver)',
      slug: 'roma-nocturne-silver',
      description: 'تجسيد للانتعاش والجرأة والرجولة العصرية. تركيبة خشبية أروماتك تفتتح بنفحات الليمون والجريب فروت، وتتحول إلى قلب من النعناع والميرمية، وتستقر على قاعدة صلبة من نجيل الهند وخشب الصندل.',
      price: 460,
      discountPrice: 390,
      stock: 25,
      size: '100ml',
      concentration: 'Eau de Parfum',
      gender: 'رجالي',
      category: 'عطور نيش',
      topNotes: 'جريب فروت, ليمون كالابريا, فلفل أسود',
      heartNotes: 'نعناع بستاني, ميرمية, زنجبيل حار',
      baseNotes: 'نجيل الهند, خشب الأرز, الباتشولي',
      longevity: 4,
      sillage: 5,
      images: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop,https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop',
      isFeatured: false,
    },
    {
      name: 'مجموعة التوزيعات العطرية الملكية (Royal Collection Box)',
      slug: 'royal-collection-box',
      description: 'صندوق هدايا فاخر يحتوي على 3 عطور مصغرة بحجم 30 مل من أكثر عطورنا مبيعاً، ملفوفة ببطاقة إهداء مخصصة ومصممة بأقصى درجات الفخامة.',
      price: 890,
      discountPrice: 720,
      stock: 10,
      size: '3x30ml',
      concentration: 'Extrait de Parfum',
      gender: 'للجنسين',
      category: 'مجموعات فاخرة',
      topNotes: 'مزيج متنوع من الحمضيات والتوابل الفاخرة',
      heartNotes: 'أزهار نادر وزعفران وعنبر',
      baseNotes: 'عود ملكي وخشب الصندل ومسك أبيض',
      longevity: 5,
      sillage: 5,
      images: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=800&auto=format&fit=crop,https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop',
      isFeatured: true,
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  // Sample Order
  const sampleProduct = await prisma.product.findFirst();

  if (sampleProduct) {
    await prisma.order.create({
      data: {
        orderNumber: 'ROMA-9842',
        customerName: 'أحمد الإبراهيمي',
        customerPhone: '0501234567',
        address: 'شارع التخصصي, حي العليا',
        city: 'الرياض',
        totalAmount: sampleProduct.price,
        paymentMethod: 'COD',
        status: 'DELIVERED',
        giftMessage: 'إلى صديقي العزيز بمناسبة الترقية، اتمنى لك التوفيق دائماً.',
        includeSample: true,
        items: {
          create: [
            {
              productId: sampleProduct.id,
              quantity: 1,
              price: sampleProduct.price,
            },
          ],
        },
      },
    });

    await prisma.order.create({
      data: {
        orderNumber: 'ROMA-9843',
        customerName: 'سارة المنصور',
        customerPhone: '0559876543',
        address: 'طريق الملك فهد, حي الشاطئ',
        city: 'جدة',
        totalAmount: 1180,
        paymentMethod: 'Card',
        status: 'PENDING',
        giftMessage: 'عيد ميلاد سعيد يا غالية ❤️',
        includeSample: true,
        items: {
          create: [
            {
              productId: sampleProduct.id,
              quantity: 2,
              price: sampleProduct.price,
            },
          ],
        },
      },
    });
  }

  console.log('✅ Seed completed successfully! Added luxury products and sample orders.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
