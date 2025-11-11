import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Alata } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import './globals.css';

const alata = Alata({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-alata',
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
      <body className={`${alata.variable} antialiased`}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
