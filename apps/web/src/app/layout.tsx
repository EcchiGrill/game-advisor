import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Hanuman } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import { TooltipProvider } from '@/components/ui/Tooltip';
import './globals.css';

const hanuman = Hanuman({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-hanuman',
});

export const metadata: Metadata = {
  title: 'Game Advisor',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${hanuman.variable} antialiased`}>
        <TooltipProvider>
          {children}
          <ToastContainer />
        </TooltipProvider>
      </body>
    </html>
  );
}
