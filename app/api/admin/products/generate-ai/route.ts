import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, category, gender } = await req.json();

    if (!name) {
      return NextResponse.json({ success: false, error: 'Name is required' }, { status: 400 });
    }

    const descriptions = [
      `تحفة عطرية استثنائية من دار روما للعطور الفاخرة. يمتزج فيها العود المعتق بنفحات البرغموت والياسمين ليعطيك حضوراً ملوكياً مهيباً يدوم طوال اليوم.`,
      `عبير ملكي نادر يجسد الأناقة والرفاهية المطلقة. صُمم خصيصاً لنخبة عشاق عطور النيش الباحثين عن التميز والفوحان الباهر.`,
      `مزيج ساحر يجمع بين الدفء الشرقي والأنفاس الفرنسية الراقية. عطر يستحضر الذكريات الثمينة ويترك أثراً عطرياً لا يُنسى.`,
    ];

    const randomDesc = descriptions[Math.floor(Math.random() * descriptions.length)];

    const topNotesOptions = [
      'برغموت إيطالي, فلفل وردي, هيل غواتيمالي',
      'زعفران إيراني, زعتر بري, ليمون صقلي',
      'تفاح غرافتون, خزامى برية, نيرولي نقي',
    ];

    const heartNotesOptions = [
      'ياسمين ملكي, ورد جوري طائفي, جوزة الطيب',
      'عنبر كبد الحوت, إبرة الراعي, زنبق الوادي',
      'أخشاب الكشمير, بخور المعتق, جيرانيوم',
    ];

    const baseNotesOptions = [
      'عود كمبودي معتق, خشب الصندل الإندونيسي, مسك فاخر',
      'عنبر دافئ, تين معتق, فانيليا مادغشقر',
      'جلد فاخر, أرز أطلسي, مسك غزال أسود',
    ];

    const topNotes = topNotesOptions[Math.floor(Math.random() * topNotesOptions.length)];
    const heartNotes = heartNotesOptions[Math.floor(Math.random() * heartNotesOptions.length)];
    const baseNotes = baseNotesOptions[Math.floor(Math.random() * baseNotesOptions.length)];

    return NextResponse.json({
      success: true,
      description: randomDesc,
      topNotes,
      heartNotes,
      baseNotes,
      longevity: 5,
      sillage: 5,
      suggestedPrice: 350,
      suggestedCost: 80,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to generate AI formulation' }, { status: 500 });
  }
}
