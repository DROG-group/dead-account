'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGame } from '@/contexts/GameContext';

const navItems = [
  { href: '/feed', label: 'Feed', icon: '\ud83c\udfe0' },
  { href: '/messages', label: 'DMs', icon: '\u2709\ufe0f' },
  { href: '/evidence', label: 'Evidence', icon: '\ud83d\udccc' },
  { href: '/quest', label: 'Quest', icon: '\ud83d\udcdd' },
];

export function MobileNav() {
  const pathname = usePathname();
  const { state } = useGame();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-bg-surface border-t border-border flex z-40">
      {navItems.map(item => {
        const active = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex-1 flex flex-col items-center py-2 text-xs no-underline transition-colors ${
              active ? 'text-accent' : 'text-text-muted'
            }`}
          >
            <span className="text-lg relative">
              {item.icon}
              {item.href === '/evidence' && state.collectedEvidence.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-evidence text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {state.collectedEvidence.length}
                </span>
              )}
            </span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
