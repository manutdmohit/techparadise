'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Zap } from 'lucide-react';

export default function Footer({ simplified = false }) {
  const pathname = usePathname();
  const isCorporate = pathname === '/corporate';
  const accentColor = isCorporate ? 'text-blue-500' : 'text-purple-500';

  // Full footer implementation would go here
  // This would be the full footer from the gaming and corporate pages
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-12 pb-8 px-2">
      <div className="container mx-auto">
        {/* Footer content would go here */}
        <div className=" border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-zinc-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Tech Paradise. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-zinc-500 text-sm hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-zinc-500 text-sm hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-zinc-500 text-sm hover:text-white transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
