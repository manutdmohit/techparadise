import { Button } from '@/components/ui/button';
import { LogIn, UserPlus } from 'lucide-react';
import { UserMenu } from '@/components/user-menu';
import CartDropdown from '../cart-dropdown';

export default function DesktopActions({
  user,
  openSignIn,
  openSignUp,
  buttonGradient,
  isCorporate,
}: {
  user: any;
  openSignIn: () => void;
  openSignUp: () => void;
  buttonGradient: string;
  isCorporate: boolean;
}) {
  return (
    <div className="hidden md:flex items-center gap-4">
      <CartDropdown />
      {user ? (
        <>
          <UserMenu />
          <Button size="sm" className={`bg-gradient-to-r ${buttonGradient}`}>
            {isCorporate ? 'Request Quote' : 'Shop Now'}
          </Button>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
