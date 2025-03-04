'use client';

import type React from 'react';

import { cn } from '@/lib/utils';
import { Home, Calendar, User, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface TabItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

export function BottomTabs() {
  const pathname = usePathname();

  const tabs: TabItem[] = [
    {
      icon: <Home className="h-5 w-5" />,
      label: 'Home',
      href: '/dashboard',
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: 'Events',
      href: '/events',
    },
    {
      icon: <User className="h-5 w-5" />,
      label: 'Profile',
      href: '/profile',
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: 'Settings',
      href: '/settings',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 z-40 flex h-16 w-full items-center justify-around border-t bg-background">
      {tabs.map((tab) => {
        const isActive =
          pathname === tab.href || pathname.startsWith(`${tab.href}/`);

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              'flex h-full w-full flex-col items-center justify-center space-y-1 text-xs transition-colors',
              isActive
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
