import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import TawkToScript from '@/components/TawkToScript';
import WhatsAppChatFab from '@/components/WhatsAppChatFab';
import SiteHeader from '@/components/nav/SiteHeader';
import MobileQuoteTab from '@/components/nav/MobileQuoteTab';
import NavigationLoader from '@/components/common/NavigationLoader';
import { homeShareMetadata, siteOrigin } from '@/lib/seo';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-playfair',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin()),
  ...homeShareMetadata(),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${playfair.variable}`}>
        <NavigationLoader />
        <SiteHeader />
        {children}
        <TawkToScript />
        <WhatsAppChatFab />
        <MobileQuoteTab />
      </body>
    </html>
  );
}
