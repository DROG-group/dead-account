'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGame } from '@/contexts/GameContext';

const navItems = [
  { href: '/feed', label: 'Feed', icon: '\ud83c\udfe0' },
  { href: '/messages', label: 'Messages', icon: '\u2709\ufe0f' },
  { href: '/evidence', label: 'Evidence', icon: '\ud83d\udccc' },
  { href: '/quest', label: 'Quest Log', icon: '\ud83d\udcdd' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { state } = useGame();

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 border-r border-border bg-bg-surface p-4">
      <Link href="/feed" className="flex items-center gap-2 mb-8 no-underline hover:no-underline">
        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold text-lg">
          Z
        </div>
        <div>
          <div className="font-bold text-text-primary text-sm">zuidhaven.social</div>
          <div className="text-text-muted text-xs">Investigation Mode</div>
        </div>
      </Link>

      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(item => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium no-underline transition-colors ${
                active
                  ? 'bg-accent/15 text-accent'
                  : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
              {item.href === '/evidence' && state.collectedEvidence.length > 0 && (
                <span className="ml-auto bg-evidence/20 text-evidence text-xs px-1.5 py-0.5 rounded-full">
                  {state.collectedEvidence.length}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border pt-4 mt-4">
        <div className="text-xs text-text-muted mb-1">Quest {state.currentQuest}/4</div>
        <div className="w-full bg-bg-elevated rounded-full h-1.5">
          <div
            className="bg-accent rounded-full h-1.5 transition-all"
            style={{ width: `${(state.currentQuest / 4) * 100}%` }}
          />
        </div>
        <div className="text-xs text-text-muted mt-2">
          {state.collectedEvidence.length} evidence &middot; {state.followedNpcs.length} following
        </div>
      </div>
    </aside>
  );
}
