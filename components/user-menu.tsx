'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { LogOut, Settings, User, CreditCard, HelpCircle } from 'lucide-react';
import Image from 'next/image';

export function UserMenu() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isCorporate = pathname === '/corporate';
  const [isHovered, setIsHovered] = useState(false);

  if (!user) return null;

  const handleSignOut = () => {
    signOut();
    setIsHovered(false);
  };

  const menuItems = [
    { label: 'Profile', icon: User, path: '/profile' },
    { label: 'Billing', icon: CreditCard, path: '/billing' },
    { label: 'Settings', icon: Settings, path: '/settings' },
    { label: 'Support', icon: HelpCircle, path: '/support' },
  ];

  const iconClass = isCorporate ? 'text-blue-500' : 'text-purple-500';

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsHovered(false);
  };

  return (
    <>
      {/* Desktop Menu */}
      <div
        className="relative hidden md:block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Button variant="ghost" className="h-10 w-10 rounded-full p-0">
          <Image
            src={user.avatar || '/placeholder.svg?height=40&width=400'}
            alt={`${user.firstName} ${user.lastName}`}
            width={40}
            height={40}
            className="rounded-full object-cover border-2 border-zinc-800 shadow-md"
            priority
          />
        </Button>

        {isHovered && (
          <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-zinc-900 border border-zinc-800 text-white z-50">
            <div className="p-2">
              <div className="px-2 py-1.5 text-sm font-semibold">
                <p className="text-sm font-medium">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-zinc-400 truncate">{user.email}</p>
              </div>
              <div className="h-px bg-zinc-800 my-1 -mx-1" />

              {menuItems.map(({ label, icon: Icon, path }) => (
                <button
                  key={label}
                  onClick={() => handleNavigate(path)}
                  className="flex w-full items-center rounded-sm px-2 py-1.5 text-sm hover:bg-zinc-800"
                >
                  <Icon className={`mr-2 h-4 w-4 ${iconClass}`} />
                  <span>{label}</span>
                </button>
              ))}

              <div className="h-px bg-zinc-800 my-1 -mx-1" />
              <button
                className="flex w-full items-center rounded-sm px-2 py-1.5 text-sm hover:bg-zinc-800 text-red-500"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu (Sheet) */}
      <div className="block md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="h-10 w-10 rounded-full p-0">
              <Image
                src={user.avatar || '/placeholder.svg?height=40&width=40'}
                alt={`${user.firstName} ${user.lastName}`}
                width={40}
                height={40}
                className="rounded-full object-cover border-2 border-zinc-800"
              />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-zinc-900 text-white w-72">
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src={user.avatar || '/placeholder.svg?height=40&width=40'}
                alt={`${user.firstName} ${user.lastName}`}
                width={40}
                height={40}
                className="rounded-full border-2 border-zinc-800"
              />
              <div>
                <p className="text-sm font-medium">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-zinc-400">{user.email}</p>
              </div>
            </div>

            {/* User Action Links */}
            {/* <div className="space-y-1 border-t border-zinc-800 pt-4">
              {menuItems.map(({ label, icon: Icon, path }) => (
                <Button
                  key={label}
                  onClick={() => handleNavigate(path)}
                  className="flex w-full items-center px-3 py-2 text-sm rounded hover:bg-zinc-800"
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {label}
                </Button>
              ))}
            </div> */}

            {/* User Action Links */}
            <div className="space-y-1 border-t border-zinc-800 pt-4">
              <button
                onClick={() => handleNavigate('/profile')}
                className="flex w-full items-center px-3 py-2 text-sm rounded hover:bg-zinc-800"
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </button>
              <button
                onClick={() => handleNavigate('/billing')}
                className="flex w-full items-center px-3 py-2 text-sm rounded hover:bg-zinc-800"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Billing
              </button>
              <button
                onClick={() => handleNavigate('/settings')}
                className="flex w-full items-center px-3 py-2 text-sm rounded hover:bg-zinc-800"
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </button>
              <button
                onClick={() => handleNavigate('/support')}
                className="flex w-full items-center px-3 py-2 text-sm rounded hover:bg-zinc-800"
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                Support
              </button>
            </div>

            {/* Sign Out */}
            <div className="mt-4 border-t border-zinc-800 pt-4">
              <button
                onClick={handleSignOut}
                className="flex w-full items-center px-3 py-2 text-sm text-red-500 rounded hover:bg-zinc-800"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign up
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
