'use client';

import { cn } from '@/lib/utils';

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  // Calculate password strength
  const getStrength = (password: string): number => {
    let strength = 0;

    // Length check
    if (password.length >= 8) strength += 1;

    // Character variety checks
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    return strength;
  };

  const strength = getStrength(password);

  // Get appropriate label and color based on strength
  const getLabel = (strength: number): string => {
    if (password.length === 0) return 'Password strength';
    if (strength <= 2) return 'Weak';
    if (strength <= 4) return 'Medium';
    return 'Strong';
  };

  const getColor = (strength: number): string => {
    if (password.length === 0) return 'bg-zinc-700';
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <p className="text-xs text-zinc-400">{getLabel(strength)}</p>
        <p className="text-xs text-zinc-400">
          {password.length > 0 ? `${strength}/5` : ''}
        </p>
      </div>
      <div className="h-1.5 w-full bg-zinc-700 rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full transition-all duration-300',
            getColor(strength)
          )}
          style={{ width: `${(strength / 5) * 100}%` }}
        />
      </div>
    </div>
  );
}
