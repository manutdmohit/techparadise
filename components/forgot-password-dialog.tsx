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
import { usePathname } from 'next/navigation';
import { Loader2, CheckCircle } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type FormData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordDialog({
  open,
  onOpenChange,
  onSignInClick,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSignInClick: () => void;
}) {
  const pathname = usePathname();
  const isCorporate = pathname === '/corporate';
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const buttonGradient = isCorporate
    ? 'from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600'
    : 'from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600';

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSuccess(true);

    // Reset form after 3 seconds and close dialog
    setTimeout(() => {
      setIsSuccess(false);
      reset();
      onOpenChange(false);
    }, 3000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Enter your email address and we'll send you a link to reset your
            password.
          </DialogDescription>
        </DialogHeader>
        {isSuccess ? (
          <div className="py-6 flex flex-col items-center text-center space-y-3">
            <CheckCircle className="h-12 w-12 text-green-500" />
            <h3 className="text-lg font-medium">Check your email</h3>
            <p className="text-sm text-zinc-400">
              We've sent a password reset link to your email address.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  {...register('email')}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className={`bg-gradient-to-r ${buttonGradient} w-full mt-2`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Reset Link'
              )}
            </Button>
            <div className="text-center text-sm text-zinc-400 mt-4">
              Remember your password?{' '}
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
        )}
      </DialogContent>
    </Dialog>
  );
}
