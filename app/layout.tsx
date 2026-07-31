import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ShopKeeper | Build Stunning Online Stores',
  description: 'The all-in-one platform with 3D product viewers, real-time analytics, and beautiful storefronts.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased min-h-screen selection:bg-brand-purple/50 selection:text-white bg-[#0a0a1a] text-slate-50`}>
        {children}
      </body>
    </html>
  );
}
