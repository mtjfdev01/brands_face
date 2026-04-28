import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import TawkToScript from '@/components/TawkToScript';
import WhatsAppChatFab from '@/components/WhatsAppChatFab';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Brands Face | Packaging Re-Engineering & Manufacturing Firm',
  description:
    'BrandsFace is a packaging re-engineering and manufacturing firm helping businesses transform their product packaging into a powerful branding and sales asset.',
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
      <body className={inter.className}>
        {children}
        <TawkToScript />
        <WhatsAppChatFab />
      </body>
    </html>
  );
}
