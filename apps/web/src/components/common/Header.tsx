'use client';

import Image from 'next/image';
import { Button } from '../ui/Button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/Avatar';

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
  const { data: session } = useSession();

  return (
    <div className="flex justify-between items-center h-20 bg-black px-8">
      <Link href={'/'}>
        <Image src="/logo.png" alt="Game Advisor" width={100} height={40} />
      </Link>
      <div className="flex gap-3 items-center">
        {routes.map((route) => (
          <Button
            key={route.href}
            variant={'link'}
            className="hover:no-underline"
          >
            <Link
              href={route.href}
              className={cn(
                'text-lg',
                pathname === route.href
                  ? 'font-semibold'
                  : 'font-light hover:scale-95 transition-transform duration-200'
              )}
            >
              {route.label}
            </Link>
          </Button>
        ))}
      </div>

      {session?.user ? (
        <Link href={'/profile'}>
          <Avatar className="w-full h-10">
            <AvatarImage
              src={session.user.avatarUrl ?? ''}
              alt={session.user.username}
            />
            <AvatarFallback className="font-bold">
              {session.user.username}
            </AvatarFallback>
          </Avatar>
        </Link>
      ) : (
        <div className="flex gap-3 items-center">
          <Button asChild variant={'outline'}>
            <Link href={'/sign-up'}>Sign up</Link>
          </Button>
          <Button variant={'secondary'} asChild>
            <Link href={'/sign-in'}>Sign in</Link>
          </Button>
        </div>
      )}
    </div>
  );
};
