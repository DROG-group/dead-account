'use client';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md';
}

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  const base = 'rounded font-semibold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
  const sizeClass = size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm';
  const variants = {
    primary: 'bg-accent text-white hover:bg-accent-hover',
    outline: 'bg-transparent text-accent border border-accent hover:bg-accent hover:text-white',
    danger: 'bg-danger text-white hover:opacity-80',
    ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-hover',
  };
  return (
    <button className={`${base} ${sizeClass} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
