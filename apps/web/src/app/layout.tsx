import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Hanuman } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import { TooltipProvider } from '@/components/ui/Tooltip';
import { ApolloProvider } from 'game-advisor_network';
import './globals.css';
import { SessionProvider } from '@/providers/SessionProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/constants/authConfig';
import { TokenProvider } from '@/providers/TokenProvider';
import { Header } from '@/components/common/Header';

const hanuman = Hanuman({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-hanuman',
});

export const metadata: Metadata = {
  title: 'Game Advisor',
  description:
    'AI-powered assistant that helps you find the right game faster, with less scrolling and more playing',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${hanuman.variable} antialiased`}>
        <TooltipProvider>
          <SessionProvider session={session}>
            <TokenProvider>
              <ApolloProvider>
                <Header />
                {children}
                <ToastContainer />
              </ApolloProvider>
            </TokenProvider>
          </SessionProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
