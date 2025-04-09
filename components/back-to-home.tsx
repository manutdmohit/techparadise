'use client';

import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BackToHome() {
  const pathname = usePathname();
  const isCorporate = pathname === '/corporate';
  const buttonGradient = isCorporate
    ? 'from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600'
    : 'from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600';

  if (pathname === '/') return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link href="/">
        <Button
          size="icon"
          className={`rounded-full h-12 w-12 shadow-lg bg-gradient-to-r ${buttonGradient}`}
          aria-label="Back to home"
        >
          <Home className="h-5 w-5" />
        </Button>
      </Link>
    </div>
  );
}
