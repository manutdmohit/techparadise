import Link from 'next/link';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  href: string;
  active?: boolean;
}

export default function NavLinks({ navItems }: { navItems: NavItem[] }) {
  return (
    <nav className="hidden md:flex gap-6">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            'text-sm font-medium transition-colors',
            item.active ? 'text-white' : 'text-zinc-400 hover:text-white'
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
