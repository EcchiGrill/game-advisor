import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Hanuman } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import { TooltipProvider } from '@/components/ui/Tooltip';
import { ApolloProvider } from 'game-advisor_network';
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
        <ApolloProvider>
          <TooltipProvider>
            {children}
            <ToastContainer />
          </TooltipProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
