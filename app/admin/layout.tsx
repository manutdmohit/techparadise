'use client';

import type React from 'react';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Skip authentication check on the login page
    if (pathname === '/admin/login') {
      return;
    }

    // Redirect if not logged in
    if (!user) {
      router.push('/admin/login');
      return;
    }

    // Redirect if not an admin
    if (!user.isAdmin) {
      toast.success('Access Denied', {
        description: "You don't have permission to access the admin area.",
      });
      router.push('/');
      return;
    }
  }, [user, router, pathname, toast]);

  // Don't render the admin layout on the login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Don't render anything until we've checked authentication
  if (!user || !user.isAdmin) {
    return null;
  }

  const handleSignOut = () => {
    signOut();
    router.push('/admin/login');
    toast.success('Signed out', {
      description: 'You have been signed out of the admin area.',
    });
  };

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-white md:flex-row">
      {/* Mobile menu button */}
      <button
        className="fixed right-4 top-4 z-50 rounded-full bg-purple-600 p-2 text-white md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 transform bg-gray-800 transition-transform duration-300 ease-in-out md:relative md:translate-x-0',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-center border-b border-gray-700 p-4">
            <Link href="/admin" className="text-xl font-bold text-[#17e9e1]">
              Tech Paradise <span className="text-sm text-gray-400">Admin</span>
            </Link>
          </div>

          <nav className="flex-1 space-y-1 px-2 py-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center rounded-lg px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="mr-3 h-5 w-5 text-purple-400" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-gray-700 p-4">
            <div className="mb-2 flex items-center">
              <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center">
                {user.firstName.charAt(0)}
                {user.lastName.charAt(0)}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                className="flex items-center rounded-lg px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <Home className="mr-3 h-5 w-5 text-blue-400" />
                <span>Back to Site</span>
              </Link>
              <Button
                onClick={handleSignOut}
                variant="destructive"
                className="flex w-full items-center justify-center"
              >
                <LogOut className="mr-2 h-5 w-5" />
                <span>Sign out</span>
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}
