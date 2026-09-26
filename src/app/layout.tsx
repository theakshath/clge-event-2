import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'UniVerse 3D — Your Campus. Reimagined.',
  description: 'Minimalist interactive 3D campus web application. Visually explore digital campus landmarks, discover upcoming events, and navigate with AI campus assistant.',
  keywords: ['Campus 3D', 'Interactive Map', 'University Tech', 'UniVerse', 'React Three Fiber', 'Next.js 3D'],
  authors: [{ name: 'UniVerse Team' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
