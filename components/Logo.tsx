'use client';

import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizes = {
    sm: 'w-12 h-12', // 48px
    md: 'w-20 h-20', // 80px
    lg: 'w-20 h-20', // 80px
  };

  return (
    <div className={`relative ${sizes[size]}`}>
      <Image
        src="/images/logo/logo.png"
        alt="Tech Paradise Logo"
        fill
        className="cover"
      />
    </div>
  );
}
