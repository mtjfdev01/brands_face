import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import TawkToScript from '@/components/TawkToScript';
import WhatsAppChatFab from '@/components/WhatsAppChatFab';
import SiteHeader from '@/components/nav/SiteHeader';
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
    icon: '/assets/images/logos/logo_x.png',
    shortcut: '/assets/images/logos/logo_x.png',
    apple: '/assets/images/logos/logo_x.png',
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
        <SiteHeader />
        {children}
        <TawkToScript />
        <WhatsAppChatFab />
      </body>
    </html>
  );
}
