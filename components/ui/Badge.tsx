'use client';

interface BadgeProps {
  variant?: 'default' | 'evidence' | 'quest' | 'danger';
  children: React.ReactNode;
}

const variants = {
  default: 'bg-bg-elevated text-text-secondary',
  evidence: 'bg-evidence/20 text-evidence',
  quest: 'bg-accent/20 text-accent',
  danger: 'bg-danger/20 text-danger',
};

export function Badge({ variant = 'default', children }: BadgeProps) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}
