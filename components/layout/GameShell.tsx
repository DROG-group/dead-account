'use client';

import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { StoryCardOverlay } from '@/components/story/StoryCard';
import { EndingScreen } from '@/components/story/EndingScreen';
import { useGame } from '@/contexts/GameContext';

export function GameShell({ children }: { children: React.ReactNode }) {
  const { state } = useGame();

  if (state.endingReached) {
    return <EndingScreen endingId={state.endingReached} />;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 min-h-screen pb-16 md:pb-0">
        <div className="max-w-2xl mx-auto">
          {children}
        </div>
      </main>
      <MobileNav />
      <StoryCardOverlay />
    </div>
  );
}
