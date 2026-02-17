'use client';

import { GameShell } from '@/components/layout/GameShell';
import { Feed } from '@/components/feed/Feed';
import { useGame } from '@/contexts/GameContext';
import { allPosts } from '@/data/posts/index';
import { getVisiblePosts } from '@/engine/selectors';

export default function FeedPage() {
  const { state } = useGame();
  const visiblePosts = getVisiblePosts(state, allPosts);

  return (
    <GameShell>
      <div className="border-b border-border px-4 py-3">
        <h1 className="font-bold text-text-primary text-lg">Home</h1>
        <p className="text-text-muted text-xs mt-0.5">zuidhaven.social timeline</p>
      </div>
      <Feed posts={visiblePosts} emptyMessage="The timeline is empty. Something isn't right." />
    </GameShell>
  );
}
