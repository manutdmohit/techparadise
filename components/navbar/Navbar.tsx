'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

import Logo from './Logo';
import NavLinks from './NavLinks';
import DesktopActions from './DesktopActions';
import MobileMenu from './MobileMenu';
import Dialogs from './Dialogs';

import { useAuth } from '@/contexts/auth-context';
import CartDropdown from '../cart-dropdown';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signInDialogOpen, setSignInDialogOpen] = useState(false);
  const [signUpDialogOpen, setSignUpDialogOpen] = useState(false);
  const [forgotPasswordDialogOpen, setForgotPasswordDialogOpen] =
    useState(false);

  const { user, signOut } = useAuth();

  const isGaming = pathname === '/gaming';
  const isCorporate = pathname === '/corporate';

  const accentColor = isCorporate ? 'text-blue-500' : 'text-purple-500';
  const buttonGradient = isCorporate
    ? 'from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600'
    : 'from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600';

  const navItems = [
    { name: 'Gaming', href: '/gaming', active: isGaming },
    { name: 'Corporate', href: '/corporate', active: isCorporate },
    { name: 'Products', href: '/products' },
    { name: 'Support', href: '/support' },

    { name: 'Solutions', href: '/solutions' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-primary backdrop-blur-sm">
      <div className="container flex h-auto items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-xl font-bold tracking-wider text-[#17e9e1]">
            TECH PARADISE
          </span>
        </Link>

        <NavLinks navItems={navItems} />

        <div className="flex md:hidden">
          <CartDropdown />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </Button>
        </div>

        <DesktopActions
          user={user}
          openSignIn={() => setSignInDialogOpen(true)}
          openSignUp={() => setSignUpDialogOpen(true)}
          buttonGradient={buttonGradient}
          isCorporate={isCorporate}
        />
      </div>

      <MobileMenu
        isOpen={mobileMenuOpen}
        navItems={navItems}
        user={user}
        onClose={() => setMobileMenuOpen(false)}
        onSignOut={signOut}
        onSignIn={() => {
          setSignInDialogOpen(true);
          setMobileMenuOpen(false);
        }}
        onSignUp={() => {
          setSignUpDialogOpen(true);
          setMobileMenuOpen(false);
        }}
        buttonGradient={buttonGradient}
        accentColor={accentColor}
        isCorporate={isCorporate}
      />

      <Dialogs
        signInOpen={signInDialogOpen}
        signUpOpen={signUpDialogOpen}
        forgotOpen={forgotPasswordDialogOpen}
        setSignInOpen={setSignInDialogOpen}
        setSignUpOpen={setSignUpDialogOpen}
        setForgotOpen={setForgotPasswordDialogOpen}
      />
    </header>
  );
}
