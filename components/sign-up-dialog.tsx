'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/auth-context';
import { usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { signUpSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';
import { PasswordInput } from '@/components/password-input';
import { PasswordStrength } from '@/components/password-strength';

type FormData = z.infer<typeof signUpSchema>;

export function SignUpDialog({
  open,
  onOpenChange,
  onSignInClick,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSignInClick: () => void;
}) {
  const { signUp, isLoading } = useAuth();
  const pathname = usePathname();
  const isCorporate = pathname === '/corporate';
  const [serverError, setServerError] = useState<string | null>(null);
  const [password, setPassword] = useState('');

  const buttonGradient = isCorporate
    ? 'from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600'
    : 'from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600';

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
  });

  // Watch the password field for the strength indicator
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'password') {
        setPassword(value.password || '');
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data: FormData) => {
    try {
      setServerError(null);
      await signUp(data.firstName, data.lastName, data.email, data.password);
      reset();
      onOpenChange(false);
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError('An unexpected error occurred');
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle>Create an account</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Enter your information to create a new account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  {...register('firstName')}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
                {errors.firstName && (
                  <p className="text-xs text-red-500">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  {...register('lastName')}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
                {errors.lastName && (
                  <p className="text-xs text-red-500">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                id="password"
                {...register('password')}
                error={errors.password?.message}
              />
              <PasswordStrength password={password} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <PasswordInput
                id="confirmPassword"
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
              />
            </div>
            {serverError && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-3 py-2 rounded-md text-sm">
                {serverError}
              </div>
            )}
          </div>
          <DialogFooter className="flex-col gap-2">
            <Button
              type="submit"
              disabled={isLoading}
              className={`bg-gradient-to-r ${buttonGradient} w-full`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
          </DialogFooter>
          <div className="text-center text-sm text-zinc-400">
            Already have an account?{' '}
            <button
              type="button"
              className={`text-${
                isCorporate ? 'blue' : 'purple'
              }-500 hover:underline`}
              onClick={() => {
                onOpenChange(false);
                onSignInClick();
              }}
            >
              Sign In
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
