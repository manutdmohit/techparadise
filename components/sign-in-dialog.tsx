'use client';

import { useState } from 'react';
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
import { Checkbox } from '@/components/ui/checkbox';
import { signInSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';
import { PasswordInput } from '@/components/password-input';

type FormData = z.infer<typeof signInSchema>;

export function SignInDialog({
  open,
  onOpenChange,
  onSignUpClick,
  onForgotPasswordClick,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSignUpClick: () => void;
  onForgotPasswordClick: () => void;
}) {
  const { signIn, isLoading } = useAuth();
  const pathname = usePathname();
  const [serverError, setServerError] = useState<string | null>(null);
  const isCorporate = pathname === '/corporate';

  const buttonGradient = isCorporate
    ? 'from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600'
    : 'from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600';

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setServerError(null);
      await signIn(data.email, data.password);
      reset();
      onOpenChange(false);
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError('Invalid email or password');
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Enter your credentials to access your account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button
                  type="button"
                  variant="link"
                  onClick={() => {
                    onOpenChange(false);
                    onForgotPasswordClick();
                  }}
                  className={`text-xs text-${
                    isCorporate ? 'blue' : 'purple'
                  }-500 hover:underline`}
                >
                  Forgot password?
                </Button>
              </div>
              <PasswordInput
                id="password"
                {...register('password')}
                error={errors.password?.message}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                {...register('rememberMe')}
                className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <Label
                htmlFor="rememberMe"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-400"
              >
                Remember me
              </Label>
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
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </DialogFooter>
          <div className="text-center text-sm text-zinc-400 mt-4">
            Don&apos;t have an account?{' '}
            <button
              type="button"
              className={`text-${
                isCorporate ? 'blue' : 'purple'
              }-500 hover:underline`}
              onClick={() => {
                onOpenChange(false);
                onSignUpClick();
              }}
            >
              Sign Up
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
