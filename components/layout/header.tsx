import type React from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title: string;
  className?: string;
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
}

export function Header({
  title,
  className,
  rightElement,
  leftElement,
}: HeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b bg-background px-4',
        className,
      )}
    >
      <div className="flex items-center">{leftElement}</div>
      <h1 className="text-lg font-semibold">{title}</h1>
      <div className="flex items-center">{rightElement}</div>
    </header>
  );
}
