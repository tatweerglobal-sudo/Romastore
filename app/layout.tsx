import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';
import BottomNav from '@/components/BottomNav';

export const metadata: Metadata = {
  title: 'روما للعطور الفاخرة | Roma Luxury Perfumes',
  description: 'متجر عطور فاخر يضم أنقى عطور النيش والزيوت الشرقية الملكية مع تجربة هرم عطري فريدة والشراء المباشر عبر الواتساب.',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <body className="bg-obsidian text-gray-100 min-h-screen flex flex-col font-arabic pb-20 lg:pb-0">
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <PWAInstallPrompt />
          <main className="flex-1">{children}</main>
          <BottomNav />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
