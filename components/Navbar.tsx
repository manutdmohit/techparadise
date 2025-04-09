'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X, LogIn, LogOut, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Logo from '@/components/Logo';
import { useAuth } from '@/contexts/auth-context';
import { UserMenu } from '@/components/user-menu';
import { SignInDialog } from '@/components/sign-in-dialog';
import { SignUpDialog } from '@/components/sign-up-dialog';
import { ForgotPasswordDialog } from '@/components/forgot-password-dialog';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signInDialogOpen, setSignInDialogOpen] = useState(false);
  const [signUpDialogOpen, setSignUpDialogOpen] = useState(false);
  const [forgotPasswordDialogOpen, setForgotPasswordDialogOpen] =
    useState(false);

  const { user, signOut } = useAuth();

  // Determine if we're on the gaming or corporate page to adjust styling
  const isGaming = pathname === '/gaming';
  const isCorporate = pathname === '/corporate';

  // Adjust accent color based on current page
  const accentColor = isCorporate ? 'text-blue-500' : 'text-purple-500';
  const buttonGradient = isCorporate
    ? 'from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600'
    : 'from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600';

  const navItems = [
    { name: 'Gaming', href: '/gaming', active: isGaming },
    { name: 'Corporate', href: '/corporate', active: isCorporate },
    {
      name:
        pathname === '/' ? 'Products' : isGaming ? 'Customize' : 'Solutions',
      href: '#',
    },
    { name: 'Support', href: '#' },
    {
      name: pathname === '/' ? 'About' : isGaming ? 'Blog' : 'Contact',
      href: '#',
    },
  ];

  const handleSignOut = () => {
    signOut();
    setMobileMenuOpen(false);
  };

  const openSignIn = () => {
    setSignUpDialogOpen(false);
    setForgotPasswordDialogOpen(false);
    setSignInDialogOpen(true);
  };

  const openSignUp = () => {
    setSignInDialogOpen(false);
    setForgotPasswordDialogOpen(false);
    setSignUpDialogOpen(true);
  };

  const openForgotPassword = () => {
    setSignInDialogOpen(false);
    setSignUpDialogOpen(false);
    setForgotPasswordDialogOpen(true);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-primary backdrop-blur-sm">
      <div className="container flex h-auto items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Logo size="md" />
            <span className="text-xl font-bold tracking-wider text-[#17e9e1]">
              TECH PARADISE
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
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

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
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

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <UserMenu />
              <Button
                size="sm"
                className={`bg-gradient-to-r ${buttonGradient}`}
              >
                {isCorporate ? 'Request Quote' : 'Shop Now'}
              </Button>
            </>
          ) : (
            <>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-zinc-400 hover:text-white flex items-center gap-2 cursor-pointer"
                  onClick={openSignIn}
                >
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-zinc-400 hover:text-white flex items-center gap-2 cursor-pointer"
                  onClick={openSignUp}
                >
                  <UserPlus className="h-4 w-4" />
                  Sign Up
                </Button>
                <Button
                  size="sm"
                  className={`bg-gradient-to-r ${buttonGradient} cursor-pointer`}
                >
                  {isCorporate ? 'Request Quote' : 'Shop Now'}
                </Button>
              </div>
            </>
          )}{' '}
        </div>
      </div>
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800">
          <div className="container py-4">
            <nav className="flex flex-col space-y-4 px-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium py-2 transition-colors',
                    item.active
                      ? `text-white ${accentColor}`
                      : 'text-zinc-400 hover:text-white'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 flex flex-col space-y-2">
                {user ? (
                  <>
                    <div className="flex items-center justify-between py-2 border-t border-zinc-800">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full overflow-hidden">
                          <img
                            src={
                              user.avatar ||
                              '/placeholder.svg?height=32&width=32'
                            }
                            alt={`${user.firstName} ${user.lastName}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-xs text-zinc-400">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="justify-start text-red-500 hover:text-red-400"
                      onClick={handleSignOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="justify-start text-zinc-400 hover:text-white"
                      onClick={() => {
                        setSignInDialogOpen(true);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign In
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="justify-start text-zinc-400 hover:text-white"
                      onClick={() => {
                        setSignUpDialogOpen(true);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      Sign Up
                    </Button>
                  </>
                )}
                <Button
                  size="sm"
                  className={`bg-gradient-to-r ${buttonGradient}`}
                >
                  {isCorporate ? 'Request Quote' : 'Shop Now'}
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Sign In Dialog */}
      <SignInDialog
        open={signInDialogOpen}
        onOpenChange={setSignInDialogOpen}
        onSignUpClick={openSignUp}
        onForgotPasswordClick={openForgotPassword}
      />

      {/* Sign Up Dialog */}
      <SignUpDialog
        open={signUpDialogOpen}
        onOpenChange={setSignUpDialogOpen}
        onSignInClick={openSignIn}
      />

      {/* Forgot Password Dialog */}
      <ForgotPasswordDialog
        open={forgotPasswordDialogOpen}
        onOpenChange={setForgotPasswordDialogOpen}
        onSignInClick={openSignIn}
      />
    </header>
  );
}
