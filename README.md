# 👑 روما للعطور الفاخرة | Roma Luxury Perfumes E-Commerce Store

متجر إلكتروني فاخر متكامل لبيع عطور النيش والزيوت الشرقية الملكية، مصمم ببيئة **Next.js 14+ (App Router)** ولغة **TypeScript** وتنسيقات **Tailwind CSS** مع دعم كامل للغة العربية والاتجاه من اليمين لليسار (RTL)، ومزود بـ **لوحة تحكم إدارية شمولية** ودعم قاعدة بيانات **Prisma ORM**.

---

## ✨ المميزات الرئيسية للمتجر

### 🏬 الواجهة الأمامية للعملاء (Storefront):
- **الهوية البصرية الفاخرة:** تصميم باللون الأخضر الملكي مع لمسات ذهبية داكنة تتوافق مع أرقى الماركات العطرية العالمية.
- **الهرم العطري التفاعلي (Fragrance Notes Pyramid):** استعراض مرئي أنيق للنوتات العليا (Top Notes)، قلب العطر (Heart Notes)، وقاعدة العطر (Base Notes).
- **مؤشرات الأداء:** مقياس بياني تفاعلي يوضح الثبات (Longevity) والفوحان (Sillage).
- **مساعد العطر الذكي (Perfume Quiz):** اختبار تفاعلي من 3 أسئلة ترشح العطر المناسب لشخصية العميل فوراً.
- **السلة الجانبية السريعة (Slide-over Cart):** فتح السلة وتعديل الكميات وإضافة رسائل الإهداء فوراً.
- **إتمام الطلب السريع (One-Page Checkout):** الشراء بنقرة واحدة ودعم خيارات الدفع عند الاستلام (COD) وتقسيط تابي.
- **ضمان التجربة المرفقة:** نظام إضافة عينة تجريبية مجانية (10ml) مع كل زجاجة لضمان الاسترجاع بسهولة.
- **تتبع حالة الطلب (/track-order):** البحث برقم الطلب ورقم الهاتف للاطلاع على خط الشحن.

### 🛡️ لوحة التحكم للمسؤول (Admin Dashboard - `/admin`):
- **إحصائيات المبيعات والأرباح:** نظرة عامة على المبيعات، إجمالي الطلبات، الطلبات المعلقة، وتنبيهات المخزون المنخفض.
- **إدارة المنتجات والعطور (`/admin/products`):** إضافة وتعديل وحذف العطور مع تحديد تفاصيل الهرم العطري والمخزون.
- **إدارة الطلبات (`/admin/orders`):** تغيير حالة الشحن (معالجة، جاري التغليف، تم الشحن، تم التوصيل) وقراءة كروت الإهداء لطباعتها.

---

## 🛠️ البنية التقنية (Tech Stack)

- **Framework:** Next.js 14.2+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Lucide Icons + Google Tajawal Font
- **ORM:** Prisma ORM
- **Database:** SQLite (افتراضي للتطوير المحلي المباشر) / وسهل التحويل لـ PostgreSQL أو Supabase.
- **State Management:** React Context API

---

## 🚀 طريقة التثبيت والتشغيل المحلي (Local Setup)

### 1. استنساخ المستودع وتثبيت المكتبات:
```bash
git clone https://github.com/your-username/roma-perfume-store.git
cd roma-perfume-store
npm install
```

### 2. إعداد قاعدة البيانات واستزراع البيانات المبدئية (Seed Data):
```bash
# إنشاء الجداول في قاعدة البيانات المحلية SQLite
npx prisma db push

# إدخال عطور النيش الفاخرة والطلبات المبدئية
npx prisma db seed
```

### 3. تشغيل خادم التطوير:
```bash
npm run dev
```
افتح المتصفح على [http://localhost:3000](http://localhost:3000) لاستعراض المتجر، وعلى [http://localhost:3000/admin](http://localhost:3000/admin) لدخول لوحة التحكم.

---

## 🌐 خطوات الرفع على GitHub و Vercel

1. **إنشاء مستودع جديد على GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Luxury Perfume Store"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/roma-perfume-store.git
   git push -u origin main
   ```

2. **الربط مع Vercel:**
   - توجه إلى منصة [Vercel](https://vercel.com).
   - قم باستيراد (Import) مستودع `roma-perfume-store`.
   - اضغط **Deploy** وسيتم نشر المتجر مجاناً وبضغطة زر واحدة!

---

## 📄 الترخيص (License)
هذا المشروع متاح بموجب ترخيص [MIT License](LICENSE).
