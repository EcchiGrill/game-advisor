'use client';

import Image from 'next/image';
import { Button } from '../ui/Button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const routes = [
  {
    href: '/',
    label: 'AI Advisor',
  },
  {
    href: '/catalog',
    label: 'Catalog',
  },
  {
    href: '/about',
    label: 'About',
  },
  {
    href: '/support',
    label: 'Support',
  },
];

export const Header = () => {
  const pathname = usePathname();

  return (
    <div className="flex justify-between items-center h-20 bg-black px-8">
      <Link href={'/'}>
        <Image src="/logo.png" alt="Game Advisor" width={100} height={40} />
      </Link>
      <div className="flex gap-3 items-center">
        {routes.map((route) => (
          <Button variant={'link'}>
            <Link
              href={route.href}
              className={cn(
                'text-lg',
                pathname === route.href ? 'font-normal' : 'font-thin'
              )}
            >
              {route.label}
            </Link>
          </Button>
        ))}
      </div>
      <div className="flex gap-2 items-center">
        <Button asChild variant={'outline'}>
          <Link href={'/sign-up'}>Sign up</Link>
        </Button>
        <Button variant={'secondary'} asChild>
          <Link href={'/sign-in'}>Sign in</Link>
        </Button>
      </div>
    </div>
  );
};
