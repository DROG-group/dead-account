'use client';

import { getInitials } from '@/lib/utils';

interface AvatarProps {
  name: string;
  color: string;
  size?: 'sm' | 'md' | 'lg';
  suspended?: boolean;
}

const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-12 h-12 text-sm', lg: 'w-20 h-20 text-xl' };

export function Avatar({ name, color, size = 'md', suspended }: AvatarProps) {
  return (
    <div
      className={`${sizes[size]} rounded-full flex items-center justify-center font-bold text-white shrink-0 ${suspended ? 'opacity-30 grayscale' : ''}`}
      style={{ backgroundColor: color }}
    >
      {getInitials(name)}
    </div>
  );
}
