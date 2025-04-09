import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import BackToHome from '@/components/back-to-home';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/contexts/auth-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TECH PARADISE - Premium Computing Solutions',
  description:
    'Custom-built high-performance PCs and enterprise solutions with premium components and expert craftsmanship.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <BackToHome />
        </AuthProvider>
      </body>
    </html>
  );
}
