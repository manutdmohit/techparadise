'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogOut, LogIn, UserPlus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import CartDropdown from '../cart-dropdown';

export default function MobileMenu({
  isOpen,
  navItems,
  user,
  onClose,
  onSignOut,
  onSignIn,
  onSignUp,
  buttonGradient,
  accentColor,
  isCorporate,
}: any) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Detect clicks outside the modal content
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose?.();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 md:hidden">
      <div
        ref={modalRef}
        className="bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800"
      >
        <div className="container py-4">
          <X
            className="h-6 w-6 text-white absolute top-2 right-2 hover:text-red-500"
            onClick={onClose}
          />
          <nav className="flex flex-col space-y-2 px-2">
            {navItems.map((item: any) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium py-2 transition-colors',
                  item.active
                    ? `text-white ${accentColor}`
                    : 'text-zinc-400 hover:text-white'
                )}
                onClick={onClose}
              >
                {item.name}
              </Link>
            ))}

            <div className="pt-2 flex flex-col space-y-2">
              <CartDropdown />
              {user ? (
                <>
                  <div className="flex items-center gap-3 border-t border-zinc-800 py-2">
                    <Image
                      src={user.avatar || '/placeholder.svg'}
                      alt={user.firstName}
                      className="h-8 w-8 rounded-full object-cover"
                      width={32}
                      height={32}
                      priority
                    />
                    <div>
                      <p className="text-sm font-medium">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-zinc-400">{user.email}</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start text-zinc-400 hover:text-white"
                    onClick={onSignIn}
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start text-zinc-400 hover:text-white"
                    onClick={onSignUp}
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Sign Up
                  </Button>
                </>
              )}
            </div>

            {user && (
              <>
                <Link
                  href="/profile"
                  className="text-sm font-medium py-2 text-zinc-400 hover:text-white"
                  onClick={onClose}
                >
                  Profile
                </Link>
                <Link
                  href="/billing"
                  className="text-sm font-medium py-2 text-zinc-400 hover:text-white"
                  onClick={onClose}
                >
                  Billing
                </Link>
                <Link
                  href="/settings"
                  className="text-sm font-medium py-2 text-zinc-400 hover:text-white"
                  onClick={onClose}
                >
                  Settings
                </Link>
                <Link
                  href="/support"
                  className="text-sm font-medium py-2 text-zinc-400 hover:text-white"
                  onClick={onClose}
                >
                  Support
                </Link>

                <Button
                  size="sm"
                  className={`bg-gradient-to-r ${buttonGradient}`}
                >
                  {isCorporate ? 'Request Quote' : 'Shop Now'}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start text-red-500 hover:text-red-400"
                  onClick={onSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
